"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useCurrentAccount,
} from "@mysten/dapp-kit";

import { TESTNET_PACKAGE_ID, CONTAINER_ID } from "../constants";
import { BACKEND_URL } from "../constants";
import { Inputs } from "@mysten/sui/transactions";


type PoolSummary = {
  id: string;
  token1: string;
  token2: string;
  token1Symbol?: string;
  token2Symbol?: string;
  token1Icon?: string;  // ADD THIS
  token2Icon?: string;  // ADD THIS
  price?: string;
  apr?: string;
  fee?: string;
  volume?: string;
};

type TokenBalance = {
  symbol: string;
  type: string;
  totalBalance: number;
  coinObjects: { objectId: string; balance: number }[];
};

export default function PoolInterface() {
  const client = useSuiClient();
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const [searchQuery, setSearchQuery] = useState("");
  const [pools, setPools] = useState<PoolSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPool, setSelectedPool] = useState<PoolSummary | null>(null);

  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);

  const [selectedToken1, setSelectedToken1] = useState("");
  const [selectedToken2, setSelectedToken2] = useState("");
  const [amount1, setAmount1] = useState("");
  const [amount2, setAmount2] = useState("");

  const [addAmount1, setAddAmount1] = useState("");
  const [addAmount2, setAddAmount2] = useState("");

  function getTokenSymbol(type: string): string {
    if (!type) return "";
    const lower = type.toLowerCase();
    if (lower.includes("sui") && !lower.includes("usdc") && !lower.includes("usdt")) return "SUI";
    if (lower.includes("usdc")) return "USDC";
    if (lower.includes("usdt")) return "USDT";
    if (lower.includes("weth")) return "WETH";
    if (lower.includes("wbtc")) return "WBTC";
    if (lower.includes("wal")) return "WAL";
    if (lower.includes("sol")) return "SOL";
    if (lower.includes("cetus")) return "CETUS";
    const parts = type.split(/::|</);
    const last = parts[parts.length - 1] ?? type;
    return last.replace(/>.*/g, "").toUpperCase();
  }

  function formatBalance(n: number): string {
    if (!isFinite(n)) return "0";
    if (Number.isInteger(n)) return String(n);
    return Number(n).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8
    });
  }

  useEffect(() => {
    async function fetchUserCoins() {
      if (!account?.address) {
        setTokenBalances([]);
        return;
      }

      try {
        const allCoins = await client.getAllCoins({
          owner: account.address,
        });

        const grouped = new Map<string, TokenBalance>();

        allCoins.data.forEach(coin => {
          const symbol = getTokenSymbol(coin.coinType);
          const balance = Number(coin.balance) / 1e9;

          if (!grouped.has(symbol)) {
            grouped.set(symbol, {
              symbol,
              type: coin.coinType,
              totalBalance: 0,
              coinObjects: []
            });
          }

          const tokenData = grouped.get(symbol)!;
          tokenData.totalBalance += balance;
          tokenData.coinObjects.push({
            objectId: coin.coinObjectId,
            balance
          });
        });

        setTokenBalances(Array.from(grouped.values()).sort((a, b) =>
          a.symbol.localeCompare(b.symbol)
        ));
      } catch (error) {
        console.error('Error fetching user coins:', error);
        setTokenBalances([]);
      }
    }

    fetchUserCoins();
    const interval = setInterval(fetchUserCoins, 10000);
    return () => clearInterval(interval);
  }, [account?.address, client]);

  useEffect(() => {
    async function fetchPools() {
      setLoading(true);
      try {
        if (!BACKEND_URL) {
          console.warn("Backend URL not configured");
          setPools([]);
          return;
        }

        const res = await fetch(`${BACKEND_URL}/api/pools`);
        const json = await res.json();

        if (!json.success || !Array.isArray(json.data)) {
          setPools([]);
          return;
        }

        const mappedPools: PoolSummary[] = json.data.map((pool: any) => ({
          id: pool.id,
          token1: pool.token1,
          token2: pool.token2,
          token1Symbol: pool.token1Symbol || getTokenSymbol(pool.token1),
          token2Symbol: pool.token2Symbol || getTokenSymbol(pool.token2),
          token1Icon: pool.token1Icon || "",  // ADD THIS
          token2Icon: pool.token2Icon || "",  // ADD THIS
          price: pool.price ?? "—",
          apr: pool.apr ?? "—",
          fee: pool.fee ?? "—",
          volume: pool.volume ?? "—",
        }));

        setPools(mappedPools);
      } catch (err) {
        console.error("Failed to fetch pools from backend:", err);
        setPools([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPools();
    const interval = setInterval(fetchPools, 15000);
    return () => clearInterval(interval);
  }, []);

  function selectCoinsForAmount(tokenSymbol: string, amount: number): string[] {
    const token = tokenBalances.find(t => t.symbol === tokenSymbol);
    if (!token) return [];

    let remaining = amount;
    const selectedCoins: string[] = [];

    const sortedCoins = [...token.coinObjects].sort((a, b) => b.balance - a.balance);

    for (const coin of sortedCoins) {
      if (remaining <= 0) break;
      selectedCoins.push(coin.objectId);
      remaining -= coin.balance;
    }

    return selectedCoins;
  }

  // SIMPLE FIX: The real issue is that when you select SUI coins and try to merge them,
  // it conflicts with the wallet's gas payment mechanism.

  // Solution: For SUI, use tx.gas directly. For other tokens, use normal coin selection.

  // Update your handleCreatePool function:
  async function handleCreatePool() {
    if (!account?.address) return alert("Connect wallet first");

    if (!TESTNET_PACKAGE_ID || String(TESTNET_PACKAGE_ID) === "0xYOUR_PACKAGE_ID") {
      return alert("Package ID not configured.");
    }
    if (!CONTAINER_ID || String(CONTAINER_ID) === "0xYOUR_CONTAINER_ID") {
      return alert("Container ID not configured.");
    }

    if (!selectedToken1 || !selectedToken2) return alert("Select both tokens");

    const amt1 = parseFloat(amount1);
    const amt2 = parseFloat(amount2);

    if (isNaN(amt1) || amt1 <= 0 || isNaN(amt2) || amt2 <= 0) {
      return alert("Enter valid amounts for both tokens");
    }

    const token1Data = tokenBalances.find(t => t.symbol === selectedToken1);
    const token2Data = tokenBalances.find(t => t.symbol === selectedToken2);

    if (!token1Data || !token2Data) return alert("Token data not found");
    if (amt1 > token1Data.totalBalance) return alert(`Insufficient ${selectedToken1} balance`);
    if (amt2 > token2Data.totalBalance) return alert(`Insufficient ${selectedToken2} balance`);

    try {
      const tx = new Transaction();

      // Check if tokens are SUI
      const isSUI1 = token1Data.type === "0x2::sui::SUI";
      const isSUI2 = token2Data.type === "0x2::sui::SUI";

      let splitCoin1;
      if (isSUI1) {
        // For SUI: split directly from gas coin
        [splitCoin1] = tx.splitCoins(tx.gas, [tx.pure.u64(Math.floor(amt1 * 1e9))]);
      } else {
        // For other tokens: normal coin selection
        const coins1 = selectCoinsForAmount(selectedToken1, amt1);
        if (!coins1.length) return alert("Unable to select coins for transaction");

        let coin1Arg = tx.object(coins1[0]);
        if (coins1.length > 1) {
          tx.mergeCoins(coin1Arg, coins1.slice(1).map(id => tx.object(id)));
        }
        [splitCoin1] = tx.splitCoins(coin1Arg, [tx.pure.u64(Math.floor(amt1 * 1e9))]);
      }

      let splitCoin2;
      if (isSUI2) {
        // For SUI: split directly from gas coin
        [splitCoin2] = tx.splitCoins(tx.gas, [tx.pure.u64(Math.floor(amt2 * 1e9))]);
      } else {
        // For other tokens: normal coin selection
        const coins2 = selectCoinsForAmount(selectedToken2, amt2);
        if (!coins2.length) return alert("Unable to select coins for transaction");

        let coin2Arg = tx.object(coins2[0]);
        if (coins2.length > 1) {
          tx.mergeCoins(coin2Arg, coins2.slice(1).map(id => tx.object(id)));
        }
        [splitCoin2] = tx.splitCoins(coin2Arg, [tx.pure.u64(Math.floor(amt2 * 1e9))]);
      }

      tx.moveCall({
        target: `${TESTNET_PACKAGE_ID}::mini_amm::create_pool`,
        typeArguments: [token1Data.type, token2Data.type],
        arguments: [tx.object(CONTAINER_ID), splitCoin1, splitCoin2],
      });

      await signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: () => {
            alert("Pool created successfully!");
            setShowCreateForm(false);
            setSelectedToken1("");
            setSelectedToken2("");
            setAmount1("");
            setAmount2("");
          },
          onError: (error) => {
            console.error(error);
            alert("Failed to create pool: " + error.message);
          }
        }
      );
    } catch (e) {
      console.error(e);
      alert("Failed to create pool: " + (e as any).message);
    }
  }

  // Update handleAddLiquidity with the same pattern:
  async function handleAddLiquidity() {
    if (!account?.address || !selectedPool) return alert("Connect wallet and select a pool");

    const amt1 = parseFloat(addAmount1);
    const amt2 = parseFloat(addAmount2);

    if (isNaN(amt1) || amt1 <= 0 || isNaN(amt2) || amt2 <= 0) {
      return alert("Enter valid amounts for both tokens");
    }

    const token1Symbol = selectedPool.token1Symbol || getTokenSymbol(selectedPool.token1);
    const token2Symbol = selectedPool.token2Symbol || getTokenSymbol(selectedPool.token2);

    const token1Data = tokenBalances.find(t => t.symbol === token1Symbol);
    const token2Data = tokenBalances.find(t => t.symbol === token2Symbol);

    if (!token1Data || !token2Data) return alert("Token data not found");
    if (amt1 > token1Data.totalBalance) return alert(`Insufficient ${token1Symbol} balance`);
    if (amt2 > token2Data.totalBalance) return alert(`Insufficient ${token2Symbol} balance`);

    try {
      const tx = new Transaction();

      // Check if tokens are SUI
      const isSUI1 = selectedPool.token1 === "0x2::sui::SUI";
      const isSUI2 = selectedPool.token2 === "0x2::sui::SUI";

      let splitCoin1;
      if (isSUI1) {
        [splitCoin1] = tx.splitCoins(tx.gas, [tx.pure.u64(Math.floor(amt1 * 1e9))]);
      } else {
        const coins1 = selectCoinsForAmount(token1Symbol, amt1);
        let coin1Arg = tx.object(coins1[0]);
        if (coins1.length > 1) {
          tx.mergeCoins(coin1Arg, coins1.slice(1).map(id => tx.object(id)));
        }
        [splitCoin1] = tx.splitCoins(coin1Arg, [tx.pure.u64(Math.floor(amt1 * 1e9))]);
      }

      let splitCoin2;
      if (isSUI2) {
        [splitCoin2] = tx.splitCoins(tx.gas, [tx.pure.u64(Math.floor(amt2 * 1e9))]);
      } else {
        const coins2 = selectCoinsForAmount(token2Symbol, amt2);
        let coin2Arg = tx.object(coins2[0]);
        if (coins2.length > 1) {
          tx.mergeCoins(coin2Arg, coins2.slice(1).map(id => tx.object(id)));
        }
        [splitCoin2] = tx.splitCoins(coin2Arg, [tx.pure.u64(Math.floor(amt2 * 1e9))]);
      }

      tx.moveCall({
        target: `${TESTNET_PACKAGE_ID}::pool::add_liquidity`,
        typeArguments: [selectedPool.token1, selectedPool.token2],
        arguments: [tx.object(selectedPool.id), splitCoin1, splitCoin2],
      });

      await signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: () => {
            alert("Liquidity added successfully!");
            setShowAddForm(false);
            setAddAmount1("");
            setAddAmount2("");
          },
          onError: (error) => {
            console.error(error);
            alert("Failed to add liquidity: " + error.message);
          }
        }
      );
    } catch (e) {
      console.error(e);
      alert("Failed to add liquidity: " + (e as any).message);
    }
  }



  const filteredPools = pools.filter((pool) => {
    const token1 = pool.token1Symbol || getTokenSymbol(pool.token1);
    const token2 = pool.token2Symbol || getTokenSymbol(pool.token2);
    return `${token1}/${token2}`.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const connected = !!account?.address;
  const isConfigured =
    String(TESTNET_PACKAGE_ID) !== "0xYOUR_PACKAGE_ID" &&
    String(CONTAINER_ID) !== "0xYOUR_CONTAINER_ID";

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {!isConfigured && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="font-bold text-yellow-600 mb-2">⚠️ Configuration Required</div>
          <div className="text-sm text-yellow-700">
            Please update the following constants in the code:
            <ul className="list-disc ml-6 mt-2">
              <li><code className="bg-yellow-100 px-1 rounded">TESTNET_PACKAGE_ID</code> - Your deployed package ID</li>
              <li><code className="bg-yellow-100 px-1 rounded">CONTAINER_ID</code> - Your Container object ID</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Liquidity Pools</h1>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setShowCreateForm(true)}
          disabled={!connected || !isConfigured}
        >
          + Create Pool
        </button>
      </div>

      {connected && tokenBalances.length > 0 && (
        <div className="mb-4 p-4 bg-muted/30 rounded-lg">
          <div className="text-sm font-medium mb-2">Your Tokens:</div>
          <div className="flex flex-wrap gap-2">
            {tokenBalances.map(token => (
              <div key={token.symbol} className="px-3 py-1 bg-background rounded-full text-sm">
                {token.symbol}: {formatBalance(token.totalBalance)}
              </div>
            ))}
          </div>
        </div>
      )}

      {!connected && (
        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
          <div className="text-blue-700">Connect your wallet to view and manage liquidity pools</div>
        </div>
      )}

      <input
        type="text"
        placeholder="Search pools..."
        className="w-full bg-background px-4 py-3 rounded-lg border mb-6 focus:outline-none focus:ring-2 focus:ring-primary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="bg-card rounded-xl overflow-hidden border">
        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium border-b bg-muted/30">
          <div className="col-span-3">Pool</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">APR</div>
          <div className="col-span-2 text-right">Trading Fee</div>
          <div className="col-span-2 text-right">Total Trading Volume</div>
          <div className="col-span-1"></div>
        </div>

        {loading && <div className="p-8 text-center text-muted-foreground">Loading pools...</div>}
        {!loading && filteredPools.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            {isConfigured
              ? "No pools found. Create your first pool to get started!"
              : "Configure the contract IDs above to view pools."}
          </div>
        )}

        {filteredPools.map((pool) => {
          const token1 = pool.token1Symbol || getTokenSymbol(pool.token1);
          const token2 = pool.token2Symbol || getTokenSymbol(pool.token2);

          return (
            <div key={pool.id} className="p-4 hover:bg-muted/30 transition-colors border-b last:border-0">
              <div className="grid grid-cols-12 items-center gap-4">
                <div className="col-span-3 flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {/* Token 1 Icon */}
                    {pool.token1Icon ? (
                      <img
                        src={pool.token1Icon}
                        alt={token1}
                        className="w-8 h-8 rounded-full border-2 border-background object-cover"
                        onError={(e) => {
                          // Fallback to letter avatar if image fails
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm border-2 border-background"
                      style={{ display: pool.token1Icon ? 'none' : 'flex' }}
                    >
                      {token1[0]}
                    </div>

                    {/* Token 2 Icon */}
                    {pool.token2Icon ? (
                      <img
                        src={pool.token2Icon}
                        alt={token2}
                        className="w-8 h-8 rounded-full border-2 border-background object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm border-2 border-background"
                      style={{ display: pool.token2Icon ? 'none' : 'flex' }}
                    >
                      {token2[0]}
                    </div>
                  </div>
                  <div className="font-medium">
                    {token1}/{token2}
                  </div>
                </div>
                <div className="col-span-2 text-right text-sm">{pool.price}</div>
                <div className="col-span-2 text-right text-sm">{pool.apr}</div>
                <div className="col-span-2 text-right text-sm">{pool.fee}</div>
                <div className="col-span-2 text-right text-sm">{pool.volume}</div>
                <div className="col-span-1 flex justify-end">
                  <button
                    className="bg-white text-black border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => { setSelectedPool(pool); setShowAddForm(true); }}
                    disabled={!connected}
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals remain the same */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Create New Pool</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-muted-foreground hover:text-foreground text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Token 1</label>
              <select
                className="w-full p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                value={selectedToken1}
                onChange={(e) => setSelectedToken1(e.target.value)}
              >
                <option value="">Select token</option>
                {tokenBalances.map(token => (
                  <option key={token.symbol} value={token.symbol}>
                    {token.symbol} (Balance: {formatBalance(token.totalBalance)})
                  </option>
                ))}
              </select>
            </div>

            {selectedToken1 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Amount</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={amount1}
                    onChange={(e) => setAmount1(e.target.value)}
                    className="flex-1 p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="0.00"
                    step="0.01"
                  />
                  <button
                    onClick={() => {
                      const token = tokenBalances.find(t => t.symbol === selectedToken1);
                      if (token) setAmount1(String(token.totalBalance));
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors font-medium"
                  >
                    MAX
                  </button>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Available: {formatBalance(tokenBalances.find(t => t.symbol === selectedToken1)?.totalBalance ?? 0)}
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Token 2</label>
              <select
                className="w-full p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                value={selectedToken2}
                onChange={(e) => setSelectedToken2(e.target.value)}
              >
                <option value="">Select token</option>
                {tokenBalances
                  .filter(t => t.symbol !== selectedToken1)
                  .map(token => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol} (Balance: {formatBalance(token.totalBalance)})
                    </option>
                  ))}
              </select>
            </div>

            {selectedToken2 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Amount</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={amount2}
                    onChange={(e) => setAmount2(e.target.value)}
                    className="flex-1 p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="0.00"
                    step="0.01"
                  />
                  <button
                    onClick={() => {
                      const token = tokenBalances.find(t => t.symbol === selectedToken2);
                      if (token) setAmount2(String(token.totalBalance));
                    }}
                    className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors font-medium"
                  >
                    MAX
                  </button>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Available: {formatBalance(tokenBalances.find(t => t.symbol === selectedToken2)?.totalBalance ?? 0)}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-3 border rounded-lg hover:bg-muted transition-colors font-medium"
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCreatePool}
                disabled={!selectedToken1 || !selectedToken2 || !amount1 || !amount2}
              >
                Create Pool
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && selectedPool && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add Liquidity</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-muted-foreground hover:text-foreground text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="mb-4 p-4 bg-muted/30 rounded-lg">
              <div className="font-medium">
                {selectedPool.token1Symbol || getTokenSymbol(selectedPool.token1)}/
                {selectedPool.token2Symbol || getTokenSymbol(selectedPool.token2)}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {selectedPool.token1Symbol || getTokenSymbol(selectedPool.token1)} Amount
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={addAmount1}
                  onChange={(e) => setAddAmount1(e.target.value)}
                  className="flex-1 p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="0.00"
                  step="0.01"
                />
                <button
                  onClick={() => {
                    const symbol = selectedPool.token1Symbol || getTokenSymbol(selectedPool.token1);
                    const token = tokenBalances.find(t => t.symbol === symbol);
                    if (token) setAddAmount1(String(token.totalBalance));
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  MAX
                </button>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Available: {formatBalance(tokenBalances.find(t => t.symbol === (selectedPool.token1Symbol || getTokenSymbol(selectedPool.token1)))?.totalBalance ?? 0)}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                {selectedPool.token2Symbol || getTokenSymbol(selectedPool.token2)} Amount
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={addAmount2}
                  onChange={(e) => setAddAmount2(e.target.value)}
                  className="flex-1 p-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="0.00"
                  step="0.01"
                />
                <button
                  onClick={() => {
                    const symbol = selectedPool.token2Symbol || getTokenSymbol(selectedPool.token2);
                    const token = tokenBalances.find(t => t.symbol === symbol);
                    if (token) setAddAmount2(String(token.totalBalance));
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  MAX
                </button>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Available: {formatBalance(tokenBalances.find(t => t.symbol === (selectedPool.token2Symbol || getTokenSymbol(selectedPool.token2)))?.totalBalance ?? 0)}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-3 border rounded-lg hover:bg-muted transition-colors font-medium"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddLiquidity}
                disabled={!addAmount1 || !addAmount2}
              >
                Add Liquidity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}