"use client";

import { useEffect, useState } from "react";
import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { BACKEND_URL } from "../constants";

type Transaction = {
  id: number;
  userAddress: string;
  type: string;
  token1: string | null;
  token2: string | null;
  token1Symbol: string | null;
  token2Symbol: string | null;
  token1Icon: string | null;
  token2Icon: string | null;
  amount1: string | null;
  amount2: string | null;
  lpAmount: string | null;
  txDigest: string;
  timestamp: string;
  pool: {
    poolId: string;
    token1: string | null;
    token2: string | null;
    token1Symbol: string | null;
    token2Symbol: string | null;
    token1Icon: string | null;
    token2Icon: string | null;
  } | null;
};

type CoinMetadata = {
  symbol: string;
  name: string;
  decimals: number;
  iconUrl: string | null;
};

// Known token icons (fallback mapping)
const KNOWN_TOKEN_ICONS: Record<string, string> = {
  'SUI': 'https://coin-images.coingecko.com/coins/images/26375/small/sui_asset.jpeg',
  'USDC': 'https://coin-images.coingecko.com/coins/images/6319/small/usdc.png',
  'USDT': 'https://coin-images.coingecko.com/coins/images/325/small/Tether.png',
  'WETH': 'https://coin-images.coingecko.com/coins/images/2518/small/weth.png',
  'WBTC': 'https://coin-images.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
  'SOL': 'https://coin-images.coingecko.com/coins/images/4128/small/solana.png',
  'CETUS': 'https://coin-images.coingecko.com/coins/images/30556/small/cetus.png',
};

export default function Transactions() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [showMyTxOnly, setShowMyTxOnly] = useState(false);

  // Cache for coin metadata
  const [metadataCache, setMetadataCache] = useState<Map<string, CoinMetadata | null>>(new Map());

  // Fetch coin metadata from blockchain
  async function getCoinMetadata(coinType: string): Promise<CoinMetadata | null> {
    if (!coinType) return null;

    // Check cache first
    if (metadataCache.has(coinType)) {
      return metadataCache.get(coinType) || null;
    }

    try {
      const metadata = await client.getCoinMetadata({ coinType });
      
      if (metadata) {
        const result: CoinMetadata = {
          symbol: metadata.symbol,
          name: metadata.name,
          decimals: metadata.decimals,
          iconUrl: metadata.iconUrl || null
        };
        
        setMetadataCache(prev => new Map(prev).set(coinType, result));
        return result;
      }
      
      setMetadataCache(prev => new Map(prev).set(coinType, null));
      return null;
    } catch (error) {
      console.error(`Error fetching metadata for ${coinType}:`, error);
      setMetadataCache(prev => new Map(prev).set(coinType, null));
      return null;
    }
  }

  // Fallback: extract symbol from coin type string
  function getTokenSymbolFromType(type: string): string {
    if (!type) return "UNKNOWN";

    // Check for SUI native coin first
    if (type === "0x2::sui::SUI" || type.toLowerCase() === "0x2::sui::sui") return "SUI";

    // Extract module/type name from pattern like 0xADDRESS::module::Token
    const moduleMatch = type.match(/::\w+::(\w+)/);
    if (moduleMatch && moduleMatch[1]) {
      return moduleMatch[1].toUpperCase();
    }

    // Last resort: take last segment of type string
    const parts = type.split(/::|</);
    const last = parts[parts.length - 1] ?? type;
    return last.replace(/>.*/g, "").toUpperCase().slice(0, 10);
  }

  // Generate fallback icon URL
  function getFallbackIconUrl(symbol: string): string {
    // Check if we have a known icon for this symbol
    if (KNOWN_TOKEN_ICONS[symbol]) {
      return KNOWN_TOKEN_ICONS[symbol];
    }
    
    // Generate a unique icon using DiceBear
    return `https://api.dicebear.com/7.x/identicon/svg?seed=${symbol}&backgroundColor=3b82f6`;
  }

  useEffect(() => {
    fetchTransactions();
  }, [showMyTxOnly, filter, account]);

  async function fetchTransactions() {
    setLoading(true);
    try {
      if (!BACKEND_URL) {
        console.warn("Backend URL not configured");
        setTransactions([]);
        return;
      }

      let url = `${BACKEND_URL}/api/transactions?take=100`;
      
      if (showMyTxOnly && account?.address) {
        url += `&userAddress=${account.address}`;
      }
      
      if (filter !== "all") {
        url += `&type=${filter}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      if (json?.success) {
        // Enrich transactions with real metadata
        const enrichedTransactions = await Promise.all(
          json.data.map(async (tx: Transaction) => {
            // Get metadata for token1 and token2
            let token1Symbol = tx.token1Symbol;
            let token1Icon = tx.token1Icon;
            let token2Symbol = tx.token2Symbol;
            let token2Icon = tx.token2Icon;

            if (tx.token1) {
              const meta1 = await getCoinMetadata(tx.token1);
              token1Symbol = meta1?.symbol || getTokenSymbolFromType(tx.token1);
              token1Icon = meta1?.iconUrl || getFallbackIconUrl(token1Symbol);
            }

            if (tx.token2) {
              const meta2 = await getCoinMetadata(tx.token2);
              token2Symbol = meta2?.symbol || getTokenSymbolFromType(tx.token2);
              token2Icon = meta2?.iconUrl || getFallbackIconUrl(token2Symbol);
            }

            // Enrich pool data if exists
            let enrichedPool = tx.pool;
            if (tx.pool) {
              let poolToken1Symbol = tx.pool.token1Symbol;
              let poolToken1Icon = tx.pool.token1Icon;
              let poolToken2Symbol = tx.pool.token2Symbol;
              let poolToken2Icon = tx.pool.token2Icon;

              if (tx.pool.token1) {
                const meta1 = await getCoinMetadata(tx.pool.token1);
                poolToken1Symbol = meta1?.symbol || getTokenSymbolFromType(tx.pool.token1);
                poolToken1Icon = meta1?.iconUrl || getFallbackIconUrl(poolToken1Symbol);
              }

              if (tx.pool.token2) {
                const meta2 = await getCoinMetadata(tx.pool.token2);
                poolToken2Symbol = meta2?.symbol || getTokenSymbolFromType(tx.pool.token2);
                poolToken2Icon = meta2?.iconUrl || getFallbackIconUrl(poolToken2Symbol);
              }

              enrichedPool = {
                ...tx.pool,
                token1Symbol: poolToken1Symbol,
                token2Symbol: poolToken2Symbol,
                token1Icon: poolToken1Icon,
                token2Icon: poolToken2Icon,
              };
            }

            return {
              ...tx,
              token1Symbol,
              token1Icon,
              token2Symbol,
              token2Icon,
              pool: enrichedPool,
            };
          })
        );

        setTransactions(enrichedTransactions);
      }
    } catch (err) {
      console.error("Failed to fetch transactions", err);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }

  function formatAmount(amount: string | null): string {
    if (!amount) return "—";
    const num = parseFloat(amount) / 1e9;
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
  }

  function getTypeColor(type: string): string {
    switch (type) {
      case "LiquidityAdded":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "LiquidityRemoved":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      case "SwapExecuted":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  }

  function getTypeLabel(type: string): string {
    switch (type) {
      case "LiquidityAdded":
        return "Add Liquidity";
      case "LiquidityRemoved":
        return "Remove Liquidity";
      case "SwapExecuted":
        return "Swap";
      default:
        return type;
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
        
        {/* Filters */}
        <div className="flex gap-4 flex-wrap items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("SwapEvent")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "SwapExecuted"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Swaps
            </button>
            <button
              onClick={() => setFilter("LiquidityAdded")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "LiquidityAdded"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Add Liquidity
            </button>
            <button
              onClick={() => setFilter("LiquidityRemoved")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === "LiquidityRemoved"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Remove Liquidity
            </button>
          </div>

          {account && (
            <label className="flex items-center gap-2 ml-auto">
              <input
                type="checkbox"
                checked={showMyTxOnly}
                onChange={(e) => setShowMyTxOnly(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-gray-300">My Transactions Only</span>
            </label>
          )}
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-gray-400">
          Loading transactions...
        </div>
      )}

      {!loading && transactions.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          No transactions found
        </div>
      )}

      {!loading && transactions.length > 0 && (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-card rounded-xl p-4 border hover:border-gray-600 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: Type Badge & Pool Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(
                        tx.type
                      )}`}
                    >
                      {getTypeLabel(tx.type)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(Number(tx.timestamp)).toLocaleString()}
                    </span>
                  </div>

                  {/* Pool Token Pair */}
                  {tx.pool && (
                    <div className="flex items-center gap-2 mb-2 min-w-0">
                      <div className="flex items-center gap-1">
                        {tx.pool.token1Icon ? (
                          <img
                            src={tx.pool.token1Icon}
                            alt={tx.pool.token1Symbol || "Token 1"}
                            className="w-6 h-6 rounded-full"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs"
                          style={{ display: tx.pool.token1Icon ? 'none' : 'flex' }}
                        >
                          {tx.pool.token1Symbol?.[0] || "?"}
                        </div>
                        <span className="text-sm font-medium truncate overflow-hidden max-w-[6rem]">
                          {tx.pool.token1Symbol || "Unknown"}
                        </span>
                      </div>
                      <span className="text-gray-500">/</span>
                      <div className="flex items-center gap-1">
                        {tx.pool.token2Icon ? (
                          <img
                            src={tx.pool.token2Icon}
                            alt={tx.pool.token2Symbol || "Token 2"}
                            className="w-6 h-6 rounded-full"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div 
                          className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs"
                          style={{ display: tx.pool.token2Icon ? 'none' : 'flex' }}
                        >
                          {tx.pool.token2Symbol?.[0] || "?"}
                        </div>
                        <span className="text-sm font-medium truncate overflow-hidden max-w-[6rem]">
                          {tx.pool.token2Symbol || "Unknown"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Transaction Details */}
                  <div className="text-sm space-y-1">
                    {tx.type === "SwapExecuted" && (
                      <div className="text-gray-300 flex items-center gap-2 min-w-0">
                          <span className="whitespace-nowrap">Swapped</span>
                          {tx.token1Icon && (
                            <img src={tx.token1Icon} alt={tx.token1Symbol || ""} className="w-4 h-4 rounded-full inline flex-shrink-0" />
                          )}
                          <span className="font-medium truncate overflow-hidden max-w-[7rem]">{formatAmount(tx.amount1)} {tx.token1Symbol}</span>
                          <span className="flex-shrink-0">→</span>
                          {tx.token2Icon && (
                            <img src={tx.token2Icon} alt={tx.token2Symbol || ""} className="w-4 h-4 rounded-full inline flex-shrink-0" />
                          )}
                          <span className="font-medium truncate overflow-hidden max-w-[7rem]">{formatAmount(tx.amount2)} {tx.token2Symbol}</span>
                        </div>
                    )}
                    {tx.type === "LiquidityAdded" && (
                      <div className="text-gray-300">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="whitespace-nowrap">Added</span>
                          {tx.token1Icon && (
                            <img src={tx.token1Icon} alt={tx.token1Symbol || ""} className="w-4 h-4 rounded-full inline flex-shrink-0" />
                          )}
                          <span className="font-medium truncate overflow-hidden max-w-[7rem]">{formatAmount(tx.amount1)} {tx.token1Symbol}</span>
                          <span className="flex-shrink-0">+</span>
                          {tx.token2Icon && (
                            <img src={tx.token2Icon} alt={tx.token2Symbol || ""} className="w-4 h-4 rounded-full inline flex-shrink-0" />
                          )}
                          <span className="font-medium truncate overflow-hidden max-w-[7rem]">{formatAmount(tx.amount2)} {tx.token2Symbol}</span>
                        </div>
                        {tx.lpAmount && (
                          <span className="text-green-400 ml-2">
                            (+{formatAmount(tx.lpAmount)} LP)
                          </span>
                        )}
                      </div>
                    )}
                    {tx.type === "LiquidityRemoved" && (
                      <div className="text-gray-300">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="whitespace-nowrap">Removed</span>
                          {tx.token1Icon && (
                            <img src={tx.token1Icon} alt={tx.token1Symbol || ""} className="w-4 h-4 rounded-full inline flex-shrink-0" />
                          )}
                          <span className="font-medium truncate overflow-hidden max-w-[7rem]">{formatAmount(tx.amount1)} {tx.token1Symbol}</span>
                          <span className="flex-shrink-0">+</span>
                          {tx.token2Icon && (
                            <img src={tx.token2Icon} alt={tx.token2Symbol || ""} className="w-4 h-4 rounded-full inline flex-shrink-0" />
                          )}
                          <span className="font-medium truncate overflow-hidden max-w-[7rem]">{formatAmount(tx.amount2)} {tx.token2Symbol}</span>
                        </div>
                        {tx.lpAmount && (
                          <span className="text-red-400 ml-2">
                            (-{formatAmount(tx.lpAmount)} LP)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* User Address */}
                  <div className="text-xs text-gray-500 mt-2">
                    User: {tx.userAddress.slice(0, 6)}...{tx.userAddress.slice(-4)}
                    {account?.address === tx.userAddress && (
                      <span className="ml-2 text-blue-400">(You)</span>
                    )}
                  </div>
                </div>

                {/* Right: Transaction Link */}
                <a
                  href={`https://suiscan.xyz/testnet/tx/${tx.txDigest}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
                >
                  View Tx ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}