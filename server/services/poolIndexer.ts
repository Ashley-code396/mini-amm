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

    console.log("Saving pool event:", ev.id.txDigest);

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

  return events.map((ev) => {
    const payload = ev.payload as unknown as PoolEventPayload;

    return {
      lp_id: "lp_id" in payload ? payload.lp_id : null,
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
    };
  });
};

// --- Save processed pools ---
export const savePoolsToDB = async (pools: {
  lp_id: string | null;
  type: string;
  amount_a: number;
  amount_b: number;
  lp_change: number;
  timestamp: number;
}[]) => {
  for (const pool of pools) {
    if (!pool.lp_id) continue;

    console.log("Saving pool:", pool.lp_id);

    await prisma.pool.upsert({
      where: { poolId: pool.lp_id },
      update: {
        reserveA: pool.amount_a,
        reserveB: pool.amount_b,
      },
      create: {
        poolId: pool.lp_id,
        reserveA: pool.amount_a,
        reserveB: pool.amount_b,
      },
    });
  }

  // Mark events as processed
  await prisma.poolEvent.updateMany({
    where: { processed: false },
    data: { processed: true },
  });
};
