module mini_amm::mini_amm;

use sui::bag::{Self, Bag};
use sui::package;

public struct Container has key {
    id: UID,
    pools: Bag,
    admin: address,
}
public struct MINI_AMM has drop{}

fun init(otw: MINI_AMM,ctx: &mut TxContext) {

    package::claim_and_keep(otw, ctx);
    transfer::share_object(Container {
        id: object::new(ctx),
        pools: bag::new(ctx),
        admin: ctx.sender()
    });
}
