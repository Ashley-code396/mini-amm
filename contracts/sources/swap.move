module mini_amm::swap;

use mini_amm::pool::{Self, LiquidityPool};
use mini_amm::treasury;
use sui::coin::{Self, Coin};
use sui::event;

//=== Error Codes ===
#[error(code = 0)]
const EZeroAmountSwap: vector<u8> = b"Cannot swap zero amount";

#[error(code = 2)]
const EInsufficientOutput: vector<u8> =
    b"Swap would result in zero output; increase input or check pool reserves";

#[error(code = 3)]
const EInsufficientLiquidity: vector<u8> = b"Pool does not have enough output token for this swap";

//=== Events ===
public struct SwapEvent has copy, drop {
    pool_id: ID,
    token_in_type: vector<u8>,
    amount_in: u64,
    token_out_type: vector<u8>,
    amount_out: u64,
    lp_fee: u64,
    protocol_fee: u64,
}

// === Fee Configuration ===
const FEE_BPS: u64 = 30;
const BPS_DIVISOR: u64 = 10000;
const LP_SHARE_BPS: u64 = 8000; // 80% to LPs, 20% to protocol

/// Swap A -> B
#[allow(lint(self_transfer))]
public fun swap_a_for_b<A, B>(
    pool: &mut LiquidityPool<A, B>,
    mut coin_in: Coin<A>,
    ctx: &mut TxContext,
): Coin<B> {
    let amount_in = coin::value(&coin_in);
    assert!(amount_in > 0, EZeroAmountSwap);

    // Compute fees
    let fee_total = amount_in * FEE_BPS / BPS_DIVISOR;
    let lp_fee = fee_total * LP_SHARE_BPS / BPS_DIVISOR;
    let protocol_fee = fee_total - lp_fee;
    let net_amount = amount_in - fee_total;

    // Deposit net swap amount into pool
    pool::deposit_a(pool, coin::split(&mut coin_in, net_amount, ctx));

    // LP fees go to pool reserves
    pool::deposit_a(pool, coin::split(&mut coin_in, lp_fee, ctx));

    // Protocol fees go to treasury address
    let proto_fee_coin = coin::split(&mut coin_in, protocol_fee, ctx);
    treasury::deposit(proto_fee_coin);

    // Compute swap output
    let reserve_a = pool::reserve_a_value(pool);
    let reserve_b = pool::reserve_b_value(pool);
    let k = pool::k_last(pool);
    let amount_out = reserve_b - (k / reserve_a);

    assert!(amount_out > 0, EInsufficientOutput);
    assert!(amount_out <= reserve_b, EInsufficientLiquidity);

    let out_b = pool::withdraw_b(pool, amount_out, ctx);
    pool::update_k(pool);

    if (coin::value(&coin_in) > 0) {
        transfer::public_transfer(coin_in, ctx.sender());
    } else {
        coin::destroy_zero(coin_in);
    };

    // Emit event
    event::emit(SwapEvent {
        pool_id: object::id(pool),
        token_in_type: b"A",
        amount_in,
        token_out_type: b"B",
        amount_out,
        lp_fee,
        protocol_fee,
    });

    out_b
}

/// Swap B -> A
#[allow(lint(self_transfer))]
public fun swap_b_for_a<A, B>(
    pool: &mut LiquidityPool<A, B>,
    mut coin_in: Coin<B>,
    ctx: &mut TxContext,
): Coin<A> {
    let amount_in = coin::value(&coin_in);
    assert!(amount_in > 0, EZeroAmountSwap);

    let fee_total = amount_in * FEE_BPS / BPS_DIVISOR;
    let lp_fee = fee_total * LP_SHARE_BPS / BPS_DIVISOR;
    let protocol_fee = fee_total - lp_fee;
    let net_amount = amount_in - fee_total;

    // Deposit net swap amount into pool
    pool::deposit_b(pool, coin::split(&mut coin_in, net_amount, ctx));

    // LP fees go to pool reserves
    pool::deposit_b(pool, coin::split(&mut coin_in, lp_fee, ctx));

    // Protocol fees go to treasury address
    let proto_fee_coin = coin::split(&mut coin_in, protocol_fee, ctx);
    treasury::deposit(proto_fee_coin);

    // Compute output
    let reserve_a = pool::reserve_a_value(pool);
    let reserve_b = pool::reserve_b_value(pool);
    let k = pool::k_last(pool);
    let amount_out = reserve_a - (k / reserve_b);

    assert!(amount_out > 0, EInsufficientOutput);
    assert!(amount_out <= reserve_a, EInsufficientLiquidity);

    let out_a = pool::withdraw_a(pool, amount_out, ctx);
    pool::update_k(pool);

    if (coin::value(&coin_in) > 0) {
        transfer::public_transfer(coin_in, ctx.sender());
    } else {
        coin::destroy_zero(coin_in);
    };

    // Emit event
    event::emit(SwapEvent {
        pool_id: object::id(pool),
        token_in_type: b"B",
        amount_in,
        token_out_type: b"A",
        amount_out,
        lp_fee,
        protocol_fee,
    });

    out_a
}
