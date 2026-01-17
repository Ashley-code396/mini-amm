// types/poolEvents.ts
export interface PoolInitializedEvent {
  lp_id: string;
  amount_a: number;
  amount_b: number;
}

export interface LiquidityAddedEvent {
  lp_id: string;
  amount_a: number;
  amount_b: number;
  lp_minted: number;
}

export interface LiquidityRemovedEvent {
  lp_id: string;
  amount_a: number;
  amount_b: number;
  lp_burned: number;
}

export type PoolEventPayload =
  | PoolInitializedEvent
  | LiquidityAddedEvent
  | LiquidityRemovedEvent;
