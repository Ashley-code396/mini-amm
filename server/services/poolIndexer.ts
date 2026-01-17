import { EventId, SuiEvent, SuiEventFilter } from "@mysten/sui/client";
import { client } from "./suiClient";
import { prisma } from "../prisma/prismaClient";
import { packageId } from "../config/network";

// --- Fetch pool events from chain ---
export const getPoolEvents = async ({
  cursor,
  limit = 50,
}: {
  cursor?: EventId | null;
  limit?: number;
}) => {
  const filter: SuiEventFilter = {
    MoveEventType: [
      `${packageId}::mini_amm::PoolInitialized`,
      `${packageId}::mini_amm::LiquidityAdded`,
      `${packageId}::mini_amm::LiquidityRemoved`,
    ],
  };

  const eventsResult = await client.queryEvents({
    query: filter,
    cursor,
    limit,
    order: "ascending",
  });

  return {
    data: eventsResult.data as SuiEvent[],
    nextCursor: eventsResult.nextCursor,
    hasNextPage: eventsResult.hasNextPage,
  };
};

// --- Save events to DB ---
export const saveEventsToDB = async (events: SuiEvent[]) => {
  for (const ev of events) {
    console.log("Saving pool event:", ev.id.txDigest);
    await prisma.poolEvent.upsert({
      where: { digest: ev.id.txDigest },
      update: {},
      create: {
        digest: ev.id.txDigest,
        type: ev.type,
        sender: ev.sender ?? null,
        payload: ev.parsedJson,
        timestamp: Number(ev.timestampMs),
      },
    });
  }
};

// --- Process pools from events ---
export const getPoolsFromEvents = async () => {
  const events = await prisma.poolEvent.findMany();
  const pools = events.map((ev) => ({
    lp_id: ev.payload.lp_id,
    type: ev.type,
    amount_a: ev.payload.amount_a,
    amount_b: ev.payload.amount_b,
    lp_change: ev.payload.lp_minted ?? ev.payload.lp_burned ?? 0,
    timestamp: ev.timestamp,
  }));
  return pools;
};

// --- Save processed pools ---
export const savePoolsToDB = async (pools: any[]) => {
  for (const pool of pools) {
    console.log("Saving pool:", pool.lp_id);
    await prisma.pool.upsert({
      where: { lp_id: pool.lp_id },
      update: {
        type: pool.type,
        amount_a: pool.amount_a,
        amount_b: pool.amount_b,
        lp_change: pool.lp_change,
        timestamp: pool.timestamp,
      },
      create: {
        lp_id: pool.lp_id,
        type: pool.type,
        amount_a: pool.amount_a,
        amount_b: pool.amount_b,
        lp_change: pool.lp_change,
        timestamp: pool.timestamp,
      },
    });
  }
};
