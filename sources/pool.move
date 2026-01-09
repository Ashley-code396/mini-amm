module mini_amm::pool;

use sui::balance::{Self, Balance, Supply};
use sui::coin::{Self, Coin};

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


/// Initialize a new liquidity pool
public fun init_pool<A, B>(
    coin_a: Coin<A>,
    coin_b: Coin<B>,
    ctx: &mut TxContext,
): LiquidityPool<A, B> {
    let value_a = coin::value(&coin_a);
    let value_b = coin::value(&coin_b);

    LiquidityPool {
        id: object::new(ctx),
        reserve_a: coin::into_balance(coin_a),
        reserve_b: coin::into_balance(coin_b),
        k_last: value_a * value_b,
        lp_supply: balance::create_supply<LP<A, B>>(LP {}),
    }
}

public(package) fun add_liquidity<A, B>(
    pool: &mut LiquidityPool<A, B>,
    coin_a: Coin<A>,
    coin_b: Coin<B>,
    ctx: &mut TxContext,
): Coin<LP<A, B>> {
    let balance_a = coin::into_balance(coin_a);
    let balance_b = coin::into_balance(coin_b);

    balance::join(&mut pool.reserve_a, balance_a);
    balance::join(&mut pool.reserve_b, balance_b);

    let amount_a = balance::value(&pool.reserve_a);
    let amount_b = balance::value(&pool.reserve_b);

    let liquidity = min(amount_a, amount_b);

    let lp_balance = balance::increase_supply(&mut pool.lp_supply, liquidity);
    let lp_token = coin::from_balance(lp_balance, ctx);

    lp_token
}

/// Remove liquidity from the pool
public fun remove_liquidity<A, B>(
    pool: &mut LiquidityPool<A, B>,
    lp_token: Coin<LP<A, B>>,
    ctx: &mut TxContext,
): (Coin<A>, Coin<B>) {
    // Convert LP token to balance
    let lp_balance = coin::into_balance(lp_token);

    // Get the amount of LP tokens being burned
    let liquidity = balance::value(&lp_balance);

    // Calculate the share of reserves to return
    let reserve_a = balance::value(&pool.reserve_a);
    let reserve_b = balance::value(&pool.reserve_b);
    let total_lp = balance::supply_value(&pool.lp_supply);

    // amount_a = liquidity * reserve_a / total_lp
    // amount_b = liquidity * reserve_b / total_lp
    let amount_a = liquidity * reserve_a / total_lp;
    let amount_b = liquidity * reserve_b / total_lp;

    // Remove the share from reserves
    let out_a = balance::split(&mut pool.reserve_a, amount_a);
    let out_b = balance::split(&mut pool.reserve_b, amount_b);

    // Burn the LP tokens (decrease supply)
    balance::decrease_supply(&mut pool.lp_supply, lp_balance);

    // Convert balances to coins and return
    let coin_a = coin::from_balance(out_a, ctx);
    let coin_b = coin::from_balance(out_b, ctx);

    (coin_a, coin_b)
}

fun min(a: u64, b: u64): u64 {
    if (a < b) a else b
}
