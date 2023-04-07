import { currencyList } from "~/tests/_data";
import { createTestingPinia } from "@pinia/testing";
import { useCurrencyStore } from "~/store/currency";
import { setActivePinia } from "pinia";
import { useCurrency } from "~/composables/currency";

const c = currencyList[0];

describe("Currency Card Test", () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createTestingPinia({ stubActions: false }));

    store = useCurrencyStore();
    store.list = currencyList;
  });

  test("test creation", async () => {
    const store = useCurrencyStore();
    const {
      symbol,
      currency,
      isFavorite,
      formattedPrice,
      toggleFavorite,
      hasValidCurrency,
    } = useCurrency(c.symbol);

    expect(store.favorites).toHaveLength(0);
    expect(symbol).toBe(c.symbol);
    expect(currency.value).toMatchObject(c);
    expect(formattedPrice.value).toBe(store.getPriceFormatted(c));

    expect(isFavorite.value).toBeFalsy();
    expect(hasValidCurrency.value).toBeTruthy();
  });

  test("test favorite toggle", async () => {
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
});
