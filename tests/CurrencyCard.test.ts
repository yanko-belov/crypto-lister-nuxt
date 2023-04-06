import { mount } from "@vue/test-utils";
import CurrencyCard from "../components/CurrencyCard.vue";
import { currencyList } from "~/tests/_data";
import { createTestingPinia } from "@pinia/testing";
import { useCurrencyStore } from "~/store/currencyStore";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";

const currency = currencyList[0];

const mountCurrencyCard = () => {
  return mount(CurrencyCard, {
    props: {
      symbol: currency.symbol.toLowerCase(),
    },
  });
};

describe("Currency Card Test", () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createTestingPinia({ stubActions: false }));

    store = useCurrencyStore();
    store.list = currencyList;
  });

  test("component exist", async () => {
    expect(CurrencyCard).toBeTruthy();
  });

  test("component has visible controls", async () => {
    const wrapper = mountCurrencyCard();
    const store = useCurrencyStore();

    expect(wrapper.get("[data-testid='title']").text()).toBe(currency.name);
    expect(wrapper.get("[data-testid='formatted-price']").text()).toBe(
      store.getPriceFormatted(currency)
    );
    expect(wrapper.get("[data-testid='logo']").attributes().src).toBe(
      `/img/svg-crypto-logos/${currency.symbol.toLowerCase()}.svg`
    );
    expect(
      wrapper.get("[data-testid='toggle-favorite-button']").attributes().src
    ).toBe(`/img/icons/favorite-inactive.svg`);
    expect(
      wrapper.get("[data-testid='currency-details-button']").exists()
    ).toBeTruthy();
  });

  test("test favorite", async () => {
    const wrapper = mountCurrencyCard();
    const store = useCurrencyStore();

    // initial state
    expect(store.favorites).toHaveLength(0);
    expect(
      wrapper.get("[data-testid='toggle-favorite-button']").attributes().src
    ).toBe(`/img/icons/favorite-inactive.svg`);

    // add to favorites
    wrapper.get("[data-testid='toggle-favorite-button']").trigger("click");
    await nextTick();
    expect(store.favorites).toHaveLength(1);
    expect(
      store.favorites.includes(currency.symbol.toLowerCase())
    ).toBeTruthy();
    expect(
      wrapper.get("[data-testid='toggle-favorite-button']").attributes().src
    ).toBe(`/img/icons/favorite-active.svg`);

    // remove from favorites
    wrapper.get("[data-testid='toggle-favorite-button']").trigger("click");
    await nextTick();
    expect(store.favorites).toHaveLength(0);
    expect(store.favorites.includes(currency.symbol.toLowerCase())).toBeFalsy();
    expect(
      wrapper.get("[data-testid='toggle-favorite-button']").attributes().src
    ).toBe(`/img/icons/favorite-inactive.svg`);
  });
});
