module mini_amm::pool;

use sui::balance::{Self, Balance, Supply};
use sui::coin::{Self, Coin};
use sui::event;

/// Phantom type for LP token
public struct LP<phantom A, phantom B> has drop {}

/// Liquidity pool struct
public struct LiquidityPool<phantom A, phantom B> has key, store {
    id: object::UID,
    reserve_a: Balance<A>,
    reserve_b: Balance<B>,
    k_last: u64,
    lp_supply: Supply<LP<A, B>>,
}

//=== Events===
public struct PoolInitialized has copy, drop {
    lp_id: ID,
    amount_a: u64,
    amount_b: u64,
}
public struct LiquidityAdded has copy, drop {
    lp_id: ID,
    amount_a: u64,
    amount_b: u64,
    lp_minted: u64,
}

public struct LiquidityRemoved has copy, drop {
    lp_id: ID,
    amount_a: u64,
    amount_b: u64,
    lp_burned: u64,
}

/// Initialize a new liquidity pool
public fun init_pool<A, B>(
    coin_a: Coin<A>,
    coin_b: Coin<B>,
    ctx: &mut TxContext,
): LiquidityPool<A, B> {
    let value_a = coin::value(&coin_a);
    let value_b = coin::value(&coin_b);

    let pool = LiquidityPool {
        id: object::new(ctx),
        reserve_a: coin::into_balance(coin_a),
        reserve_b: coin::into_balance(coin_b),
        k_last: value_a * value_b,
        lp_supply: balance::create_supply<LP<A, B>>(LP {}),
    };

    event::emit(PoolInitialized {
        lp_id: object::id(&pool),
        amount_a: value_a,
        amount_b: value_b,
    });

    (pool)
}

public fun add_liquidity<A, B>(
    pool: &mut LiquidityPool<A, B>,
    coin_a: Coin<A>,
    coin_b: Coin<B>,
    ctx: &mut TxContext,
): Coin<LP<A, B>> {
    let amount_a = coin::value(&coin_a);
    let amount_b = coin::value(&coin_b);

    let reserve_a = balance::value(&pool.reserve_a);
    let reserve_b = balance::value(&pool.reserve_b);

    let total_lp = balance::supply_value(&pool.lp_supply);

    // Convert coins to balances
    let bal_a = coin::into_balance(coin_a);
    let bal_b = coin::into_balance(coin_b);

    // Determine LP to mint
    let liquidity = if (total_lp == 0) {
        // First liquidity provider
        min(amount_a, amount_b)
    } else {
        min(
            amount_a * total_lp / reserve_a,
            amount_b * total_lp / reserve_b,
        )
    };

    // Update reserves
    balance::join(&mut pool.reserve_a, bal_a);
    balance::join(&mut pool.reserve_b, bal_b);

    // Mint LP tokens
    let lp_balance = balance::increase_supply(&mut pool.lp_supply, liquidity);
    let lp_coin = coin::from_balance(lp_balance, ctx);

    event::emit(LiquidityAdded {
        lp_id: object::id(pool),
        amount_a,
        amount_b,
        lp_minted: liquidity,
    });

    lp_coin
}

/// Remove liquidity from the pool

public fun remove_liquidity<A, B>(
    pool: &mut LiquidityPool<A, B>,
    lp_token: Coin<LP<A, B>>,
    ctx: &mut TxContext,
): (Coin<A>, Coin<B>) {
    let lp_balance = coin::into_balance(lp_token);
    let liquidity = balance::value(&lp_balance);

    let reserve_a = balance::value(&pool.reserve_a);
    let reserve_b = balance::value(&pool.reserve_b);
    let total_lp = balance::supply_value(&pool.lp_supply);

    let amount_a = liquidity * reserve_a / total_lp;
    let amount_b = liquidity * reserve_b / total_lp;

    let out_a = balance::split(&mut pool.reserve_a, amount_a);
    let out_b = balance::split(&mut pool.reserve_b, amount_b);

    balance::decrease_supply(&mut pool.lp_supply, lp_balance);

    // Update k
    let new_a = balance::value(&pool.reserve_a);
    let new_b = balance::value(&pool.reserve_b);
    pool.k_last = new_a * new_b;

    let coin_a = coin::from_balance(out_a, ctx);
    let coin_b = coin::from_balance(out_b, ctx);

    event::emit(LiquidityRemoved {
        lp_id: object::id(pool),
        amount_a,
        amount_b,
        lp_burned: liquidity,
    });

    (coin_a, coin_b)
}

fun min(a: u64, b: u64): u64 {
    if (a < b) a else b
}

/// Add coins to reserve A
public fun deposit_a<A, B>(pool: &mut LiquidityPool<A, B>, coin: Coin<A>) {
    let bal = coin::into_balance(coin);
    balance::join(&mut pool.reserve_a, bal);
}

/// Add coins to reserve B
public fun deposit_b<A, B>(pool: &mut LiquidityPool<A, B>, coin: Coin<B>) {
    let bal = coin::into_balance(coin);
    balance::join(&mut pool.reserve_b, bal);
}

/// Remove coins from reserve A
public fun withdraw_a<A, B>(
    pool: &mut LiquidityPool<A, B>,
    amount: u64,
    ctx: &mut TxContext,
): Coin<A> {
    let bal = balance::split(&mut pool.reserve_a, amount);
    coin::from_balance(bal, ctx)
}

/// Remove coins from reserve B
public fun withdraw_b<A, B>(
    pool: &mut LiquidityPool<A, B>,
    amount: u64,
    ctx: &mut TxContext,
): Coin<B> {
    let bal = balance::split(&mut pool.reserve_b, amount);
    coin::from_balance(bal, ctx)
}

public fun reserve_a_value<A, B>(pool: &LiquidityPool<A, B>): u64 {
    balance::value(&pool.reserve_a)
}

public fun reserve_b_value<A, B>(pool: &LiquidityPool<A, B>): u64 {
    balance::value(&pool.reserve_b)
}

public fun k_last<A, B>(pool: &mut LiquidityPool<A, B>): u64 {
    pool.k_last
}

/// Update k_last to be reserve_a * reserve_b
public fun update_k<A, B>(pool: &mut LiquidityPool<A, B>) {
    let reserve_a = balance::value(&pool.reserve_a);
    let reserve_b = balance::value(&pool.reserve_b);
    pool.k_last = reserve_a * reserve_b;
}
