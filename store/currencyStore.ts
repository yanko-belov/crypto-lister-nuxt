import { defineStore } from "pinia";

interface ICurrencyState {
  list: ICurrency[];
  whitelist: string[];
  favorites: string[];
  isLoading: boolean;
  hasError: boolean;
  lastUpdated: Date;
}

export const useCurrencyStore = defineStore("currency", {
  state: (): ICurrencyState => ({
    list: [],
    whitelist: [
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
    ],
    favorites: [],
    hasError: false,
    isLoading: false,
    lastUpdated: new Date("1970-01-01"),
  }),
  getters: {
    currencyFormatter: () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }),
    favouritesList: (state) =>
      state.list.filter((currency) =>
        state.favorites.includes(currency.symbol.toLowerCase())
      ),
  },
  actions: {
    async loadList() {
      this.isLoading = true;
      this.hasError = false;
      try {
        const response = await $fetch("/api/list");
        this.list = response.data as ICurrency[];
        this.lastUpdated = new Date(response.timestamp);
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isLoading = false;
      }
    },
    getPriceFormatted(currency: ICurrency): string {
      return this.currencyFormatter.format(currency.quote.USD.price);
    },
    removeFromFavorites(symbol: string) {
      symbol = symbol.toLowerCase();
      this.favorites = this.favorites.filter((s) => s !== symbol);
    },
    addToFavorites(symbol: string) {
      this.favorites.push(symbol.toLowerCase());
    },
  },
});
