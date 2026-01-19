import { EventId, SuiEvent, SuiEventFilter, SuiObjectData } from "@mysten/sui/client";
import { client } from "./suiClient";
import { prisma } from "../prisma/prismaClient";
import { packageId } from "../config/network";
import { InputJsonValue } from "@prisma/client/runtime/client";
import { PoolEventPayload } from "../types/poolEvents";


// Event types to track
const POOL_EVENT_TYPES = [
  "PoolInitialized",
  "LiquidityAdded",
  "LiquidityRemoved",
] as const;

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

  console.log("  objectId:", container.data?.objectId);
  console.log("  type:", container.data?.type);
  console.log("  has content:", !!container.data?.content);

  if (
    container.data?.content?.dataType !== "moveObject" ||
    !(container.data.content.fields as any)?.pools
  ) {
    console.error("❌ Failed to read pools bag from container");
    return null;
  }

  // Bag is inside fields.pools.fields.id.id (NOT fields.pools.id.id)
  const bagObj = (container.data.content.fields as any).pools;
  const bagIdStr = bagObj?.fields?.id?.id || null;
  console.log("Bag object:", bagObj, "bagIdStr:", bagIdStr);

  return bagIdStr;
}



export async function getTokenTypesFromPoolsBag(
  containerId: string,
  lpId: string
): Promise<{ token1: string; token2: string } | null> {
  try {
    // 1️⃣ Resolve Bag ID
    const bagId = await getPoolsBagId(containerId);
    console.log("bag id:", bagId);
    if (!bagId) return null;

    console.log(`🔍 Using pools bag: ${bagId}`);

    // 2️⃣ Read pools from the bag
    const bag = await client.getDynamicFields({
      parentId: bagId,
      limit: 100,
    });


    console.log("📦 Bag fetch result:");
    console.log("  total fields:", bag.data.length);
    console.log("  hasNextPage:", bag.hasNextPage);
    console.log("  nextCursor:", bag.nextCursor);

    const poolField = bag.data.find(f => f.name.value === lpId);
    if (!poolField) {
      console.log(`⚠ Pool ${lpId} not found in bag`);
      return null;
    }

    // 3️⃣ Fetch pool object type
    const poolObject = await client.getObject({
      id: poolField.objectId,
      options: { showType: true },
    });



console.log("🔹 Fetched pool object:");
console.log("  objectId:", poolField.objectId);
console.log("  type:", poolObject.data?.type);

// Safely access content.fields only if the returned parsed data is a moveObject
if (poolObject.data?.content && poolObject.data.content.dataType === "moveObject") {
  // content is a moveObject and has fields
  console.log("  content fields:", (poolObject.data.content.fields as any));
} else {
  console.log("  content fields: <not available or not a moveObject>");
}

// Optional: print the full object for debugging (use cautiously)
console.log("  full object data:", JSON.stringify(poolObject.data, null, 2));
    const type = poolObject.data?.type;
    if (!type) return null;

    // 4️⃣ Extract generics
    const match = type.match(/<(.+)>/);
    if (!match) return null;

    const [token1, token2] = match[1]
      .split(",")
      .map(t => unwrapCoinType(t.trim()));

    console.log(`✓ Pool ${lpId} tokens: ${token1} / ${token2}`);
    return { token1, token2 };
  } catch (err) {
    console.error("❌ Token extraction failed:", err);
    return null;
  }
}


// --- Fetch pool events from chain ---
export const getPoolEvents = async ({
  cursor,
  limit = 50,
}: {
  cursor?: EventId | null;
  limit?: number;
}) => {
  let allEvents: SuiEvent[] = [];
  let nextCursor = cursor;

  for (const eventName of POOL_EVENT_TYPES) {
    const filter: SuiEventFilter = {
      MoveEventType: `${packageId}::pool::${eventName}`,
    };

    const eventsResult = await client.queryEvents({
      query: filter,
      cursor: nextCursor,
      limit,
      order: "ascending",
    });

    allEvents = allEvents.concat(eventsResult.data as SuiEvent[]);
    nextCursor = eventsResult.nextCursor ?? nextCursor;
  }

  return {
    data: allEvents,
    nextCursor,
    hasNextPage: false,
  };
};

// --- Save events to DB ---
export const saveEventsToDB = async (events: SuiEvent[]) => {
  for (const ev of events) {
    const payload = ev.parsedJson as unknown as InputJsonValue;

    console.log("Saving pool event:", ev.id.txDigest, "Type:", ev.type);

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

// --- Process unprocessed events into pools using the bag ---
export const getPoolsFromEvents = async (containerId: string) => {
  const events = await prisma.poolEvent.findMany({ where: { processed: false } });
  const poolsWithTokenTypes = [];

  for (const ev of events) {
    const payload = ev.payload as unknown as PoolEventPayload;

    const lpId = "lp_id" in payload ? payload.lp_id : null;
    if (!lpId) {
      console.log("⚠ No pool ID found in event, skipping...");
      continue;
    }

    // Fetch token types directly from pools bag
    const tokenTypes = await getTokenTypesFromPoolsBag(containerId, lpId);

    poolsWithTokenTypes.push({
      lp_id: lpId,
      type: ev.type,
      amount_a: "amount_a" in payload ? payload.amount_a : 0,
      amount_b: "amount_b" in payload ? payload.amount_b : 0,
      lp_change:
        "lp_minted" in payload
          ? payload.lp_minted
          : "lp_burned" in payload
          ? payload.lp_burned
          : 0,
      timestamp: Number(ev.timestamp),
      token1: tokenTypes?.token1 || "",
      token2: tokenTypes?.token2 || "",
    });
  }

  return poolsWithTokenTypes;
};

// --- Save processed pools ---
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

    console.log("Saving pool:", pool.lp_id);
    if (pool.token1 && pool.token2) {
      console.log(`  Tokens: ${pool.token1} / ${pool.token2}`);
    } else {
      console.log(`  ⚠ Warning: Token types not found`);
    }

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

  // Mark events as processed
  await prisma.poolEvent.updateMany({
    where: { processed: false },
    data: { processed: true },
  });
};
