import { EventId, SuiEvent, SuiEventFilter } from "@mysten/sui/client";
import { client } from "./suiClient";
import { prisma } from "../prisma/prismaClient";
import { packageId } from "../config/network";
import { InputJsonValue } from "@prisma/client/runtime/client";

// Event types to track
const EVENT_MODULES = {
  pool: ["PoolInitialized", "LiquidityAdded", "LiquidityRemoved"],
  swap: ["SwapEvent"],
};

// Helper function to unwrap Coin<> wrapper if present
function unwrapCoinType(type: string): string {
  const match = type.match(/^0x[0-9a-f]+::coin::Coin<(.+)>$/i);
  return match ? match[1].trim() : type;
}

async function getPoolsBagId(containerId: string): Promise<string | null> {
  const container = await client.getObject({
    id: containerId,
    options: { showContent: true },
  });

  if (
    container.data?.content?.dataType !== "moveObject" ||
    !(container.data.content.fields as any)?.pools
  ) {
    console.error("❌ Failed to read pools bag from container");
    return null;
  }

  const bagObj = (container.data.content.fields as any).pools;
  const bagIdStr = bagObj?.fields?.id?.id || null;
  return bagIdStr;
}

// Helper to parse LiquidityPool<A, B> generics
function parsePoolGenerics(poolType: string): { token1: string; token2: string } | null {
  const lpIndex = poolType.indexOf("LiquidityPool<");
  if (lpIndex === -1) return null;

  const afterLP = poolType.substring(lpIndex + "LiquidityPool<".length);
  let depth = 0;
  let commaIndex = -1;

  for (let i = 0; i < afterLP.length; i++) {
    const char = afterLP[i];
    if (char === '<') depth++;
    else if (char === '>') depth--;
    else if (char === ',' && depth === 0) {
      commaIndex = i;
      break;
    }
  }

  if (commaIndex === -1) return null;

  const token1Raw = afterLP.substring(0, commaIndex).trim();

  let endIndex = -1;
  depth = 0;
  for (let i = commaIndex + 1; i < afterLP.length; i++) {
    const char = afterLP[i];
    if (char === '<') depth++;
    else if (char === '>') {
      if (depth === 0) {
        endIndex = i;
        break;
      }
      depth--;
    }
  }

  if (endIndex === -1) return null;

  const token2Raw = afterLP.substring(commaIndex + 1, endIndex).trim();
  const token1 = unwrapCoinType(token1Raw);
  const token2 = unwrapCoinType(token2Raw);

  return { token1, token2 };
}

export async function getTokenTypesFromPoolsBag(
  containerId: string,
  lpId: string
): Promise<{ token1: string; token2: string } | null> {
  try {
    const bagId = await getPoolsBagId(containerId);
    if (!bagId) return null;

    const bag = await client.getDynamicFields({
      parentId: bagId,
      limit: 100,
    });

    const poolField = bag.data.find(f => f.name.value === lpId);
    if (!poolField) return null;

    const poolObject = await client.getObject({
      id: poolField.objectId,
      options: { showType: true },
    });

    const type = poolObject.data?.type;
    if (!type) return null;

    const fieldMatch = type.match(/Field<[^,]+,\s*(.+)>$/);
    if (!fieldMatch) return parsePoolGenerics(type);

    const poolType = fieldMatch[1].trim();
    return parsePoolGenerics(poolType);
  } catch (err) {
    console.error("❌ Token extraction failed:", err);
    return null;
  }
}

// Fetch pool events
export const getPoolEvents = async ({
  cursor,
  limit = 50,
}: {
  cursor?: EventId | null;
  limit?: number;
}) => {
  return getModuleEvents({ moduleName: "pool", cursor, limit });
};

// Fetch swap events
export const getSwapEvents = async ({
  cursor,
  limit = 50,
}: {
  cursor?: EventId | null;
  limit?: number;
}) => {
  return getModuleEvents({ moduleName: "swap", cursor, limit });
};

// Generic module event fetcher
export const getModuleEvents = async ({
  moduleName,
  cursor,
  limit = 50,
}: {
  moduleName: keyof typeof EVENT_MODULES;
  cursor?: EventId | null;
  limit?: number;
}) => {
  const eventNames = EVENT_MODULES[moduleName];
  let allEvents: SuiEvent[] = [];
  let nextCursor: EventId | null = cursor ?? null;

  for (const eventName of eventNames) {
    const typeCursor = cursor; // NEW: separate cursor for this type
    const filter: SuiEventFilter = {
      MoveEventType: `${packageId}::${moduleName}::${eventName}`,
    };

    const eventsResult = await client.queryEvents({
      query: filter,
      cursor: typeCursor,
      limit,
      order: "ascending",
    });

    allEvents = allEvents.concat(eventsResult.data as SuiEvent[]);
    // Don't update nextCursor here — handle it per type if needed
  }

  // You can optionally compute nextCursor based on latest event in allEvents
  const latestEvent = allEvents[allEvents.length - 1];
  if (latestEvent) {
    nextCursor = {
      txDigest: latestEvent.id.txDigest,
      eventSeq: latestEvent.id.eventSeq,
    };
  }

  return {
    data: allEvents,
    nextCursor,
    hasNextPage: false,
  };
};


// Save events to DB
export const saveEventsToDB = async (events: SuiEvent[]) => {
  for (const ev of events) {
    const payload = ev.parsedJson as unknown as InputJsonValue;

    await prisma.poolEvent.upsert({
      where: { digest: ev.id.txDigest },
      update: {},
      create: {
        digest: ev.id.txDigest,
        type: ev.type,
        sender: ev.sender ?? null,
        payload,
        timestamp: Number(ev.timestampMs),
        processed: false,
      },
    });
  }
};

// Save user transactions (liquidity + swaps)
export const saveUserTransactions = async (events: SuiEvent[], containerId: string) => {
  for (const ev of events) {
    const payload = ev.parsedJson as any;
    if (!ev.sender) continue;

    // Determine transaction type
    let type = "Unknown";
    if (ev.type.includes("LiquidityAdded")) type = "LiquidityAdded";
    else if (ev.type.includes("LiquidityRemoved")) type = "LiquidityRemoved";
    else if (ev.type.includes("SwapEvent")) type = "SwapEvent";

    // Get pool ID
    const poolId = payload.lp_id || payload.pool_id || null;

    // Get token types from bag if poolId exists
    let token1 = null;
    let token2 = null;
    if (poolId) {
      const tokenTypes = await getTokenTypesFromPoolsBag(containerId, poolId);
      token1 = tokenTypes?.token1 || null;
      token2 = tokenTypes?.token2 || null;
    }

    // Extract amounts based on event type
    let amount1 = null;
    let amount2 = null;
    let lpAmount = null;

    if (type === "LiquidityAdded" || type === "LiquidityRemoved") {
      amount1 = payload.amount_a?.toString() || null;
      amount2 = payload.amount_b?.toString() || null;
      lpAmount = (payload.lp_minted || payload.lp_burned)?.toString() || null;
    } else if (type === "SwapEvent") {
      amount1 = payload.amount_in?.toString() || null;
      amount2 = payload.amount_out?.toString() || null;
    }

    await prisma.userTransaction.upsert({
      where: { txDigest: ev.id.txDigest },
      update: {},
      create: {
        userAddress: ev.sender,
        poolId,
        type,
        token1,
        token2,
        amount1,
        amount2,
        lpAmount,
        txDigest: ev.id.txDigest,
        timestamp: Number(ev.timestampMs),
      },
    });
  }
};

// Process pool events
export const getPoolsFromEvents = async (containerId: string) => {
  const events = await prisma.poolEvent.findMany({ where: { processed: false } });
  const poolsWithTokenTypes = [];

  for (const ev of events) {
    const payload = ev.payload as any;
    const lpId = payload.lp_id || null;
    if (!lpId) continue;

    const tokenTypes = await getTokenTypesFromPoolsBag(containerId, lpId);

    poolsWithTokenTypes.push({
      lp_id: lpId,
      type: ev.type,
      amount_a: payload.amount_a || 0,
      amount_b: payload.amount_b || 0,
      lp_change: payload.lp_minted || payload.lp_burned || 0,
      timestamp: Number(ev.timestamp),
      token1: tokenTypes?.token1 || "",
      token2: tokenTypes?.token2 || "",
    });
  }

  return poolsWithTokenTypes;
};

// Save processed pools
export const savePoolsToDB = async (pools: {
  lp_id: string | null;
  type: string;
  amount_a: number;
  amount_b: number;
  lp_change: number;
  timestamp: number;
  token1: string;
  token2: string;
}[]) => {
  for (const pool of pools) {
    if (!pool.lp_id) continue;

    const existingPool = await prisma.pool.findUnique({ where: { poolId: pool.lp_id } });

    if (existingPool) {
      await prisma.pool.update({
        where: { poolId: pool.lp_id },
        data: {
          reserveA: pool.amount_a,
          reserveB: pool.amount_b,
          ...((!existingPool.token1 || !existingPool.token2) && pool.token1 && pool.token2 && {
            token1: pool.token1,
            token2: pool.token2,
          }),
        },
      });
    } else {
      await prisma.pool.create({
        data: {
          poolId: pool.lp_id,
          token1: pool.token1,
          token2: pool.token2,
          reserveA: pool.amount_a,
          reserveB: pool.amount_b,
        },
      });
    }
  }

  await prisma.poolEvent.updateMany({
    where: { processed: false },
    data: { processed: true },
  });
};