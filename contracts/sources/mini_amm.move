module mini_amm::mini_amm;

use mini_amm::pool;
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

//=== Getter Functions===

public fun admin_address(container: &Container): address {
    container.admin
}

//=== Setter Functions===
public fun set_admin(container: &mut Container, new_admin: address) {
    container.admin = new_admin
}
