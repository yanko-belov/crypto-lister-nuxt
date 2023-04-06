interface ICurrency {
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
