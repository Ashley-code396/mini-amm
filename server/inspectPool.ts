import { client } from './services/suiClient'// adjust path if needed

const POOL_ID = "0x536a71a90933fac84a75595155a51aebeb32b4eaff4f8286576f2a99a81c2f38";

async function inspectPool(poolId: string) {
  try {
    console.log(`Fetching pool object for poolId: ${poolId}...\n`);

    const poolObject = await client.getObject({
      id: poolId,
      options: {
        showType: true,
        showContent: true,   // show all fields
        showOwner: true,
        showDisplay: true,
      },
    });

    console.log("=== Raw pool object ===");
    console.log(JSON.stringify(poolObject, null, 2));

    if (poolObject.data?.type) {
      console.log("\nPool type field:", poolObject.data.type);
    } else {
      console.warn("\n⚠ No 'type' field found for this pool object");
    }

    if (poolObject.data?.content) {
      console.log("\nPool content:");
      console.log(JSON.stringify(poolObject.data.content, null, 2));
    }

    if (poolObject.data?.display) {
      console.log("\nPool display info:");
      console.log(JSON.stringify(poolObject.data.display, null, 2));
    }

    if (poolObject.data?.owner) {
      console.log("\nPool owner info:");
      console.log(JSON.stringify(poolObject.data.owner, null, 2));
    }

  } catch (error) {
    console.error("Error fetching pool object:", error);
  }
}

inspectPool(POOL_ID);
