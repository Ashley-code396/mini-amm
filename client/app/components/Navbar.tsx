"use client";

import { cn } from "@/lib/utils";
import { ConnectButton } from '@mysten/dapp-kit';

type Tab = 'swap' | 'suiswap' | 'pool' | 'tokens' | 'transactions';

interface NavbarProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export default function Navbar({ activeTab = 'swap', onTabChange }: NavbarProps) {
  return (
    <header className="bg-[#121212] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          <nav className="flex space-x-8">
            <button
              onClick={() => onTabChange?.('swap')}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                activeTab === 'swap' 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              Swap
            </button>
            <button
              onClick={() => onTabChange?.('suiswap')}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                activeTab === 'suiswap' 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              Suiswap Token
            </button>
            <button
              onClick={() => onTabChange?.('pool')}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                activeTab === 'pool' 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              Pool
            </button>
            <button
              onClick={() => onTabChange?.('tokens')}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                activeTab === 'tokens' 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              Token
            </button>
            <button
              onClick={() => onTabChange?.('transactions')}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md",
                activeTab === 'transactions' 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              )}
            >
              Transaction
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}
