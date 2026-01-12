"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { SuiObjectResponse } from "@mysten/sui/client";
import { TESTNET_PACKAGE_ID } from "../constants";

type PoolSummary = {
  id: string;
  token1: string;
  token2: string;
  lpCoinIds?: string[];
  price?: string;
  apr?: string;
  fee?: string;
  volume?: string;
};

export default function PoolInterface() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pools, setPools] = useState<PoolSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [selectedPool, setSelectedPool] = useState<PoolSummary | null>(null);
  const [amountA, setAmountA] = useState("0");
  const [amountB, setAmountB] = useState("0");
  const [lpAmount, setLpAmount] = useState("0");

  const { signAndExecuteTransaction, account, connected } =
    useSignAndExecuteTransaction() as any;
  const suiClient = useSuiClient();

  // Filter pools by search query
  const filteredPools = pools.filter((pool) =>
    `${pool.token1}/${pool.token2}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Fetch pools from the chain
  useEffect(() => {
    async function fetchPools() {
      setLoading(true);

      try {
        if (!TESTNET_PACKAGE_ID || TESTNET_PACKAGE_ID === "0x@") {
          setPools([]);
          setLoading(false);
          return;
        }

        const fullClient = suiClient;
        if (!fullClient) {
          setPools([]);
          setLoading(false);
          return;
        }

        let objects: SuiObjectResponse[] = [];

        try {
          const anyClient = fullClient as any;

          if (typeof anyClient.getObjectsOwnedByPackage === "function") {
            // older API
            objects = await anyClient.getObjectsOwnedByPackage(TESTNET_PACKAGE_ID);
          } else if (typeof anyClient.queryAllObjects === "function") {
            // try queryAllObjects with a package filter (API shapes vary between versions)
            try {
              objects = await anyClient.queryAllObjects({ filter: { Package: TESTNET_PACKAGE_ID } });
            } catch {
              // fallback to queryObjects if queryAllObjects shape differs
              const res = await anyClient.queryObjects?.({ filter: { Package: TESTNET_PACKAGE_ID } }) ?? [];
              objects = Array.isArray(res) ? res : (res.data ?? []);
            }
          } else if (typeof anyClient.queryObjects === "function") {
            const res = await anyClient.queryObjects({ filter: { Package: TESTNET_PACKAGE_ID } });
            objects = Array.isArray(res) ? res : (res.data ?? []);
          } else {
            // last resort: no supported API found
            objects = [];
          }
        } catch (err) {
          console.warn("Failed to fetch objects for package:", err);
          objects = [];
        }

        const poolObjects: PoolSummary[] = [];

        for (const obj of objects) {
          if (!obj?.data) continue;
          const type = obj.data.type || "";

          if (type.includes("mini_amm::pool::LiquidityPool")) {
            // Extract token types from Move object type string
            // e.g., "0x2::mini_amm::pool::LiquidityPool<0x2::sui::SUI,0x2::usd::USDC>"
            const match = type.match(/LiquidityPool<(.+),(.+)>/);
            const token1 = match?.[1] ?? "A";
            const token2 = match?.[2] ?? "B";

            // SuiObjectResponse shape varies between SDK versions; try common locations for the object id.
            const id =
              (obj as any).objectId ??
              obj.data?.objectId ??
              (obj as any).reference?.objectId ??
              "";

            poolObjects.push({
              id: String(id),
              token1,
              token2,
            });
          }
        }

        setPools(poolObjects);
      } catch (e) {
        console.error("Failed to load pools", e);
        setPools([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPools();
  }, [suiClient]);

  // Fetch user's coins of a specific type
  async function fetchUserCoins(tokenType: string): Promise<string[]> {
    if (!account || !suiClient) return [];

    const anyClient = suiClient as any;
    let objects: SuiObjectResponse[] = [];

    try {
      // Support multiple SDK shapes: try known methods and normalize the result.
      if (typeof anyClient.getObjectsOwnedByAddress === "function") {
        const res = await anyClient.getObjectsOwnedByAddress(account.address);
        objects = Array.isArray(res) ? res : (res.data ?? []);
      } else if (typeof anyClient.getOwnedObjects === "function") {
        const res = await anyClient.getOwnedObjects(account.address);
        objects = Array.isArray(res) ? res : (res.data ?? []);
      } else if (typeof anyClient.queryOwnedObjects === "function") {
        const res = await anyClient.queryOwnedObjects({ owner: account.address });
        objects = Array.isArray(res) ? res : (res.data ?? []);
      } else {
        // No supported API found
        objects = [];
      }
    } catch (e) {
      console.warn("Failed to fetch owned objects:", e);
      objects = [];
    }

    return objects
      .filter((c) => c?.data?.type?.includes(tokenType))
      .map((c) => (c as any).objectId ?? c.data?.objectId ?? (c as any).reference?.objectId ?? "")
      .filter(Boolean);
  }

  // Add liquidity
  async function handleAddLiquidity() {
    if (!connected || !account || !selectedPool) {
      alert("Connect your wallet and select a pool");
      return;
    }

    try {
      const tx = new Transaction();

      const userCoinsA = await fetchUserCoins(selectedPool.token1);
      const userCoinsB = await fetchUserCoins(selectedPool.token2);

      if (userCoinsA.length === 0 || userCoinsB.length === 0) {
        alert("You need coins of both types to add liquidity");
        return;
      }

      tx.moveCall({
        target: `${TESTNET_PACKAGE_ID}::pool::add_liquidity`,
        typeArguments: [selectedPool.token1, selectedPool.token2],
        arguments: [
          tx.object(selectedPool.id),
          tx.object(userCoinsA[0]),
          tx.object(userCoinsB[0]),
        ],
      });

      const result = await signAndExecuteTransaction({
        transactionBlock: tx,
      });

      console.log("Add Liquidity Result:", result);
      alert("Liquidity added successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to add liquidity: " + (e as any).toString());
    }
  }

  // Remove liquidity
  async function handleRemoveLiquidity() {
    if (!connected || !account || !selectedPool) {
      alert("Connect your wallet and select a pool");
      return;
    }

    try {
      if (!selectedPool.lpCoinIds || selectedPool.lpCoinIds.length === 0) {
        alert("You do not have LP tokens for this pool");
        return;
      }

      const tx = new Transaction();

      tx.moveCall({
        target: `${TESTNET_PACKAGE_ID}::pool::remove_liquidity`,
        typeArguments: [selectedPool.token1, selectedPool.token2],
        arguments: [
          tx.object(selectedPool.id),
          tx.object(selectedPool.lpCoinIds![0]),
          // pass as a typed pure value to avoid the string -> SerializedBcs overload error
          tx.pure("u128", lpAmount),
        ],
      });

      const result = await signAndExecuteTransaction({
        transactionBlock: tx,
      });

      console.log("Remove Liquidity Result:", result);
      alert("Liquidity removed successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to remove liquidity: " + (e as any).toString());
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Pool"
        className="w-full bg-background pl-4 pr-10 py-3 rounded-lg border mb-6 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Pools Table */}
      <div className="bg-card rounded-xl overflow-hidden border">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm text-muted-foreground border-b">
          <div className="col-span-3">Pool</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">APR</div>
          <div className="col-span-2 text-right">Trading Fee</div>
          <div className="col-span-2 text-right">Volume</div>
          <div className="col-span-1"></div>
        </div>

        {loading && <div className="p-4 text-center">Loading pools...</div>}

        {!loading && filteredPools.length === 0 && (
          <div className="p-6 text-center text-muted-foreground">
            No pools found. Deploy the mini_amm package to see pools here.
          </div>
        )}

        {filteredPools.map((pool) => (
          <div
            key={pool.id}
            className="p-4 hover:bg-muted/50 transition-colors border-b last:border-0"
          >
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-3 flex items-center space-x-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                    {pool.token1[0]}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
                    {pool.token2[0]}
                  </div>
                </div>
                <div className="font-medium">
                  {pool.token1}/{pool.token2}
                </div>
              </div>
              <div className="col-span-2 text-right">{pool.price ?? "—"}</div>
              <div className="col-span-2 text-right">{pool.apr ?? "—"}</div>
              <div className="col-span-2 text-right">{pool.fee ?? "—"}</div>
              <div className="col-span-2 text-right">{pool.volume ?? "—"}</div>
              <div className="col-span-1 flex justify-end space-x-1">
                <button
                  className="bg-primary text-white px-2 py-1 rounded"
                  onClick={() => {
                    setSelectedPool(pool);
                    setShowAddForm(true);
                  }}
                >
                  Add
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setSelectedPool(pool);
                    setShowRemoveForm(true);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Liquidity Modal */}
      {showAddForm && selectedPool && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Add Liquidity</h3>
            <label>Amount {selectedPool.token1}</label>
            <input
              type="text"
              value={amountA}
              onChange={(e) => setAmountA(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />
            <label>Amount {selectedPool.token2}</label>
            <input
              type="text"
              value={amountB}
              onChange={(e) => setAmountB(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-primary text-white rounded"
                onClick={async () => {
                  setShowAddForm(false);
                  await handleAddLiquidity();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Liquidity Modal */}
      {showRemoveForm && selectedPool && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Remove Liquidity</h3>
            <label>LP Token Amount</label>
            <input
              type="text"
              value={lpAmount}
              onChange={(e) => setLpAmount(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setShowRemoveForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={async () => {
                  setShowRemoveForm(false);
                  await handleRemoveLiquidity();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
