// crons/poolEvents.ts
import cron from "node-cron";
import { prisma } from "../prisma/prismaClient";
import {
  getPoolEvents,
  getSwapEvents,
  getPoolsFromEvents,
  saveEventsToDB,
  savePoolsToDB,
  saveUserTransactions,
} from "../services/poolIndexer";
import { containerId } from "../config/network";

const POOL_EVENT_ID = "poolEvents";
const SWAP_EVENT_ID = "swapEvents";
const POLL_LIMIT = 50;

interface ApiCursor {
  txDigest: string;
  eventSeq: string;
}

export const startPoolEventCron = async () => {
  console.log("Starting Sui Pool Event Cron Job...");

  // Load last cursor for pool events
  const lastPoolCursor = await prisma.eventCursor.findUnique({
    where: { id: POOL_EVENT_ID },
  });

  let poolApiCursor: ApiCursor | null = null;
  if (lastPoolCursor?.eventSeq != null && lastPoolCursor.txDigest != null) {
    poolApiCursor = {
      txDigest: lastPoolCursor.txDigest,
      eventSeq: lastPoolCursor.eventSeq.toString(),
    };
  }

  // Load last cursor for swap events
  const lastSwapCursor = await prisma.eventCursor.findUnique({
    where: { id: SWAP_EVENT_ID },
  });

  let swapApiCursor: ApiCursor | null = null;
  if (lastSwapCursor?.eventSeq != null && lastSwapCursor.txDigest != null) {
    swapApiCursor = {
      txDigest: lastSwapCursor.txDigest,
      eventSeq: lastSwapCursor.eventSeq.toString(),
    };
  }

  // Run every 15 seconds
  cron.schedule("*/15 * * * * *", async () => {
  try {
    console.log("Checking for new events...");

    // --------- Pool Events ---------
    const poolResult = await getPoolEvents({
      cursor: poolApiCursor,
      limit: POLL_LIMIT,
    });

    if (poolResult.data.length > 0) {
      console.log(`Found ${poolResult.data.length} new pool events`);
      await saveEventsToDB(poolResult.data);
      await saveUserTransactions(poolResult.data, containerId);

      // Update cursor
      if (poolResult.nextCursor) {
        poolApiCursor = poolResult.nextCursor;
        const dbEventSeq = parseInt(poolApiCursor.eventSeq, 10);
        await prisma.eventCursor.upsert({
          where: { id: POOL_EVENT_ID },
          update: { txDigest: poolApiCursor.txDigest, eventSeq: dbEventSeq },
          create: { id: POOL_EVENT_ID, txDigest: poolApiCursor.txDigest, eventSeq: dbEventSeq },
        });
      }

      const pools = await getPoolsFromEvents(containerId);
      await savePoolsToDB(pools);
      console.log("Pools saved to DB:", pools.length);
    }

    // --------- Swap Events ---------
    const swapResult = await getSwapEvents({
      cursor: swapApiCursor,
      limit: POLL_LIMIT,
    });

    if (swapResult.data.length > 0) {
      console.log(`Found ${swapResult.data.length} new swap events`);
      await saveEventsToDB(swapResult.data);
      await saveUserTransactions(swapResult.data, containerId);

      // Update cursor
      if (swapResult.nextCursor) {
        swapApiCursor = swapResult.nextCursor;
        const dbEventSeq = parseInt(swapApiCursor.eventSeq, 10);
        await prisma.eventCursor.upsert({
          where: { id: SWAP_EVENT_ID },
          update: { txDigest: swapApiCursor.txDigest, eventSeq: dbEventSeq },
          create: { id: SWAP_EVENT_ID, txDigest: swapApiCursor.txDigest, eventSeq: dbEventSeq },
        });
      }

      console.log("Swap transactions saved to DB");
    }

    if (poolResult.data.length === 0 && swapResult.data.length === 0) {
      console.log("No new events");
    }
  } catch (error) {
    console.error("Cron job error:", error);
  }
});

};