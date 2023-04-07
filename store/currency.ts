import { defineStore } from "pinia";
import type { ICurrency } from "~/types";
import axios from "axios";

interface ICurrencyState {
  list: ICurrency[];
  favorites: string[];
  isLoading: boolean;
  hasError: boolean;
  lastUpdated: Date;
}

export const useCurrencyStore = defineStore("currency", {
  state: (): ICurrencyState => ({
    list: [],
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
        state.favorites.includes(currency.symbol)
      ),
    symbolWhiteList: (state) => state.list.map((currency) => currency.symbol),
  },
  actions: {
    async loadList() {
      this.isLoading = true;
      this.hasError = false;
      try {
        const response = await axios.get("/api/list");
        const data = response.data;
        this.list = data.data as ICurrency[];
        this.lastUpdated = new Date(data.timestamp);
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
      if (this.favorites.includes(symbol)) {
        this.favorites = this.favorites.filter((s) => s !== symbol);
      }
    },
    addToFavorites(symbol: string) {
      if (
        !this.favorites.includes(symbol) &&
        this.symbolWhiteList.includes(symbol)
      ) {
        this.favorites.push(symbol);
      }
    },
  },
});
