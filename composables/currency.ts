import type { ICurrency } from "~/types";
import { useCurrencyStore } from "~/store/currency";
export function useCurrency(symbol: string) {
  const store = useCurrencyStore();

  const isFavorite = computed(() => store.favorites.includes(symbol));
  const toggleFavorite = () =>
    isFavorite.value
      ? store.removeFromFavorites(symbol)
      : store.addToFavorites(symbol);

  const currency = computed(
    () => store.list.find((currency) => currency.symbol === symbol) as ICurrency
  );

  const hasValidCurrency = computed(() => currency.value !== undefined);

  const formattedPrice = computed(() =>
    hasValidCurrency.value
      ? store.getPriceFormatted(currency.value as ICurrency)
      : ""
  );

  return {
    symbol,
    currency,
    isFavorite,
    formattedPrice,
    toggleFavorite,
    hasValidCurrency,
  };
}
