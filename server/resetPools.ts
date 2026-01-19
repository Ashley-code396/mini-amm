import { prisma } from "./prisma/prismaClient";
import { getPoolEvents, saveEventsToDB, getPoolsFromEvents, savePoolsToDB } from "./services/poolIndexer"; // adjust path if needed

async function resetPools() {
  try {
    console.log("⚠ Clearing old pool events and pools...");

    // Delete old events and pools
    await prisma.poolEvent.deleteMany({});
    await prisma.pool.deleteMany({});

    console.log("✅ Old data cleared.");

    // Fetch events from chain starting from scratch
    console.log("⏳ Fetching events from blockchain...");
    const { data: events } = await getPoolEvents({ cursor: null });

    console.log(`✅ Fetched ${events.length} events.`);

    // Save events to DB
    console.log("💾 Saving events to DB...");
    await saveEventsToDB(events);

    // Process events into pools
    console.log("🔄 Processing events into pools...");
    const pools = await getPoolsFromEvents();

    console.log(`✅ Processed ${pools.length} pools.`);

    // Save pools to DB
    console.log("💾 Saving pools to DB...");
    await savePoolsToDB(pools);

    console.log("🎉 Reset and rebuild complete!");
    process.exit(0);
  } catch (error) {
    console.error("✗ Error during reset:", error);
    process.exit(1);
  }
}

resetPools();
