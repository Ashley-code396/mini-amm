"use client";

import { useEffect, useState, useCallback } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { 
  useSignAndExecuteTransaction, 
  useSuiClient, 
  useCurrentAccount,
  useSuiClientQuery,
  useSuiClientContext
} from "@mysten/dapp-kit";
import { SuiObjectResponse, SuiObjectData } from "@mysten/sui/client";
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

type UserCoin = {
  type: string;
  objectId: string;
  balance: number;
};

export default function PoolInterface() {
  const client = useSuiClient();
  const account = useCurrentAccount();
  const { network } = useSuiClientContext();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [isConnected, setIsConnected] = useState(false);
  
  // Fetch user's coins when account changes
  useEffect(() => {
    const fetchUserCoins = async () => {
      if (!account?.address) {
        setUserCoins([]);
        return;
      }

      try {
        const allCoins = await client.getAllCoins({
          owner: account.address,
        });

        // Filter and map coins to UserCoin format
        const userCoinsData = allCoins.data
          .filter(coin => coin.coinType !== '0x2::sui::SUI') // Filter out SUI if needed
          .map(coin => ({
            type: coin.coinType,
            objectId: coin.coinObjectId,
            balance: Number(coin.balance) / 1e9, // Adjust decimal places as needed
          }));

        setUserCoins(userCoinsData);
        console.log('Fetched user coins:', userCoinsData);
      } catch (error) {
        console.error('Error fetching user coins:', error);
        setUserCoins([]);
      }
    };

    fetchUserCoins();
    
    // Set up a refresh interval
    const interval = setInterval(fetchUserCoins, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, [account?.address, client]);
  
  // Update connection status when account changes
  useEffect(() => {
    setIsConnected(!!account?.address);
  }, [account]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pools, setPools] = useState<PoolSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPool, setSelectedPool] = useState<PoolSummary | null>(null);
  const [amountA, setAmountA] = useState("0");
  const [amountB, setAmountB] = useState("0");
  const [lpAmount, setLpAmount] = useState("0");
  const [newPoolToken1, setNewPoolToken1] = useState("");
  const [newPoolToken2, setNewPoolToken2] = useState("");
  const [newPoolToken1Symbol, setNewPoolToken1Symbol] = useState("");
  const [newPoolToken2Symbol, setNewPoolToken2Symbol] = useState("");
  const [selectedCoinAId, setSelectedCoinAId] = useState("");
  const [selectedCoinBId, setSelectedCoinBId] = useState("");
  const [amountTokenA, setAmountTokenA] = useState("0");
  const [amountTokenB, setAmountTokenB] = useState("0");
  const [useRatioMode, setUseRatioMode] = useState(true);
  const [ratioPercent, setRatioPercent] = useState(100);
  const [totalLiquidity, setTotalLiquidity] = useState("0");
  const [userCoins, setUserCoins] = useState<UserCoin[]>([]);
  const [tokenSymbols, setTokenSymbols] = useState<string[]>([]);

  // Update token symbols when userCoins change
  useEffect(() => {
    const symbols = Array.from(new Set(userCoins
      .map((c) => tokenSymbol(c.type))
      .filter(Boolean))).sort();
    setTokenSymbols(symbols);
  }, [userCoins]);

  // Helper: derive short token symbol from coin type string
  function tokenSymbol(type: string) {
    if (!type) return "";
    const lower = type.toLowerCase();
    if (lower.includes("sui")) return "SUI";
    if (lower.includes("usdc")) return "USDC";
    if (lower.includes("wal")) return "Wal";
    // fallback: last segment after :: or <
    const parts = type.split(/::|</);
    const last = parts[parts.length - 1] ?? type;
    return last.replace(/>.*/g, "");
  }

  // Helper: format balances with up to 8 decimals, trimming trailing zeros
  function formatBalance(n: number) {
    if (!isFinite(n)) return "0";
    // show up to 8 decimals, but if integer, show integer
    if (Number.isInteger(n)) return String(n);
    return Number(n).toLocaleString(undefined, { maximumFractionDigits: 8 });
  }

  function applyPresetPercent(p: number) {
    setRatioPercent(p);
    setUseRatioMode(true);
    const coinA = userCoins.find((c) => c.objectId === selectedCoinAId);
    const coinB = userCoins.find((c) => c.objectId === selectedCoinBId);
    if (coinA) setAmountTokenA(String(Math.floor((coinA.balance * p) / 100)));
    if (coinB) setAmountTokenB(String(Math.floor((coinB.balance * p) / 100)));
  }

  const { mutate: signAndExecuteTransaction, isPending: isTransactionPending } = useSignAndExecuteTransaction();
  const connected = !!account?.address;
  const suiClient = useSuiClient();

  // =================== Fetch Pools ===================
  useEffect(() => {
    async function fetchPools() {
      setLoading(true);
      try {
        if (!TESTNET_PACKAGE_ID || !suiClient) {
          setPools([]);
          setLoading(false);
          return;
        }

        let objects: SuiObjectResponse[] = [];
        const anyClient = suiClient as any;

        try {
          if (typeof anyClient.getObjectsOwnedByPackage === "function") {
            objects = await anyClient.getObjectsOwnedByPackage(TESTNET_PACKAGE_ID);
          } else if (typeof anyClient.queryAllObjects === "function") {
            const res = await anyClient.queryAllObjects({ filter: { Package: TESTNET_PACKAGE_ID } });
            objects = Array.isArray(res) ? res : (res.data ?? []);
          }
        } catch {
          objects = [];
        }

        const poolObjects: PoolSummary[] = [];

        for (const obj of objects) {
          if (!obj?.data) continue;
          const type = obj.data.type || "";
          if (type.includes("mini_amm::pool::LiquidityPool")) {
            const match = type.match(/LiquidityPool<(.+),(.+)>/);
            const token1 = match?.[1] ?? "A";
            const token2 = match?.[2] ?? "B";
            const id =
              (obj as any).objectId ?? obj.data?.objectId ?? (obj as any).reference?.objectId ?? "";
            poolObjects.push({ id: String(id), token1, token2 });
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

  // =================== Fetch User Coins ===================
  useEffect(() => {
    async function fetchCoins() {
      if (!account || !suiClient) return;

      // account can be an object with .address or a plain string depending on the wallet/sdk.
      const ownerAddress = (account && ((account as any).address ?? (typeof account === "string" ? account : undefined))) as string | undefined;
      if (!ownerAddress) return;
      const anyClient = suiClient as any;
      let objects: SuiObjectResponse[] = [];

      // Try multiple client methods — different SDK / RPC wrappers expose different names and
      // response shapes. Normalize into a list of objects.
      try {
        const attempts = [
          // common in some clients
          async () => anyClient.getObjectsOwnedByAddress && (await anyClient.getObjectsOwnedByAddress(ownerAddress)),
          // newer sui.js style
          async () => anyClient.getOwnedObjects && (await anyClient.getOwnedObjects({ owner: ownerAddress })),
          async () => anyClient.queryOwnedObjects && (await anyClient.queryOwnedObjects({ owner: ownerAddress })),
          // fallback to generic queryAllObjects with owner filter
          async () => anyClient.queryAllObjects && (await anyClient.queryAllObjects({ filter: { owner: ownerAddress } })),
        ];

        for (const fn of attempts) {
          try {
            // eslint-disable-next-line no-await-in-loop
            const res = await fn();
            if (!res) continue;

            // normalize several common shapes
            if (Array.isArray(res)) {
              objects = res;
              break;
            }
            if (Array.isArray((res as any).data)) {
              objects = (res as any).data;
              break;
            }
            if (Array.isArray((res as any).ownedObjects)) {
              objects = (res as any).ownedObjects;
              break;
            }
            // some clients return { data: { data: [...] } }
            if (Array.isArray((res as any).data?.data)) {
              objects = (res as any).data.data;
              break;
            }
            // lastly, if res has .result or .objects arrays
            if (Array.isArray((res as any).result)) {
              objects = (res as any).result;
              break;
            }
            if (Array.isArray((res as any).objects)) {
              objects = (res as any).objects;
              break;
            }
          } catch (e) {
            // try next method
            // eslint-disable-next-line no-console
            console.debug("fetchCoins method attempt failed, trying next: ", e?.toString?.() ?? e);
          }
        }
      } catch (e) {
        console.warn("Failed to fetch user coins:", e);
        objects = [];
      }

      // Be permissive when reading coin object shapes. Different clients return different shapes.
      const coinsData: UserCoin[] = objects
        .map((c) => {
          const asAny = c as any;
          const type = asAny?.data?.type ?? asAny?.type ?? asAny?.data?.content?.type ?? "";
          const objectId = asAny?.objectId ?? asAny?.data?.objectId ?? asAny?.reference?.objectId ?? "";

          // Try several common paths for coin balance
          const balanceCandidates = [
            asAny?.data?.content?.fields?.value,
            asAny?.data?.content?.fields?.balance,
            asAny?.data?.content?.fields?.amount,
            asAny?.content?.fields?.value,
            asAny?.content?.fields?.balance,
            asAny?.content?.fields?.amount,
            asAny?.balance,
            asAny?.amount,
          ];
          let balance = 0;
          for (const b of balanceCandidates) {
            if (b !== undefined && b !== null) {
              const n = Number(b);
              if (!isNaN(n)) {
                balance = n;
                break;
              }
            }
          }

          return {
            type: String(type ?? ""),
            objectId: String(objectId ?? ""),
            balance,
          } as UserCoin;
        })
        .filter((c) => c.type && c.objectId);

      setUserCoins(coinsData);
    }

    fetchCoins();
  }, [account, suiClient]);

  // Update token symbols when userCoins changes
  useEffect(() => {
    if (userCoins.length > 0) {
      const symbols = new Set<string>();
      userCoins.forEach((coin) => {
        const symbol = tokenSymbol(coin.type);
        if (symbol) symbols.add(symbol);
      });
      setTokenSymbols(Array.from(symbols));
    } else {
      setTokenSymbols([]);
    }
  }, [userCoins]);

  // =================== Pool Filtering ===================
  const filteredPools = pools.filter((pool) =>
    `${pool.token1}/${pool.token2}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // =================== Add Liquidity ===================
  async function handleAddLiquidity() {
    if (!connected || !account || !selectedPool) return alert("Connect wallet and select a pool");

    try {
      const tx = new Transaction();
      const coinsA = userCoins.filter((c) => c.type === selectedPool.token1);
      const coinsB = userCoins.filter((c) => c.type === selectedPool.token2);

      if (!coinsA.length || !coinsB.length) return alert("You need coins of both types");

      tx.moveCall({
        target: `${TESTNET_PACKAGE_ID}::pool::add_liquidity`,
        typeArguments: [selectedPool.token1, selectedPool.token2],
        arguments: [
          tx.object(selectedPool.id),
          tx.object(coinsA[0].objectId),
          tx.object(coinsB[0].objectId),
        ],
      });

      const result = await signAndExecuteTransaction({ transaction: tx });
      console.log("Add Liquidity Result:", result);
      alert("Liquidity added successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to add liquidity: " + (e as any).toString());
    }
  }

  // =================== Remove Liquidity ===================
  async function handleRemoveLiquidity() {
    if (!connected || !account || !selectedPool) return alert("Connect wallet and select a pool");
    if (!selectedPool.lpCoinIds || selectedPool.lpCoinIds.length === 0)
      return alert("You do not have LP tokens for this pool");

    try {
      const tx = new Transaction();
      tx.moveCall({
        target: `${TESTNET_PACKAGE_ID}::pool::remove_liquidity`,
        typeArguments: [selectedPool.token1, selectedPool.token2],
        arguments: [
          tx.object(selectedPool.id),
          tx.object(selectedPool.lpCoinIds[0]),
          tx.pure("u128", lpAmount),
        ],
      });

      const result = await signAndExecuteTransaction({ transaction: tx });
      console.log("Remove Liquidity Result:", result);
      alert("Liquidity removed successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to remove liquidity: " + (e as any).toString());
    }
  }

  // =================== Create Pool ===================
  async function handleCreatePool() {
    // Require wallet connected and selected coin objects / amounts
    if (!connected || !account) return alert("Connect wallet first");
    if (!selectedCoinAId || !selectedCoinBId) return alert("Select coin objects for both tokens");
    // Either specify both token amounts, or a total liquidity (legacy). Prefer explicit amounts.
    if ((Number(amountTokenA) <= 0 || Number(amountTokenB) <= 0) && Number(totalLiquidity) <= 0)
      return alert("Specify amounts for both tokens or an overall total liquidity");

    try {
      const tx = new Transaction();

      // 1. Fetch container object
      const containerObjects = await suiClient.getOwnedObjects({
        owner: account.address,
        filter: {
          StructType: `${TESTNET_PACKAGE_ID}::mini_amm::Container`
        },
        options: {
          showType: true,
          showContent: true,
          showOwner: true
        }
      });

      if (!containerObjects.data || containerObjects.data.length === 0) {
        return alert("AMM container not found. Make sure the AMM has been initialized.");
      }

      const containerId = containerObjects.data[0].data?.objectId;
      if (!containerId) return alert("Invalid container ID");

      // 2. Fetch user's selected coin objects
      if (!selectedCoinAId || !selectedCoinBId) return alert("Select specific coin objects for both tokens");
      const coinA = userCoins.find((c) => c.objectId === selectedCoinAId);
      const coinB = userCoins.find((c) => c.objectId === selectedCoinBId);
      if (!coinA || !coinB) return alert("Selected coins not found in your wallet");

      // Validate amounts
      const aAmtNum = Number(amountTokenA);
      const bAmtNum = Number(amountTokenB);
      if (isNaN(aAmtNum) || isNaN(bAmtNum) || aAmtNum <= 0 || bAmtNum <= 0)
        return alert("Enter valid positive amounts for both tokens");
      if (aAmtNum > coinA.balance) return alert("Amount for token A exceeds selected coin balance");
      if (bAmtNum > coinB.balance) return alert("Amount for token B exceeds selected coin balance");

      // 3. Split the selected coin objects into the desired amounts and pass them to create_pool
      // splitCoins returns transaction result references which can be passed as arguments
      const [splitA] = tx.splitCoins(selectedCoinAId, [aAmtNum]);
      const [splitB] = tx.splitCoins(selectedCoinBId, [bAmtNum]);

      tx.moveCall({
        target: `${TESTNET_PACKAGE_ID}::mini_amm::create_pool`,
        typeArguments: [newPoolToken1, newPoolToken2],
        arguments: [tx.object(containerId), splitA, splitB],
      });

      const result = await signAndExecuteTransaction({ transaction: tx });
      console.log("Pool Created:", result);
      alert("Pool created successfully!");

      // Reset form
      setShowCreateForm(false);
      setNewPoolToken1("");
      setNewPoolToken2("");
  setTotalLiquidity("0");
  setSelectedCoinAId("");
  setSelectedCoinBId("");
  setAmountTokenA("0");
  setAmountTokenB("0");

      setTimeout(() => window.location.reload(), 1500);
    } catch (e) {
      console.error(e);
      alert("Failed to create pool: " + (e as any).toString());
    }
  }

  // =================== JSX ===================
  // tokenSymbols is now managed by the useState hook and useEffect above
  
  // Debug log to check connection status and tokens
  useEffect(() => {
    console.log('Wallet connected:', isConnected);
    console.log('Account:', account);
    console.log('User coins:', userCoins);
    console.log('Token symbols:', tokenSymbols);
  }, [isConnected, account, userCoins, tokenSymbols]);
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Create Pool Button */}
      <div className="mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowCreateForm(true)}
        >
          Create New Pool
        </button>
      </div>

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
          <div key={pool.id} className="p-4 hover:bg-muted/50 transition-colors border-b last:border-0">
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
                <div className="font-medium">{pool.token1}/{pool.token2}</div>
              </div>
              <div className="col-span-2 text-right">{pool.price ?? "—"}</div>
              <div className="col-span-2 text-right">{pool.apr ?? "—"}</div>
              <div className="col-span-2 text-right">{pool.fee ?? "—"}</div>
              <div className="col-span-2 text-right">{pool.volume ?? "—"}</div>
              <div className="col-span-1 flex justify-end space-x-1">
                <button className="bg-primary text-white px-2 py-1 rounded"
                  onClick={() => { setSelectedPool(pool); setShowAddForm(true); }}>
                  Add
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => { setSelectedPool(pool); setShowRemoveForm(true); }}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =================== Create Pool Modal =================== */}
      {showCreateForm &&
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto">
          <div className="bg-card rounded-lg p-6 w-full max-w-md mx-4 my-8 relative">
            <button 
              onClick={() => setShowCreateForm(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              aria-label="Close modal"
            >
              ✕
            </button>
            <h3 className="text-lg font-medium mb-4">Create New Pool</h3>

            <label>Token 1 (type)</label>
            {!connected ? (
              <div className="mb-3 text-sm text-muted-foreground">Connect your wallet to list tokens</div>
            ) : tokenSymbols.length === 0 ? (
              <div className="mb-3 text-sm text-muted-foreground">No supported tokens found in your wallet</div>
            ) : (
              <select
                className="w-full mb-2 p-2 border rounded"
                value={newPoolToken1Symbol}
                onChange={(e) => {
                  setNewPoolToken1Symbol(e.target.value);
                  // when selecting a symbol, clear any previously chosen object/type
                  setSelectedCoinAId("");
                  setNewPoolToken1("");
                }}
              >
                <option value="">Select a token type</option>
                  {tokenSymbols.map((sym) => (
                    <option key={sym} value={sym}>
                      {sym} ({formatBalance(userCoins.filter((c) => tokenSymbol(c.type) === sym).reduce((s, c) => s + c.balance, 0))})
                    </option>
                  ))}
              </select>
            )}

            {newPoolToken1Symbol && (
              <>
                <label className="text-sm text-muted-foreground">Select your {newPoolToken1Symbol} coin object</label>
                <select
                  className="w-full mb-2 p-2 border rounded"
                  value={selectedCoinAId}
                  onChange={(e) => {
                    setSelectedCoinAId(e.target.value);
                    const coin = userCoins.find((c) => c.objectId === e.target.value);
                    // set the full Move type for the selected coin (used in typeArguments)
                    setNewPoolToken1(coin?.type ?? "");
                  }}
                >
                  <option value="">Select a coin object</option>
                  {userCoins
                    .filter((c) => tokenSymbol(c.type) === newPoolToken1Symbol)
                    .map((c) => (
                      <option key={c.objectId} value={c.objectId}>
                        {c.objectId.slice(0, 8)}... ({formatBalance(c.balance)})
                      </option>
                    ))}
                </select>

                <label>Amount for {newPoolToken1Symbol}</label>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={amountTokenA}
                    onChange={(e) => {
                      setAmountTokenA(e.target.value);
                      // switching to custom mode if user types
                      setUseRatioMode(false);
                    }}
                    className="flex-1 p-2 border rounded"
                    placeholder={`Enter amount for ${newPoolToken1Symbol}`}
                    disabled={useRatioMode}
                  />
                  <button
                    className="px-3 py-1 border rounded text-sm"
                    onClick={() => {
                      const coin = userCoins.find((c) => c.objectId === selectedCoinAId);
                      if (coin) {
                        setAmountTokenA(String(coin.balance));
                        setUseRatioMode(false);
                      }
                    }}
                  >
                    Max
                  </button>
                </div>
              </>
            )}

            <label>Token 2 (type)</label>
            {!connected ? (
              <div className="mb-3 text-sm text-muted-foreground">Connect your wallet to list tokens</div>
            ) : tokenSymbols.length === 0 ? (
              <div className="mb-3 text-sm text-muted-foreground">No supported tokens found in your wallet</div>
            ) : (
              <select
                className="w-full mb-2 p-2 border rounded"
                value={newPoolToken2Symbol}
                onChange={(e) => {
                  setNewPoolToken2Symbol(e.target.value);
                  setSelectedCoinBId("");
                  setNewPoolToken2("");
                }}
              >
                <option value="">Select a token type</option>
                {tokenSymbols.map((sym) => (
                  <option key={sym} value={sym}>
                    {sym} ({formatBalance(userCoins.filter((c) => tokenSymbol(c.type) === sym).reduce((s, c) => s + c.balance, 0))})
                  </option>
                ))}
              </select>
            )}

            {newPoolToken2Symbol && (
              <>
                <label className="text-sm text-muted-foreground">Select your {newPoolToken2Symbol} coin object</label>
                <select
                  className="w-full mb-2 p-2 border rounded"
                  value={selectedCoinBId}
                  onChange={(e) => {
                    setSelectedCoinBId(e.target.value);
                    const coin = userCoins.find((c) => c.objectId === e.target.value);
                    setNewPoolToken2(coin?.type ?? "");
                  }}
                >
                  <option value="">Select a coin object</option>
                  {userCoins
                    .filter((c) => tokenSymbol(c.type) === newPoolToken2Symbol)
                    .map((c) => (
                      <option key={c.objectId} value={c.objectId}>
                        {c.objectId.slice(0, 8)}... ({formatBalance(c.balance)})
                      </option>
                    ))}
                </select>

                <label>Amount for {newPoolToken2Symbol}</label>
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="text"
                    value={amountTokenB}
                    onChange={(e) => {
                      setAmountTokenB(e.target.value);
                      setUseRatioMode(false);
                    }}
                    className="flex-1 p-2 border rounded"
                    placeholder={`Enter amount for ${newPoolToken2Symbol}`}
                    disabled={useRatioMode}
                  />
                  <button
                    className="px-3 py-1 border rounded text-sm"
                    onClick={() => {
                      const coin = userCoins.find((c) => c.objectId === selectedCoinBId);
                      if (coin) {
                        setAmountTokenB(String(coin.balance));
                        setUseRatioMode(false);
                      }
                    }}
                  >
                    Max
                  </button>
                </div>
              </>
            )}

            {/* Ratio slider: choose percentage of selected coins to deposit */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Deposit Amount</div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center space-x-2">
                  <button className="px-2 py-1 border rounded text-sm" onClick={() => applyPresetPercent(25)}>25%</button>
                  <button className="px-2 py-1 border rounded text-sm" onClick={() => applyPresetPercent(50)}>50%</button>
                  <button className="px-2 py-1 border rounded text-sm" onClick={() => applyPresetPercent(75)}>75%</button>
                  <button className="px-2 py-1 border rounded text-sm" onClick={() => applyPresetPercent(100)}>100%</button>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={ratioPercent}
                  onChange={(e) => {
                    const p = Number(e.target.value);
                    setRatioPercent(p);
                    setUseRatioMode(true);
                    const coinA = userCoins.find((c) => c.objectId === selectedCoinAId);
                    const coinB = userCoins.find((c) => c.objectId === selectedCoinBId);
                    if (coinA) setAmountTokenA(String(Math.floor((coinA.balance * p) / 100)));
                    if (coinB) setAmountTokenB(String(Math.floor((coinB.balance * p) / 100)));
                  }}
                  className="flex-1"
                />
                <div className="text-right text-sm mt-1">{ratioPercent}%</div>
              </div>
            </div>

            <label className="text-sm text-muted-foreground">Optional: Total Liquidity (not required when specifying both amounts)</label>
            <input
              type="text"
              value={totalLiquidity}
              onChange={(e) => setTotalLiquidity(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 border rounded" onClick={() => setShowCreateForm(false)}>Cancel</button>
              <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleCreatePool}>Create</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
