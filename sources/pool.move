module mini_amm::pool;

    use sui::coin::{Self, Coin};
    use sui::balance::{Self, Balance, Supply};
    
    

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
        ctx: &mut TxContext
    ): LiquidityPool<A, B> {
        LiquidityPool {
            id: object::new(ctx),
            reserve_a: coin::into_balance(coin_a),
            reserve_b: coin::into_balance(coin_b),
            k_last: coin::value(&coin_a) * coin::value(&coin_b),
            lp_supply: balance::create_supply<LP<A, B>>(ctx),
        }
    }
    
public fun add_liquidity<A, B>(
        pool: &mut LiquidityPool<A, B>,
        coin_a: Coin<A>,
        coin_b: Coin<B>,
        ctx: &mut TxContext
    ): Coin<LP<A, B>> {
        let amount_a = coin::value(&coin_a);
        let amount_b = coin::value(&coin_b);

        // Add tokens into reserves by mutating the value directly
        *balance::value_mut(&mut pool.reserve_a) = *balance::value(&pool.reserve_a) + amount_a;
        *balance::value_mut(&mut pool.reserve_b) = *balance::value(&pool.reserve_b) + amount_b;

        // calculate LP tokens to mint (simple min ratio)
        let liquidity = math::min(amount_a, amount_b);
        balance::increase_supply(&mut pool.lp_supply, liquidity);

        // update k_last
        pool.k_last = *balance::value(&pool.reserve_a) * *balance::value(&pool.reserve_b);

        // mint LP token
        coin::from_balance(balance::zero(), ctx)
    }

/// Remove liquidity from the pool
    public fun remove_liquidity<A, B>(
        pool: &mut LiquidityPool<A, B>,
        lp_coin: Coin<LP<A, B>>,
        ctx: &mut TxContext
    ): (Coin<A>, Coin<B>) {
        let lp_value = coin::value(&lp_coin);
        let total_lp = balance::supply(&pool.lp_supply);
        assert!(lp_value <= total_lp, ERROR_INSUFFICIENT_LIQUIDITY);

        let amount_a = lp_value * coin::value(&pool.reserve_a) / total_lp;
        let amount_b = lp_value * coin::value(&pool.reserve_b) / total_lp;

        balance::decrease_supply(&mut pool.lp_supply, lp_value);

        let coin_a = extract_from_balance(&mut pool.reserve_a, amount_a, ctx);
        let coin_b = extract_from_balance(&mut pool.reserve_b, amount_b, ctx);

        (coin_a, coin_b)
    }
    

    
