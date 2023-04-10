/* eslint-disable @typescript-eslint/no-explicit-any */
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useCurrencyStore } from "~/store/currency";
import { vi } from "vitest";
import { listResponse } from "~/tests/_data";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.$fetch = vi.fn();
const mockedFetch = vi.mocked(global.$fetch, true);

describe("Currency Store Test", () => {
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({ stubActions: false, createSpy: vi.fn })
    );
    mockedFetch.mockReset();
  });

  test("load currency list", async () => {
    mockedFetch.mockResolvedValueOnce(listResponse);
    const store = useCurrencyStore();

    const currency = listResponse.data[0];
    await store.loadList();
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    expect(mockedFetch).toHaveBeenCalledWith("/api/list");
    expect(store.list).toEqual(listResponse.data);
    expect(store.hasError).toBeFalsy();
    expect(store.isLoading).toBeFalsy();
    expect(store.getPriceFormatted(listResponse.data[0])).toEqual(
      store.currencyFormatter.format(currency.quote.USD.price)
    );
  });

  test("currency formatter", async () => {
    mockedFetch.mockResolvedValueOnce(listResponse);
    const store = useCurrencyStore();

    const currency = listResponse.data[0];
    await store.loadList();
    expect(store.getPriceFormatted(listResponse.data[0])).toEqual(
      store.currencyFormatter.format(currency.quote.USD.price)
    );
  });

  test("add and remove from favorites", async () => {
    mockedFetch.mockResolvedValueOnce(listResponse);
    const store = useCurrencyStore();

    const currency = listResponse.data[0];
    await store.loadList();

    // add invalid value to favorites
    store.addToFavorites("test");
    expect(store.favorites.length).toEqual(0);

    // add to favorites
    store.addToFavorites(currency.symbol);
    expect(store.favorites.length).toEqual(1);
    expect(store.favorites).toEqual([currency.symbol]);

    store.addToFavorites(currency.symbol);
    expect(store.favorites.length).toEqual(1);
    expect(store.favorites).toEqual([currency.symbol]);
    expect(store.favoritesList).toEqual([currency]);

    // remove invalid value form favorites
    store.removeFromFavorites("dasdasda");
    expect(store.favorites.length).toEqual(1);
    expect(store.favorites).toEqual([currency.symbol]);
    expect(store.favoritesList).toEqual([currency]);

    store.removeFromFavorites(currency.symbol);
    expect(store.favorites.length).toEqual(0);
    expect(store.favorites).toEqual([]);
  });

  test("failure of loading", async () => {
    mockedFetch.mockRejectedValue({
      data: [],
    });
    const store = useCurrencyStore();
    await store.loadList();
    expect(store.hasError).toBeTruthy();
  });

  test("loading state", async () => {
    mockedFetch.mockRejectedValue({
      data: [],
    });
    const store = useCurrencyStore();
    store.loadList();
    expect(store.isLoading).toBeTruthy();
  });
});
