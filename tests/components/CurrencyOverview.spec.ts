import { shallowMount } from "@vue/test-utils";
import CurrencyOverview from "~/components/CurrencyOverview.vue";

import { currencyList } from "~/tests/_data";
import { createTestingPinia } from "@pinia/testing";
import { useCurrencyStore } from "~/store/currency";
import { setActivePinia } from "pinia";
import { formatCurrencyCompact } from "~/helpers/utils";

const currency = currencyList[0];
const mountCurrencyOverview = () => {
  return shallowMount(CurrencyOverview, {
    props: {
      symbol: currency.symbol.toLowerCase(),
    },
  });
};

describe("Currency Overview Test", () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createTestingPinia({ stubActions: false }));

    store = useCurrencyStore();
    store.list = currencyList;
  });

  test("component exist", async () => {
    expect(CurrencyOverview).toBeTruthy();
  });

  test("component has visible controls", async () => {
    const wrapper = mountCurrencyOverview();
    const store = useCurrencyStore();

    expect(wrapper.get("[data-testid='logo']").attributes().src).toBe(
      `/img/svg-crypto-logos/${currency.symbol.toLowerCase()}.svg`
    );
    expect(wrapper.get("[data-testid='name']").text()).toBe(currency.name);
    expect(
      wrapper.find("[data-testid='toggle-favorite-button']").exists()
    ).toBeTruthy();
    expect(
      wrapper.get("[data-testid='toggle-favorite-img']").attributes().src
    ).toBe(`/img/icons/favorite-inactive.svg`);

    expect(wrapper.get("[data-testid='current-price']").text()).toBe(
      store.getPriceFormatted(currency)
    );
    expect(wrapper.get("[data-testid='market-cap']").text()).toBe(
      formatCurrencyCompact(currency.quote.USD.market_cap)
    );
    expect(wrapper.get("[data-testid='volume-24h']").text()).toBe(
      formatCurrencyCompact(currency.quote.USD.volume_24h)
    );
    expect(wrapper.get("[data-testid='current-supply']").text()).toBe(
      `${formatCurrencyCompact(
        currency.circulating_supply
      )} ${currency.symbol.toUpperCase()}`
    );
    expect(
      wrapper.findAll("[data-testid='tag']").length
    ).toBeGreaterThanOrEqual(currency.tags.length);
  });

  test("add and remove from favorites", async () => {
    const wrapper = mountCurrencyOverview();
    const store = useCurrencyStore();

    // initial state
    expect(store.favorites).toHaveLength(0);
    expect(
      wrapper.get("[data-testid='toggle-favorite-img']").attributes().src
    ).toBe(`/img/icons/favorite-inactive.svg`);

    // add to favorites
    await wrapper
      .get("[data-testid='toggle-favorite-button']")
      .trigger("click");
    expect(store.favorites).toHaveLength(1);
    expect(
      store.favorites.includes(currency.symbol.toLowerCase())
    ).toBeTruthy();
    expect(
      wrapper.get("[data-testid='toggle-favorite-img']").attributes().src
    ).toBe(`/img/icons/favorite-active.svg`);

    // remove from favorites
    await wrapper
      .get("[data-testid='toggle-favorite-button']")
      .trigger("click");
    expect(store.favorites).toHaveLength(0);
    expect(store.favorites.includes(currency.symbol.toLowerCase())).toBeFalsy();
    expect(
      wrapper.get("[data-testid='toggle-favorite-img']").attributes().src
    ).toBe(`/img/icons/favorite-inactive.svg`);
  });
});
