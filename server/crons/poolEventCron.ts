// crons/poolEvents.ts
import cron from "node-cron";
import { prisma } from "../prisma/prismaClient";
import { getPoolEvents, getPoolsFromEvents, saveEventsToDB, savePoolsToDB } from "../services/poolIndexer";

const EVENT_ID = "poolEvents";
const POLL_LIMIT = 50;

export const startPoolEventCron = async () => {
  console.log("Starting Sui Pool Event Cron Job...");

  // Load last cursor from DB
  const lastCursorRecord = await prisma.eventCursor.findUnique({
    where: { id: EVENT_ID },
  });

  // apiCursor is passed to the indexer and expects eventSeq as a string
  let apiCursor = lastCursorRecord
    ? { txDigest: lastCursorRecord.txDigest, eventSeq: lastCursorRecord.eventSeq.toString() }
    : null;

  // Run every 15 seconds
  cron.schedule("*/15 * * * * *", async () => {
      try {
        console.log("Checking for new pool events...");

        const result = await getPoolEvents({ cursor: apiCursor, limit: POLL_LIMIT });

        if (result.data.length > 0) {
          console.log(`Found ${result.data.length} new pool events`);

          // Save events
          await saveEventsToDB(result.data);

          // Update cursor: keep apiCursor.eventSeq as string for the indexer,
          // but persist numeric eventSeq to the database.
          apiCursor = result.nextCursor
            ? { txDigest: result.nextCursor.txDigest, eventSeq: result.nextCursor.eventSeq }
            : null;
          if (apiCursor) {
            const dbEventSeq = parseInt(apiCursor.eventSeq, 10);
            await prisma.eventCursor.upsert({
              where: { id: EVENT_ID },
              update: { txDigest: apiCursor.txDigest, eventSeq: dbEventSeq },
              create: { id: EVENT_ID, txDigest: apiCursor.txDigest, eventSeq: dbEventSeq },
            });
          }

          // Process pools
          const pools = await getPoolsFromEvents();
          await savePoolsToDB(pools);

          console.log("Pools saved to DB:", pools.length);
        } else {
          console.log("No new pool events");
        }
      } catch (error) {
        console.error("Cron job error:", error);
      }
    });
};
