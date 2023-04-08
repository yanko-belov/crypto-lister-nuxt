import { mount, RouterLinkStub } from "@vue/test-utils";
import CurrencyList from "~/components/CurrencyList.vue";
import CurrencyCard from "~/components/CurrencyCard.vue";
import CurrencyListLoader from "~/components/CurrencyListLoader.vue";
import FilterInput from "~/components/FilterInput.vue";

import {
  currencyList,
  currencyList as currencyListMocked,
} from "~/tests/_data";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import type { ICurrency } from "~/types";
import { useCurrencyStore } from "~/store/currency";

const mountCurrencyList = ({
  currencyList,
  isLoading,
}: {
  currencyList: ICurrency[];
  isLoading: boolean;
}) => {
  return mount(CurrencyList, {
    props: {
      currencyList,
      isLoading,
    },
    components: {
      NuxtLink: RouterLinkStub,
      FilterInput,
      CurrencyCard,
      CurrencyListLoader,
    },
  });
};

describe("Currency List Test", () => {
  let store = null;
  beforeEach(() => {
    setActivePinia(createTestingPinia({ stubActions: false }));

    store = useCurrencyStore();
    store.list = currencyList;
  });

  test("component exist", async () => {
    expect(CurrencyList).toBeTruthy();
  });

  test("no currencies", async () => {
    const wrapper = mountCurrencyList({
      currencyList: [],
      isLoading: false,
    });
    expect(wrapper.find("[data-testid='missing-data']").exists()).toBeTruthy();
    expect(
      wrapper.find("[data-testid='missing-data-image']").exists()
    ).toBeTruthy();
    expect(
      wrapper.find("[data-testid='missing-data-title']").exists()
    ).toBeTruthy();
  });

  test("loading visible", async () => {
    const wrapper = mountCurrencyList({
      currencyList: currencyListMocked,
      isLoading: true,
    });
    expect(
      wrapper.find("[data-testid='currency-list-loader']").exists()
    ).toBeTruthy();
  });

  test("listing visible", async () => {
    const wrapper = mountCurrencyList({
      currencyList: currencyListMocked,
      isLoading: false,
    });
    expect(wrapper.find("[data-testid='filter-input']").exists()).toBeTruthy();
    expect(
      wrapper.find("[data-testid='card-container']").exists()
    ).toBeTruthy();
    expect(wrapper.find("[data-testid='currency-card']").exists()).toBeTruthy();
  });

  test("filter elements", async () => {
    const wrapper = mountCurrencyList({
      currencyList: currencyListMocked,
      isLoading: false,
    });

    wrapper.vm.filter = "btc";
    await nextTick();
    expect(
      wrapper.findAll("[data-testid='currency-card']").length
    ).toBeGreaterThanOrEqual(1);

    wrapper.vm.filter = "btc123123123123";
    await nextTick();
    expect(wrapper.findAll("[data-testid='currency-card']").length).toBe(0);
  });
});
