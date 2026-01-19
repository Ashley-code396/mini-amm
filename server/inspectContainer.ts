import { client } from "./services/suiClient"; // adjust path if needed

const CONTAINER_ID =
  "0x46937b3107d25ce72a31cf157efd60dcb57e3a10231be1f7576be67ca2fe25ac";

async function inspectContainer(containerId: string) {
  try {
    console.log(`\nFetching container object: ${containerId}\n`);

    const result = await client.getObject({
      id: containerId,
      options: {
        showType: true,
        showOwner: true,
        showContent: true,
        showPreviousTransaction: true,
        showDisplay: true,
        showStorageRebate: true,
      },
    });

    console.log("=== RAW CONTAINER OBJECT ===");
    console.log(JSON.stringify(result, null, 2));

    if (!result.data) {
      console.warn("\n⚠ No data returned for this container");
      return;
    }

    console.log("\n=== BASIC INFO ===");
    console.log("Object ID:", result.data.objectId);
    console.log("Version:", result.data.version);
    console.log("Digest:", result.data.digest);
    console.log("Type:", result.data.type);

    console.log("\n=== OWNER ===");
    console.log(JSON.stringify(result.data.owner, null, 2));

    if (result.data.content) {
      console.log("\n=== CONTENT ===");
      console.log(JSON.stringify(result.data.content, null, 2));

      if (
        result.data.content.dataType === "moveObject" &&
        "fields" in result.data.content
      ) {
        console.log("\n=== MOVE OBJECT FIELDS ===");
        for (const [key, value] of Object.entries(result.data.content.fields)) {
          console.log(`• ${key}:`, JSON.stringify(value, null, 2));
        }
      }
    }

    console.log("\n=== PREVIOUS TRANSACTION ===");
    console.log(result.data.previousTransaction);

  } catch (error) {
    console.error("\n❌ Error fetching container object:", error);
  }
}

inspectContainer(CONTAINER_ID);
