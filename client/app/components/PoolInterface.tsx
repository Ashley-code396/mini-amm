"use client";
import { useState } from 'react';

export default function PoolInterface() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock pool data - replace with real data from your contract
  const pools = [
    { id: 1, token1: 'SUI', token2: 'USDC', price: '1.00', apr: '0.20%', fee: '0.2%', volume: '$1,200,000', tvl: '$1,200,000' },
    { id: 2, token1: 'SUI', token2: 'USDT', price: '0.99', apr: '0.18%', fee: '0.2%', volume: '$890,000', tvl: '$890,000' },
    { id: 3, token1: 'USDC', token2: 'USDT', price: '1.00', apr: '0.05%', fee: '0.05%', volume: '$2,100,000', tvl: '$2,100,000' },
  ];

  const filteredPools = pools.filter(pool => 
    `${pool.token1}/${pool.token2}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Position section data
  const hasPosition = false; // Set to true if user has positions

  // Format number with commas
  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Position Section */}
      <div className="bg-card rounded-xl p-6 mb-6 border">
        <h2 className="text-xl font-medium mb-4">Position</h2>
        <div className="bg-muted/50 rounded-lg p-4 text-center border">
          <p className="text-muted-foreground">No Position Found</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Pool"
            className="w-full bg-background pl-4 pr-10 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            className="w-5 h-5 text-muted-foreground absolute right-3 top-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Pools Table */}
      <div className="bg-card rounded-xl overflow-hidden border">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 text-sm text-muted-foreground border-b">
          <div className="col-span-3">Pool</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-2 text-right">APR</div>
          <div className="col-span-2 text-right">Trading Fee</div>
          <div className="col-span-2 text-right">Total Trading Volume</div>
          <div className="col-span-1"></div>
        </div>
        
        {/* Table Rows */}
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
                <div className="font-medium">{pool.token1}/{pool.token2}</div>
              </div>
              <div className="col-span-2 text-right">${pool.price}</div>
              <div className="col-span-2 text-right">{pool.apr}</div>
              <div className="col-span-2 text-right">{pool.fee}</div>
              <div className="col-span-2 text-right">{pool.volume}</div>
              <div className="col-span-1 flex justify-end">
                <button 
                  className="bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Add liquidity to ${pool.token1}/${pool.token2}`);
                  }}
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Position Button */}
      <div className="mt-6">
        <button 
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors flex items-center hover:bg-primary/90"
          onClick={() => console.log('Create new position')}
        >
          <span className="mr-1">+</span> New Position
        </button>
      </div>
    </div>
  );
}
