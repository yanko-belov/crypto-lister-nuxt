import { mount } from "@vue/test-utils";
import FavoritesCounterIndicator from "../components/FavoritesCounterIndicator.vue";
import { currencyList } from "~/tests/_data";
import { createTestingPinia } from "@pinia/testing";
import { useCurrencyStore } from "~/store/currencyStore";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";

const currency = currencyList[0];

const mountFavoritesCounterIndicator = () => {
  return mount(FavoritesCounterIndicator);
};

describe("Currency Card Test", () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createTestingPinia({ stubActions: false }));

    store = useCurrencyStore();
    store.list = currencyList;
  });

  test("component exist", async () => {
    expect(FavoritesCounterIndicator).toBeTruthy();
  });

  test("test favorite", async () => {
    const wrapper = mountFavoritesCounterIndicator();
    const store = useCurrencyStore();

    // initial state
    expect(store.favorites).toHaveLength(0);
    expect(wrapper.get("[data-testid='favorites-counter']").text()).toBe("0");

    store.addToFavorites(currency.symbol);
    await nextTick();
    expect(wrapper.get("[data-testid='favorites-counter']").text()).toBe("1");

    store.addToFavorites(currency.symbol);
    await nextTick();
    expect(wrapper.get("[data-testid='favorites-counter']").text()).toBe("1");

    store.removeFromFavorites(currency.symbol);
    await nextTick();
    expect(wrapper.get("[data-testid='favorites-counter']").text()).toBe("0");
  });
});
