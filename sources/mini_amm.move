module mini_amm::mini_amm;

use sui::bag::{Self, Bag};
use sui::package;
use mini_amm::pool;
use sui::coin::Coin;

public struct Container has key {
    id: UID,
    pools: Bag,
    admin: address,
}
public struct MINI_AMM has drop {}

/// Initialize and share the AMM container
fun init(otw: MINI_AMM, ctx: &mut TxContext) {
    package::claim_and_keep(otw, ctx);
    transfer::share_object(Container {
        id: object::new(ctx),
        pools: bag::new(ctx),
        admin: ctx.sender()
    });
}

/// Create a new liquidity pool and add it to the container's Bag
public fun create_pool<A, B>(
    container: &mut Container,
    coin_a: Coin<A>,
    coin_b: Coin<B>,
    ctx: &mut TxContext
) {
    let pool = pool::init_pool<A, B>(coin_a, coin_b, ctx);
    let pool_id = object::id(&pool); // get the pool's ID (should be a value, not a reference)
    bag::add(&mut container.pools, pool_id, pool); // correct: value, not reference

}
