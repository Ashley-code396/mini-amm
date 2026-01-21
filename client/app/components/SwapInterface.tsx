"use client";

import { useEffect, useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import { ChevronDown, ArrowDownUp, Settings } from "lucide-react";

import { TESTNET_PACKAGE_ID, CONTAINER_ID } from "../constants";
import { BACKEND_URL } from "../constants";

type PoolSummary = {
  id: string;
  token1: string;
  token2: string;
  token1Symbol?: string;
  token2Symbol?: string;
  token1Icon?: string;
  token2Icon?: string;
  price?: string;
  reserve1?: number;
  reserve2?: number;
};

type TokenBalance = {
  symbol: string;
  type: string;
  totalBalance: number;
  coinObjects: { objectId: string; balance: number }[];
};

export default function SwapInterface() {
  const client = useSuiClient();
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const [pools, setPools] = useState<PoolSummary[]>([]);
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [loading, setLoading] = useState(false);

  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [selectedPool, setSelectedPool] = useState<PoolSummary | null>(null);
  const [slippage, setSlippage] = useState(1.0);
  const [showSlippageModal, setShowSlippageModal] = useState(false);
  const [customSlippage, setCustomSlippage] = useState("");

  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);

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
      try {
        if (!BACKEND_URL) {
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
          token1Icon: pool.token1Icon || "",
          token2Icon: pool.token2Icon || "",
          price: pool.price ?? "—",
          reserve1: pool.reserve1 || 0,
          reserve2: pool.reserve2 || 0,
        }));

        setPools(mappedPools);
      } catch (err) {
        console.error("Failed to fetch pools from backend:", err);
        setPools([]);
      }
    }

    fetchPools();
    const interval = setInterval(fetchPools, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (fromToken && toToken) {
      const pool = pools.find(p => {
        const sym1 = p.token1Symbol || getTokenSymbol(p.token1);
        const sym2 = p.token2Symbol || getTokenSymbol(p.token2);
        return (sym1 === fromToken && sym2 === toToken) || (sym1 === toToken && sym2 === fromToken);
      });
      setSelectedPool(pool || null);
    } else {
      setSelectedPool(null);
    }
  }, [fromToken, toToken, pools]);

  useEffect(() => {
    if (fromAmount && selectedPool && parseFloat(fromAmount) > 0) {
      calculateSwapOutput();
    } else {
      setToAmount("");
    }
  }, [fromAmount, selectedPool]);

  function calculateSwapOutput() {
    if (!selectedPool || !fromAmount) return;

    const amountIn = parseFloat(fromAmount);
    if (isNaN(amountIn) || amountIn <= 0) return;

    const sym1 = selectedPool.token1Symbol || getTokenSymbol(selectedPool.token1);
    const isAtoB = fromToken === sym1;

    const reserveIn = isAtoB ? (selectedPool.reserve1 || 0) : (selectedPool.reserve2 || 0);
    const reserveOut = isAtoB ? (selectedPool.reserve2 || 0) : (selectedPool.reserve1 || 0);

    if (reserveIn === 0 || reserveOut === 0) {
      setToAmount("0");
      return;
    }

    // Fee calculation: 0.3% total fee
    const FEE_BPS = 30;
    const BPS_DIVISOR = 10000;
    
    const amountInRaw = amountIn * 1e9;
    const feeTotal = Math.floor(amountInRaw * FEE_BPS / BPS_DIVISOR);
    const netAmount = amountInRaw - feeTotal;

    const reserveInRaw = reserveIn * 1e9;
    const reserveOutRaw = reserveOut * 1e9;
    const k = reserveInRaw * reserveOutRaw;

    const newReserveIn = reserveInRaw + netAmount;
    const newReserveOut = Math.floor(k / newReserveIn);
    const amountOut = reserveOutRaw - newReserveOut;

    setToAmount(formatBalance(amountOut / 1e9));
  }

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

  async function handleSwap() {
    if (!account?.address) return alert("Connect wallet first");
    if (!selectedPool) return alert("No pool available for this token pair");

    const amt = parseFloat(fromAmount);
    if (isNaN(amt) || amt <= 0) return alert("Enter valid amount");

    const fromTokenData = tokenBalances.find(t => t.symbol === fromToken);
    if (!fromTokenData) return alert("Token data not found");
    if (amt > fromTokenData.totalBalance) return alert(`Insufficient ${fromToken} balance`);

    try {
      setLoading(true);
      const tx = new Transaction();

      const isSUI = fromTokenData.type === "0x2::sui::SUI";
      const amountInRaw = Math.floor(amt * 1e9);

      let coinIn;
      if (isSUI) {
        [coinIn] = tx.splitCoins(tx.gas, [tx.pure.u64(amountInRaw)]);
      } else {
        const coins = selectCoinsForAmount(fromToken, amt);
        if (!coins.length) return alert("Unable to select coins for transaction");

        let coinArg = tx.object(coins[0]);
        if (coins.length > 1) {
          tx.mergeCoins(coinArg, coins.slice(1).map(id => tx.object(id)));
        }
        [coinIn] = tx.splitCoins(coinArg, [tx.pure.u64(amountInRaw)]);
      }

      const sym1 = selectedPool.token1Symbol || getTokenSymbol(selectedPool.token1);
      const isAtoB = fromToken === sym1;

      // Use the correct function name from mini_amm module
      const swapFunction = isAtoB ? "swap_a_for_b_in_pool" : "swap_b_for_a_in_pool";

      tx.moveCall({
        target: `${TESTNET_PACKAGE_ID}::mini_amm::${swapFunction}`,
        typeArguments: [selectedPool.token1, selectedPool.token2],
        arguments: [
          tx.object(CONTAINER_ID),
          tx.pure.id(selectedPool.id),
          coinIn
        ],
      });

      await signAndExecuteTransaction(
        { transaction: tx },
        {
          onSuccess: () => {
            alert("Swap successful!");
            setFromAmount("");
            setToAmount("");
          },
          onError: (error) => {
            console.error(error);
            alert("Swap failed: " + error.message);
          }
        }
      );
    } catch (e) {
      console.error(e);
      alert("Swap failed: " + (e as any).message);
    } finally {
      setLoading(false);
    }
  }

  function handleReverseTokens() {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  }

  const connected = !!account?.address;
  const canSwap = connected && fromToken && toToken && fromAmount && selectedPool && !loading;

  const fromTokenData = tokenBalances.find(t => t.symbol === fromToken);
  const toTokenData = tokenBalances.find(t => t.symbol === toToken);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">Exchange Token</h1>
            <button
              onClick={() => setShowSlippageModal(true)}
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {!connected && (
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
              <div className="text-blue-400 text-sm">Connect your wallet to swap tokens</div>
            </div>
          )}

          <div className="space-y-2">
            {/* From Token */}
            <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-700/30">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">From</label>
                {fromTokenData && (
                  <div className="text-xs text-gray-500">
                    Balance: {formatBalance(fromTokenData.totalBalance)}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowFromTokens(!showFromTokens)}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition-colors min-w-[120px]"
                  disabled={!connected}
                >
                  {fromToken ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                        {fromToken[0]}
                      </div>
                      <span className="text-white font-medium">{fromToken}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Select Token</span>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                </button>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-white text-xl text-right focus:outline-none"
                  disabled={!fromToken}
                />
              </div>
              {fromToken && fromTokenData && (
                <div className="mt-2 flex gap-2">
                  {[25, 50, 75].map(pct => (
                    <button
                      key={pct}
                      onClick={() => setFromAmount(String(fromTokenData.totalBalance * pct / 100))}
                      className="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors"
                    >
                      {pct}%
                    </button>
                  ))}
                  <button
                    onClick={() => setFromAmount(String(fromTokenData.totalBalance))}
                    className="px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors"
                  >
                    MAX
                  </button>
                </div>
              )}
            </div>

            {/* Swap Direction Button */}
            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={handleReverseTokens}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-xl border-4 border-gray-800/50 transition-colors"
                disabled={!fromToken || !toToken}
              >
                <ArrowDownUp className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* To Token */}
            <div className="bg-gray-900/50 rounded-2xl p-4 border border-gray-700/30">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-gray-400">To</label>
                {toTokenData && (
                  <div className="text-xs text-gray-500">
                    Balance: {formatBalance(toTokenData.totalBalance)}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowToTokens(!showToTokens)}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-xl transition-colors min-w-[120px]"
                  disabled={!connected}
                >
                  {toToken ? (
                    <>
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs">
                        {toToken[0]}
                      </div>
                      <span className="text-white font-medium">{toToken}</span>
                    </>
                  ) : (
                    <span className="text-gray-400">Select Token</span>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                </button>
                <input
                  type="text"
                  value={toAmount}
                  readOnly
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-white text-xl text-right focus:outline-none"
                />
              </div>
            </div>
          </div>

          {!fromToken || !toToken ? (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
              <div className="text-red-400 text-sm">⚠️ Please select the correct tokens for swapping</div>
            </div>
          ) : !selectedPool ? (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-center">
              <div className="text-yellow-400 text-sm">No pool available for this pair</div>
            </div>
          ) : null}

          {selectedPool && fromAmount && toAmount && (
            <div className="mt-4 p-3 bg-gray-900/50 rounded-xl text-sm space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Slippage Tolerance</span>
                <span className="text-white">{slippage}%</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Minimum Received</span>
                <span className="text-white">
                  {formatBalance(parseFloat(toAmount) * (1 - slippage / 100))} {toToken}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Trading Fee</span>
                <span className="text-white">0.3%</span>
              </div>
            </div>
          )}

          <button
            onClick={handleSwap}
            disabled={!canSwap}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 rounded-2xl font-bold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-600"
          >
            {loading ? "Swapping..." : canSwap ? "SWAP" : "Enter Amount"}
          </button>
        </div>
      </div>

      {/* Token Selection Modal - From */}
      {showFromTokens && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Select Token</h3>
              <button onClick={() => setShowFromTokens(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            <div className="space-y-2">
              {tokenBalances.map(token => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    setFromToken(token.symbol);
                    setShowFromTokens(false);
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      {token.symbol[0]}
                    </div>
                    <span className="text-white font-medium">{token.symbol}</span>
                  </div>
                  <span className="text-gray-400">{formatBalance(token.totalBalance)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Token Selection Modal - To */}
      {showToTokens && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Select Token</h3>
              <button onClick={() => setShowToTokens(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            <div className="space-y-2">
              {tokenBalances.filter(t => t.symbol !== fromToken).map(token => (
                <button
                  key={token.symbol}
                  onClick={() => {
                    setToToken(token.symbol);
                    setShowToTokens(false);
                  }}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                      {token.symbol[0]}
                    </div>
                    <span className="text-white font-medium">{token.symbol}</span>
                  </div>
                  <span className="text-gray-400">{formatBalance(token.totalBalance)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Slippage Modal */}
      {showSlippageModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Slippage Settings</h3>
              <button onClick={() => setShowSlippageModal(false)} className="text-gray-400 hover:text-white text-2xl">×</button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                {[0.2, 0.5, 1.0, 2.0].map(pct => (
                  <button
                    key={pct}
                    onClick={() => setSlippage(pct)}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      slippage === pct
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={customSlippage}
                  onChange={(e) => setCustomSlippage(e.target.value)}
                  placeholder="Custom"
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.1"
                />
                <button
                  onClick={() => {
                    const val = parseFloat(customSlippage);
                    if (!isNaN(val) && val > 0 && val <= 50) {
                      setSlippage(val);
                      setShowSlippageModal(false);
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  Set
                </button>
              </div>
              <div className="text-xs text-gray-400 text-center">
                Your transaction will revert if the price changes unfavorably by more than this percentage
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}