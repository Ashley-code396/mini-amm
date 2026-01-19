import { client } from "./services/suiClient";

const BAG_ID =
  "0xe9fe4356cfe82fc2dd14df4deae86149192df1ee53c5e783fea54bd80ebf78ef";

async function inspectPoolsBag(bagId: string) {
  try {
    console.log(`\nFetching bag contents: ${bagId}\n`);

    const children = await client.getDynamicFields({
      parentId: bagId,
    });

    for (const entry of children.data) {
      console.log(`\n--- Inspecting pool child object ---`);
      console.log(`Name:`, entry.name);
      console.log(`Object ID:`, entry.objectId);

      const poolObject = await client.getObject({
        id: entry.objectId,
        options: {
          showType: true,
          showContent: true,
        },
      });

      console.log("Pool object:");
      console.log(JSON.stringify(poolObject, null, 2));
    }
  } catch (err) {
    console.error("❌ Error inspecting bag:", err);
  }
}

inspectPoolsBag(BAG_ID);
