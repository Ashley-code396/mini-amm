"use client";

import { useState } from 'react';

export default function SwapInterface() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [error] = useState('Please select the correct tokens for swapping');
  const [slippage, setSlippage] = useState('1.0%');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('Select token');

  const handleSwap = () => {
    // Swap functionality will be implemented later
    console.log('Swapping', fromAmount, fromToken, 'to', toAmount, toToken);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-[#121212] min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-6">Exchange Token</h1>
      
      {/* From Section */}
      <div className="bg-[#1E1E1E] rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">From</span>
          <span className="text-sm text-gray-400">Balance: 0.0</span>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="number"
            className="w-full bg-transparent text-white text-2xl outline-none placeholder-gray-500"
            placeholder="0.0"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
          />
          <div className="flex items-center bg-[#2D2D2D] rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700">
            <span className="text-white mr-2">{fromToken}</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className="flex justify-between mt-2 space-x-1">
          {['25%', '50%', '75%', 'MAX', 'RESET'].map((percent) => (
            <button
              key={percent}
              className="text-xs bg-[#2D2D2D] text-gray-300 px-2 py-1 rounded hover:bg-gray-600 transition-colors"
              onClick={() => {
                if (percent === 'RESET') {
                  setFromAmount('');
                } else if (percent === 'MAX') {
                  setFromAmount('1.0');
                } else {
                  const value = (parseFloat(percent) / 100 * 1.0).toFixed(4);
                  setFromAmount(value);
                }
              }}
            >
              {percent}
            </button>
          ))}
        </div>
      </div>

      {/* Swap Direction Button */}
      <div className="flex justify-center -my-3 z-10">
        <button className="bg-[#2D2D2D] p-2 rounded-full border-4 border-[#121212] hover:bg-gray-600 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 10L12 6L8 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 14L12 18L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* To Section */}
      <div className="bg-[#1E1E1E] rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">To</span>
          <span className="text-sm text-gray-400">Balance: 0.0</span>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="text"
            className="w-full bg-transparent text-white text-2xl outline-none"
            placeholder="0.0"
            value={toAmount}
            readOnly
          />
          <div className="flex items-center bg-[#2D2D2D] rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-700">
            <span className="text-white mr-2">{toToken}</span>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Error Message */}
      <div className="text-red-500 text-sm text-center mb-4">
        {error}
      </div>

      {/* Slippage Tolerance */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Slippage tolerance</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {['0.2%', '0.5%', '1.0%', '3.0%', 'Custom'].map((value) => (
            <button
              key={value}
              className={`py-2 rounded-lg text-sm font-medium ${
                slippage === value 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-[#2D2D2D] text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setSlippage(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      {/* Swap Button */}
      <button
        className="w-full py-4 rounded-xl text-lg font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
        onClick={handleSwap}
        disabled={true}
      >
        SWAP
      </button>
    </div>
  );
}