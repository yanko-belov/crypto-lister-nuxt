export interface ICurrency {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
    };
  };
  tags: string[];
  circulating_supply: number;
}

export const CURRENCIES_WHITELIST: string[] = [
  "ada",
  "avax",
  "bnb",
  "btc",
  "busd",
  "dai",
  "doge",
  "dot",
  "eth",
  "matic",
  "shib",
  "sol",
  "trx",
  "uni",
  "usdc",
  "usdt",
  "wbtc",
  "xrp",
];
