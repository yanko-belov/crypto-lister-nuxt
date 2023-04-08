import { currencyList } from "~/tests/_data";
import { createTestingPinia } from "@pinia/testing";
import { useCurrencyStore } from "~/store/currency";
import { setActivePinia } from "pinia";
import { useCurrency } from "~/composables/currency";

const c = currencyList[0];

describe("Currency Composable Test", () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createTestingPinia({ stubActions: false }));

    store = useCurrencyStore();
    store.list = currencyList;
  });

  test("currency with valid symbol", async () => {
    const store = useCurrencyStore();
    const { symbol, currency, isFavorite, formattedPrice, hasValidCurrency } =
      useCurrency(c.symbol);

    expect(store.favorites).toHaveLength(0);
    expect(symbol).toBe(c.symbol);
    expect(currency.value).toMatchObject(c);
    expect(formattedPrice.value).toBe(store.getPriceFormatted(c));

    expect(isFavorite.value).toBeFalsy();
    expect(hasValidCurrency.value).toBeTruthy();
  });

  test("add and remove from favorites", async () => {
    const { isFavorite, toggleFavorite } = useCurrency(c.symbol);

    expect(isFavorite.value).toBeFalsy();
    toggleFavorite();
    expect(isFavorite.value).toBeTruthy();
    toggleFavorite();
    expect(isFavorite.value).toBeFalsy();
    toggleFavorite();
    expect(isFavorite.value).toBeTruthy();
    toggleFavorite();
  });

  test("currency with invalid symbol", async () => {
    const { isFavorite, hasValidCurrency, formattedPrice } =
      useCurrency("something invalid");

    expect(isFavorite.value).toBeFalsy();
    expect(hasValidCurrency.value).toBeFalsy();
    expect(formattedPrice.value).toBe("");
  });
});
