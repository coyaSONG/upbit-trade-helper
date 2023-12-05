export interface tradingHookMessage {
  type: "bid" | "ask";
  market: string;
  price: string;
  volume: string;
}
