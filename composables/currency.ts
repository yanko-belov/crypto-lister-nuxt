import type { ICurrency } from "~/types";
import { useCurrencyStore } from "~/store/currency";
export function useCurrency(symbol: string) {
  const store = useCurrencyStore();

  const isFavorite = computed<boolean>(() => store.favorites.includes(symbol));
  const toggleFavorite = () =>
    isFavorite.value
      ? store.removeFromFavorites(symbol)
      : store.addToFavorites(symbol);

  const currency = computed<ICurrency>(
    () => store.list.find((currency) => currency.symbol === symbol) as ICurrency
  );

  const hasValidCurrency = computed<boolean>(() => currency.value !== undefined);

  const formattedPrice = computed<string>(() =>
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
