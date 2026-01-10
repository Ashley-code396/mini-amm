module mini_amm::admin;

use mini_amm::mini_amm::{Self, Container};
use sui::event;

//===Error codes ===
#[error(code = 0)]
const ENotAdmin: vector<u8> = b"Caller is not the admin";

#[error(code = 1)]
const ESameAdmin: vector<u8> = b"New admin address is the same as current";

/// === Events ===
public struct AdminTransferred has copy, drop {
    old_admin: address,
    new_admin: address,
}

/// === Internal admin check ===
public fun assert_admin(container: &Container, ctx: &TxContext) {
    let admin = mini_amm::admin_address(container);
    assert!(admin == ctx.sender(), ENotAdmin);
}

/// === Admin-only function ===
public fun change_admin(container: &mut Container, new_admin: address, ctx: &TxContext) {
    assert_admin(container, ctx);

    let current_admin = mini_amm::admin_address(container);

    assert!(new_admin != current_admin, ESameAdmin);

    let old = current_admin;
    mini_amm::set_admin(container, new_admin);

    event::emit(AdminTransferred {
        old_admin: old,
        new_admin,
    });
}
