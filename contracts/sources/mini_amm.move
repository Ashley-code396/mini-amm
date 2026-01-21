module mini_amm::mini_amm;

use mini_amm::pool::{Self, LiquidityPool};
use mini_amm::swap;
use sui::bag::{Self, Bag};
use sui::coin::Coin;
use sui::package;

//=== Error codes ===
#[error(code = 1)]
const EPoolAlreadyExists: vector<u8> = b"Pool already exists!";

public struct Container has key {
    id: UID,
    pools: Bag,
    admin: address,
}
public struct MINI_AMM has drop {}

/// Initialize the AMM container
fun init(otw: MINI_AMM, ctx: &mut TxContext) {
    package::claim_and_keep(otw, ctx);
    transfer::share_object(Container {
        id: object::new(ctx),
        pools: bag::new(ctx),
        admin: ctx.sender(),
    });
}

/// Create a new liquidity pool and add it to the container's Bag
public fun create_pool<A, B>(
    container: &mut Container,
    coin_a: Coin<A>,
    coin_b: Coin<B>,
    ctx: &mut TxContext,
) {
    let pool = pool::init_pool<A, B>(coin_a, coin_b, ctx);
    let pool_id = object::id(&pool);
    assert!(!bag::contains(&container.pools, pool_id), EPoolAlreadyExists);

    bag::add(&mut container.pools, pool_id, pool);
}

/// Wrapper function to add liquidity to a pool stored in the Bag
public fun add_liquidity_to_pool<A, B>(
    container: &mut Container,
    pool_id: ID,
    coin_a: Coin<A>,
    coin_b: Coin<B>,
    ctx: &mut TxContext,
): Coin<pool::LP<A, B>> {
    let mut pool = bag::remove(&mut container.pools, pool_id);
    let lp_coin = pool::add_liquidity(&mut pool, coin_a, coin_b, ctx);
    bag::add(&mut container.pools, pool_id, pool);
    lp_coin
}

/// Wrapper function to remove liquidity from a pool in the Bag
public fun remove_liquidity_from_pool<A, B>(
    container: &mut Container,
    pool_id: ID,
    lp_token: Coin<pool::LP<A, B>>,
    ctx: &mut TxContext,
): (Coin<A>, Coin<B>) {
    let mut pool = bag::remove(&mut container.pools, pool_id);
    let (coin_a, coin_b) = pool::remove_liquidity(&mut pool, lp_token, ctx);
    bag::add(&mut container.pools, pool_id, pool);
    (coin_a, coin_b)
}


/// Wrapper function to swap A for B in a pool stored in the Bag
public fun swap_a_for_b_in_pool<A, B>(
    container: &mut Container,
    pool_id: ID,
    coin_in: Coin<A>,
    ctx: &mut TxContext,
): Coin<B> {
    let mut pool = bag::remove(&mut container.pools, pool_id);
    let out_coin = swap::swap_a_for_b(&mut pool, coin_in, ctx);
    bag::add(&mut container.pools, pool_id, pool);
    out_coin
}

// Wrapper function to swap B for A in a pool in the Bag
public fun swap_b_for_a_in_pool<A, B>(
    container: &mut Container,
    pool_id: ID,
    coin_in: Coin<B>,
    ctx: &mut TxContext,
): Coin<A> {
    let mut pool = bag::remove(&mut container.pools, pool_id);
    let out_coin = swap::swap_b_for_a(&mut pool, coin_in, ctx);
    bag::add(&mut container.pools, pool_id, pool);
    out_coin
}

//=== Getter Functions===

public fun admin_address(container: &Container): address {
    container.admin
}

//=== Setter Functions===
public fun set_admin(container: &mut Container, new_admin: address) {
    container.admin = new_admin
}


