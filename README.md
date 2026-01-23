# Mini AMM — Decentralized Exchange

A full-stack decentralized exchange built on Sui blockchain, featuring an Automated Market Maker (AMM) with constant-product (x * y = k) invariant for token swaps and liquidity pools.

## Architecture Overview

The system is divided into three main components that work together to provide a seamless decentralized trading experience:

1. **Smart Contracts (Move)**: On-chain logic for AMM operations
2. **Backend Server (Node.js/Express)**: Indexing and data aggregation layer
3. **Web Frontend (Next.js)**: User interface for interacting with the AMM

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Frontend      │◄───►│   Backend       │◄───►│   Sui           │
│   (Next.js)     │     │   (Node/Express)│     │   Blockchain    │
│                 │     │                 │     │   (Move)        │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 1. Smart Contracts (Move)

The on-chain component that handles all AMM operations. Built using Move on the Sui blockchain.

### Core Modules:

- **mini_amm.move**: Main entry point and container for pools
- **pool.move**: Manages liquidity pools and LP tokens
- **swap.move**: Handles token swaps with constant-product formula
- **treasury.move**: Manages protocol fees and treasury operations
- **admin.move**: Administrative functions and access control

### Key Features:
- Constant product formula (x * y = k) for price determination
- Multi-pool support for different token pairs
- Liquidity provider fee (0.3% per swap)
- Slippage protection
- Admin-controlled fee parameters

## 2. Backend Server (Node.js/Express)

A service layer that provides additional functionality not suitable for on-chain execution.

### Key Components:

- **API Endpoints**:
  - `/api/pools`: Get all pools with current stats
  - `/api/tokens`: List supported tokens
  - `/api/transactions`: Historical transaction data
  - `/api/analytics`: Trading volume and liquidity metrics

- **Services**:
  - Event indexing and database synchronization
  - Historical data aggregation
  - Price and volume calculations
  - Transaction simulation

- **Database (PostgreSQL)**:
  - Stores indexed blockchain data
  - Caches pool and token information
  - Maintains transaction history

## 3. Web Frontend (Next.js)

A modern, responsive web interface for users to interact with the AMM.

### Key Features:
- Wallet connection (Sui Wallet, etc.)
- Pool creation and management
- Token swapping interface
- Liquidity provision and removal
- Transaction history
- Real-time price and pool statistics

### Main Components:
- `PoolInterface.tsx`: Main component for pool interactions
- `SwapInterface.tsx`: Token swap interface
- `WalletConnector.tsx`: Wallet connection and management
- `TransactionHistory.tsx`: User transaction history

## Development Setup

### Prerequisites
- Node.js 16+
- Sui CLI
- PostgreSQL (for backend)
- Yarn or npm

### 1. Smart Contracts

```bash
# Build contracts
cd contracts
sui move build

# Test contracts
sui move test

# Publish to testnet (example)
sui client publish --gas-budget 100000000
```

### 2. Backend Server

```bash
# Install dependencies
cd server
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### 3. Frontend

```bash
# Install dependencies
cd client
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

## Workflow

### Adding a New Token Pair
1. Frontend calls `create_pool` on the smart contract
2. Contract validates parameters and creates new pool
3. Backend indexes the new pool and adds it to the database
4. Frontend updates UI to show the new pool

### Making a Swap
1. User selects tokens and amount in the frontend
2. Frontend queries contract for expected output amount
3. User approves transaction in their wallet
4. Frontend submits transaction to the blockchain
5. Backend indexes the swap event
6. UI updates to reflect the new pool state

## Security Considerations

- All sensitive operations require wallet signatures
- Smart contracts include reentrancy protection
- Frontend validates all user inputs
- Backend implements rate limiting and request validation

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT

## Project overview

Mini AMM is a concise AMM example to demonstrate:

- Writing Move smart contracts that implement liquidity pools and swaps
- Implementing the constant-product x * y = k AMM logic
- Providing functions for creating pools, adding/removing liquidity, and swapping
- A simple Next.js + TypeScript front-end showing how to discover wallet-owned coins and submit transactions using the Sui/DappKit SDK

The contracts live in `contracts/sources/`. The front-end is a Next.js app under `client/`.


## Core contracts and modules

The Move modules implement the AMM primitives. These files are in `contracts/sources/`.

Note: function names and signatures in the Move code may vary slightly; the README describes the high-level API and expected behavior.

### mini_amm.move (high-level)

This module is the main AMM entry point. It typically exposes:

- `create_pool<A, B>(container: &mut Container, coin_a: Coin<A>, coin_b: Coin<B>, ctx: &mut TxContext)`
  - Creates a new liquidity pool for token types `A` and `B`.
  - Accepts coin objects for initial liquidity (these are Move `Coin<T>` objects). The Move call consumes the provided coins and mints a liquidity pool object and initial LP tokens.
- The module will reference a package-level `Container` object that stores global state for the AMM (owner, admin settings, fee config).

### pool.move

Implements per-pool logic, likely including:

- A `LiquidityPool<A, B>` struct which stores the reserves (amounts of A and B), fee parameters, and handles.
- `add_liquidity(pool_id: &ObjectId, coin_a: Coin<A>, coin_b: Coin<B>)` (or similar) — adds liquidity to an existing pool.
- `remove_liquidity(pool_id: &ObjectId, lp_coin: Coin<LP<T>>, amount: u128)` — burns LP tokens and returns underlying assets in proportion to pool reserves.

The implementation ensures that reserves are updated atomically and LP tokens are minted/burned accordingly.

### swap.move

Handles user swaps using the constant-product invariant. Typical function:

- `swap<A, B>(pool_id: &ObjectId, coin_in: Coin<A>, min_out: u128, ctx: &mut TxContext)`
  - Consumes `coin_in` of type `A` and returns some amount of `B` according to the AMM pricing.
  - Requires a `min_out` to protect against excessive slippage.
  - Applies trading fees and updates reserves.

### treasury.move

A simple module for collecting fees and distributing to a treasury object. Fees collected from swaps or liquidity operations may be sent here.

### admin.move

Administration helpers, package deployment helpers, or governance-like configuration (fee rates, owner change) may be here.


## AMM theory: constant-product rule (x * y = k)

The AMM implemented here follows the Uniswap v2-like invariant:

- Let x and y be the reserves of token A and token B in the pool.
- The invariant is x * y = k (constant product).

A user who wants to swap Δx (an amount of token A) into the pool receives Δy of token B such that the new reserves x' and y' satisfy (x + Δx') * (y - Δy) = k, where Δx' is the effective amount after fees.

Solving for Δy (ignoring fees) yields:

Δy = y - k / (x + Δx)

Which simplifies to:

Δy = (Δx * y) / (x + Δx)

When fees are applied (e.g., a 0.3% fee), the effective amount of input used in the invariant is reduced (Δx' = Δx * (1 - fee_fraction)). The fee is typically subtracted from the input amount before calculating output.

### Slippage

Slippage is the difference between the expected price based on reserves and the price realized due to trade size. Large trades relative to reserves cause greater price impact.

Approximate instantaneous price (without fees) is:

price = y / x

A trade that moves the reserves changes the marginal price.

### Fees

Most AMMs take a small fee on each swap (for example, 0.3%). Fees can be implemented by reducing the effective input used to calculate Δy and sending the fee portion to a treasury.

### Liquidity provisioning & LP tokens

- Liquidity providers deposit token pairs (A and B) into the pool in proportion to the current reserves to avoid price changes on deposit.
- In return, LP tokens are minted to represent a share of the pool's reserves.
- When LPs later burn their LP tokens, they receive a proportional share of the reserves (plus any fees that were accrued to the pool while they were providing liquidity).

If a provider deposits amounts not perfectly in proportion to current reserves, the system commonly either rejects or performs an implied swap to balance ratios, depending on implementation. A minimal AMM usually expects deposits in existing ratio.

### Impermanent loss (brief)

When you provide liquidity, the value of your deposited tokens vs. holding them can diverge due to price changes. This divergence is known as impermanent loss. It is "impermanent" because if prices return to original relative values, loss disappears; however, if you withdraw when prices have diverged, the loss becomes realized.

Fees earned by LPs can offset impermanent loss.


## Front-end (client/) overview

The front-end is a Next.js + TypeScript app located in `client/`. It contains components for:

- Listing pools and basic stats
- Creating a new pool
- Adding/removing liquidity
- Swapping tokens (if implemented)

Key front-end files:

- `client/app/components/PoolInterface.tsx`
  - Lists pools discovered from on-chain package-owned objects.
  - When creating a pool, it enumerates the connected wallet's coins, lets the user choose specific coin objects (object ids) for each token, and specify how much to deposit.
  - Uses the DappKit/Sui SDK hooks: `useSignAndExecuteTransaction`, `useSuiClient` to fetch owned objects and sign transactions.
  - Important UX details included in the client code:
    - Friendly token symbol extraction from Move type strings (e.g., detect `SUI`, `USDC`, or fallback to last segment of Move type).
    - Robust parsing of different RPC response shapes (different wallet clients may return different JSON shapes).
    - Splitting coin objects in-transaction (via `splitCoins`) to produce coin fragments of requested amounts, and passing those fragments to Move `create_pool` or `add_liquidity` calls.

Transaction pattern used by the front-end:

1. Build a `Transaction` (the client uses `@mysten/sui/transactions`).
2. Use `tx.splitCoins(coinObjectId, [amount])` (or SDK equivalent) to create coin fragments.
3. Call `tx.moveCall(...)` with the appropriate package/module/function and pass the `tx.object(containerId)` and the split coin references as arguments.
4. Sign and submit with `signAndExecuteTransaction({ transactionBlock: tx })`.

This pattern ensures the on-chain Move function receives real `Coin<T>` values representing the exact amounts the user wants to deposit or swap.


## Running locally

### Prerequisites

- Node.js (16+ recommended)
- npm or yarn
- Rust and Move tools (if you want to build/publish Move packages)
- Sui client / localnet or testnet access and wallet extension (or `sui client`) configured

### Front-end: run dev server

From the repo root (or `client/`), install and run:

```bash
# from repo root
npm --prefix client install
npm --prefix client run dev

# or to build for production
npm --prefix client run build
```

Open http://localhost:3000 (or the port Next prints) and connect a Sui-compatible wallet. The Pool UI should list pools created by the deployed package and allow creating pools using coins owned by the connected wallet.

### Build & publish Move contracts

If you modify the Move code and want to publish to local Sui devnet or testnet:

1. Ensure `sui` is installed and configured.
2. From `contracts/` run:

```bash
# build and publish (example; your environment may vary)
cd contracts
sui move build
sui client publish --path ./build/ --gas-budget <amount>
```

Publishing returns the package id which the front-end must use (the `TESTNET_PACKAGE_ID` constant in `client/app/constants.ts` or similar). The front-end relies on the package id to fetch package-owned objects (pools, container) and call move functions.

### Tests

If Move tests exist in `contracts/tests/`, run Move tests using the Sui toolchain or `sui move test` (depending on your setup). Example:

```bash
cd contracts
sui move test
```

Front-end unit/integration tests (if present) can be run with Jest or the configured test runner (not included by default in this minimal project).





## Example transaction flows (conceptual)

### Create pool (frontend)

1. User picks token A object id and token B object id (from wallet-owned objects).
2. User enters amounts for token A and token B.
3. Client builds transaction:
   - `splitA = tx.splitCoins(coinAObjectId, [amountA])`
   - `splitB = tx.splitCoins(coinBObjectId, [amountB])`
   - `tx.moveCall({ target: `${PACKAGE_ID}::mini_amm::create_pool`, typeArguments: [typeA, typeB], arguments: [tx.object(containerId), splitA, splitB] })`
4. Sign & execute.

On-chain, `create_pool` consumes the provided coins, mints a `LiquidityPool<A,B>` object, and returns/creates LP tokens.

### Add liquidity

1. Client splits coin objects to get the exact amounts.
2. Calls `pool::add_liquidity(pool_id, coinAFragment, coinBFragment)`.
3. The contract updates reserves and mints LP tokens to the provider.

### Swap

1. Client calls `swap(pool_id, coin_in_fragment, min_out)`.
2. Contract applies fee, computes output using constant-product formula, updates reserves, and returns the output coin.


## File structure (high level)

```
client/                 # Next.js front-end
  app/
    components/
      PoolInterface.tsx  # main pool UI, wallet coin parsing, create/add/remove liquidity flows
contracts/
  sources/
    mini_amm.move
    pool.move
    swap.move
    treasury.move
    admin.move
  build/
  tests/
```


## Next steps and roadmap

- Improve UI UX for token selection: show token icons and decimals, and fetch metadata.
- Replace Number-based math with BigInt or a bignumber library to safely handle u128 and decimals.
- Add inline validation and better error messages instead of `alert()`.
- Implement swap UI with slippage tolerances and estimated price preview.
- Add unit and integration tests for Move modules and front-end flows.


## Contributing

Contributions, bug fixes, and improvements are welcome. Please open issues or PRs describing the change and include tests where feasible.

---
