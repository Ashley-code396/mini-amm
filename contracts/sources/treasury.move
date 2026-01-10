module mini_amm::treasury;

use sui::coin::Coin;

public fun deposit<CoinType>(coin: Coin<CoinType>) {
    transfer::public_transfer(coin, @treasury);
}
