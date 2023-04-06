import type { ICurrency } from "~/types";
import { useCurrencyStore } from "~/store/currencyStore";
export function useCurrency(symbolParam: string) {
  const store = useCurrencyStore();

  const symbol = computed(() => symbolParam.toLowerCase());

  const isFavorite = computed(() => store.favorites.includes(symbol.value));
  const toggleFavorite = () =>
    isFavorite.value
      ? store.removeFromFavorites(symbol.value)
      : store.addToFavorites(symbol.value);

  const currency = computed(
    () =>
      store.list.find(
        (currency) => currency.symbol.toLowerCase() === symbol.value
      ) as ICurrency
  );

  const hasValidCurrency = computed(() => currency.value !== undefined);

  const formattedPrice = computed(() =>
    hasValidCurrency ? store.getPriceFormatted(currency.value as ICurrency) : ""
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
