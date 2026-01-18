import { EventId, SuiEvent, SuiEventFilter } from "@mysten/sui/client";
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
  if (match && match[1]) return match[1].trim();
  return type;
}

// --- Fetch token types from pool object on-chain ---
async function getTokenTypesFromPoolObject(poolId: string): Promise<{ token1: string; token2: string } | null> {
  try {
    const poolObject = await client.getObject({
      id: poolId,
      options: { showType: true }
    });

    if (!poolObject.data?.type) {
      console.log(`  ⚠ No type found for pool ${poolId}`);
      return null;
    }

    // Pool type format: "PACKAGE::pool::LiquidityPool<TokenA, TokenB>"
    const typeMatch = poolObject.data.type.match(/<(.+)>/);
    
    if (typeMatch) {
      const typeParams = typeMatch[1].split(',').map(t => unwrapCoinType(t.trim()));
      if (typeParams.length >= 2) {
        console.log(`  ✓ Found token types for ${poolId}:`);
        console.log(`    Token A: ${typeParams[0]}`);
        console.log(`    Token B: ${typeParams[1]}`);
        return {
          token1: typeParams[0],
          token2: typeParams[1]
        };
      }
    }
    
    console.log(`  ⚠ Could not parse token types from: ${poolObject.data.type}`);
    return null;
  } catch (error) {
    console.error(`  ✗ Error fetching pool object ${poolId}:`, error);
    return null;
  }
}


// Helper function to extract token types from event type string (fallback)
function extractTokenTypesFromEventType(eventType: string): { token1: string; token2: string } | null {
  // Format: "PACKAGE::pool::EventName<Token1Type, Token2Type>"
  const typeMatch = eventType.match(/<(.+)>/);
  
  if (typeMatch) {
    const typeParams = typeMatch[1].split(',').map(t => t.trim());
    if (typeParams.length >= 2) {
      return {
        token1: typeParams[0],
        token2: typeParams[1]
      };
    }
  }
  
  return null;
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
    // cast parsedJson to Prisma-compatible JSON
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


// --- Process unprocessed events into pools ---
export const getPoolsFromEvents = async () => {
  const events = await prisma.poolEvent.findMany({ where: { processed: false } });

  const poolsWithTokenTypes = [];

  for (const ev of events) {
    const payload = ev.payload as unknown as PoolEventPayload;
    
    // Extract pool ID
    const poolId = "lp_id" in payload ? payload.lp_id : null;
    
    if (!poolId) {
      console.log("⚠ No pool ID found in event, skipping...");
      continue;
    }

    // --- Fetch token types from pool object on-chain first ---
    let tokenTypes = await getTokenTypesFromPoolObject(poolId);

    // --- Fallback: extract token types from event type ---
    if (!tokenTypes) {
      console.log(`⚠ Could not get token types from chain, falling back to event type for pool: ${poolId}`);
      tokenTypes = extractTokenTypesFromEventType(ev.type);
    }

    poolsWithTokenTypes.push({
      lp_id: poolId,
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

    // Check if pool exists
    const existingPool = await prisma.pool.findUnique({
      where: { poolId: pool.lp_id }
    });

    if (existingPool) {
      // Update reserves, and also update token types if they're missing
      await prisma.pool.update({
        where: { poolId: pool.lp_id },
        data: {
          reserveA: pool.amount_a,
          reserveB: pool.amount_b,
          // Only update token types if they're not already set
          ...((!existingPool.token1 || !existingPool.token2) && pool.token1 && pool.token2 && {
            token1: pool.token1,
            token2: pool.token2,
          }),
        },
      });
    } else {
      // Create new pool with token types
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