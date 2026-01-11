"use client";

import { useState } from 'react';
import SwapInterface from "./components/SwapInterface";
import PoolInterface from "./components/PoolInterface";
import Navbar from "./components/Navbar";

type Tab = 'swap' | 'pool' | 'suiswap' | 'tokens' | 'transactions';

export default function Home() {
  const [activeView, setActiveView] = useState<Tab>('swap');

  const handleTabChange = (tab: Tab) => {
    setActiveView(tab);
  };

  return (
    <main className="min-h-screen">
      <Navbar activeTab={activeView} onTabChange={handleTabChange} />
      <div className="container mx-auto px-4 py-8">
        {activeView === 'swap' && <SwapInterface />}
        {activeView === 'pool' && <PoolInterface />}
        {/* Add other views as needed */}
      </div>
    </main>
  );
}
