import { defineStore } from "pinia";
import listData from "@/data-mock/list.json";

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
    favoritesList: (state) =>
      state.list.filter((currency) =>
        state.favorites.includes(currency.symbol.toLowerCase())
      ),
  },
  actions: {
    async getList() {
      this.isLoading = true;
      this.hasError = false;
      try {
        // const response = await $fetch("/api/list");
        const response = listData;
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
  },
});