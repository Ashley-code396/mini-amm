"use client";

import { useEffect, useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { BACKEND_URL } from "../constants";

type Transaction = {
  id: number;
  userAddress: string;
  type: string;
  token1: string | null;
  token2: string | null;
  token1Symbol: string | null;
  token2Symbol: string | null;
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
  } | null;
};

export default function Transactions() {
  const account = useCurrentAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [showMyTxOnly, setShowMyTxOnly] = useState(false);

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
        setTransactions(json.data);
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
              onClick={() => setFilter("SwapExecuted")}
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
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                          {tx.pool.token1Symbol?.[0] || "?"}
                        </div>
                        <span className="text-sm font-medium">
                          {tx.pool.token1Symbol || "Unknown"}
                        </span>
                      </div>
                      <span className="text-gray-500">/</span>
                      <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xs">
                          {tx.pool.token2Symbol?.[0] || "?"}
                        </div>
                        <span className="text-sm font-medium">
                          {tx.pool.token2Symbol || "Unknown"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Transaction Details */}
                  <div className="text-sm space-y-1">
                    {tx.type === "SwapExecuted" && (
                      <div className="text-gray-300">
                        Swapped {formatAmount(tx.amount1)} {tx.token1Symbol} →{" "}
                        {formatAmount(tx.amount2)} {tx.token2Symbol}
                      </div>
                    )}
                    {tx.type === "LiquidityAdded" && (
                      <div className="text-gray-300">
                        Added {formatAmount(tx.amount1)} {tx.token1Symbol} +{" "}
                        {formatAmount(tx.amount2)} {tx.token2Symbol}
                        {tx.lpAmount && (
                          <span className="text-green-400 ml-2">
                            (+{formatAmount(tx.lpAmount)} LP)
                          </span>
                        )}
                      </div>
                    )}
                    {tx.type === "LiquidityRemoved" && (
                      <div className="text-gray-300">
                        Removed {formatAmount(tx.amount1)} {tx.token1Symbol} +{" "}
                        {formatAmount(tx.amount2)} {tx.token2Symbol}
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