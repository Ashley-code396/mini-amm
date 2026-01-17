import cron from "node-cron";
import { prisma } from "../prisma/prismaClient";
import { getPoolEvents, getPoolsFromEvents, saveEventsToDB, savePoolsToDB } from "../services/poolIndexer";

const EVENT_ID = "poolEvents";

export const startPoolEventCron = async () => {
    console.log("Starting Sui Pool Event Cron Job...");

    // Load last cursor from DB
    const lastCursorRecord = await prisma.eventCursor.findUnique({
        where: { id: EVENT_ID },
    });

    let cursor = lastCursorRecord
        ? { txDigest: lastCursorRecord.txDigest, eventSeq: lastCursorRecord.eventSeq }
        : null;

    // Run every 15 seconds
    cron.schedule("*/15 * * * * *", async () => {
        try {
            console.log("Checking for new pool events...");

            const result = await getPoolEvents({ cursor, limit: 50 });

            if (result.data.length > 0) {
                console.log(`Found ${result.data.length} new pool events`);

                // Save events
                await saveEventsToDB(result.data);

                // Update cursor
                cursor = result.nextCursor;
                if (cursor) {
                    await prisma.eventCursor.upsert({
                        where: { id: EVENT_ID },
                        update: { txDigest: cursor.txDigest, eventSeq: cursor.eventSeq },
                        create: { id: EVENT_ID, txDigest: cursor.txDigest, eventSeq: cursor.eventSeq },
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
