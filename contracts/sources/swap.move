module mini_amm::swap;

use mini_amm::pool::{Self, LiquidityPool};
use sui::coin::{Self, Coin};

//===Error codes ===
#[error(code = 0)]
const EZeroAmountSwap: vector<u8> = b"Cannot swap zero amount";

#[error(code = 2)]
const EInsufficientOutput: vector<u8> =
    b"Swap would result in zero output; increase input or check pool reserves";

public fun swap_a_for_b<A, B>(
    pool: &mut LiquidityPool<A, B>,
    coin_in: Coin<A>,
    ctx: &mut TxContext,
): Coin<B> {
    let amount_in = coin::value(&coin_in);

    assert!(amount_in > 0, EZeroAmountSwap);

    //Deposit coin A into pool

    pool::deposit_a(pool, coin_in);

    let reserve_a = pool::reserve_a_value(pool);
    let reserve_b = pool::reserve_b_value(pool);

    // Compute output using constant product: dy = y - k / (x + dx)
    let k = pool::k_last(pool);
    let amount_out = reserve_b - (k / reserve_a);

    assert!(amount_out > 0, EInsufficientOutput);

    //Withdraw coin B from pool

    let out_b = pool::withdraw_b(pool, amount_out, ctx);

    // Update k_last safely
    pool::update_k(pool);

    out_b
}

public fun swap_b_for_a<A, B>(
    pool: &mut LiquidityPool<A, B>,
    coin_in: Coin<B>,
    ctx: &mut TxContext,
): Coin<A> {
    let amount_in = coin::value(&coin_in);

    assert!(amount_in > 0, EZeroAmountSwap);

    //Deposit coin B into pool

    pool::deposit_b(pool, coin_in);

    let reserve_a = pool::reserve_a_value(pool);
    let reserve_b = pool::reserve_b_value(pool);

    // Compute output using constant product: dx = x - k / (y + dy)
    let k = pool::k_last(pool);
    let amount_out = reserve_a - (k / reserve_b); // reserve_b now includes dy
    assert!(amount_out > 0, EInsufficientOutput);

    //Withdraw coin B from pool

    let out_a = pool::withdraw_a(pool, amount_out, ctx);

    // Update k_last safely
    pool::update_k(pool);

    out_a
}
