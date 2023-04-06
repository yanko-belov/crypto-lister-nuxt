import { useCurrencyStore } from "~/store/currencyStore";
export function useCurrency(symbolParam: string) {
  const store = useCurrencyStore();

  const symbol = computed(() => symbolParam.toLowerCase());

  const isFavorite = computed(() => store.favorites.includes(symbol.value));
  const toggleFavorite = () =>
    isFavorite.value
      ? store.removeFromFavorites(symbol.value)
      : store.addToFavorites(symbol.value);

  const currency = computed(() =>
    store.list.find(
      (currency) => currency.symbol.toLowerCase() === symbol.value
    )
  );

  const hasValidCurrency = computed(() => currency.value !== undefined);

  const formatPrice = store.getPriceFormatted;

  return {
    symbol,
    currency,
    isFavorite,
    formatPrice,
    toggleFavorite,
    hasValidCurrency,
  };
}
