import { RouterLinkStub, shallowMount } from "@vue/test-utils";
import CurrencyList from "@/components/CurrencyList.vue";
import CurrencyCard from "@/components/CurrencyCard.vue";
import CurrencyListLoader from "@/components/CurrencyListLoader.vue";
import FilterInput from "@/components/FilterInput.vue";

import { currencyList as currencyListMocked } from "~/tests/_data";
import { createTestingPinia } from "@pinia/testing";
import { useCurrencyStore } from "~/store/currencyStore";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { ICurrency } from "~/types";

const mountCurrencyList = ({
  currencyList,
  isLoading,
}: {
  currencyList: ICurrency[];
  isLoading: boolean;
}) => {
  return shallowMount(CurrencyList, {
    props: {
      currencyList,
      isLoading,
    },
    components: {
      FilterInput,
      CurrencyCard,
      CurrencyListLoader,
    },
    stubs: {
      NuxtLink: RouterLinkStub,
    },
  });
};

describe("Currency List Test", () => {
  let store = null;

  beforeEach(() => {
    setActivePinia(createTestingPinia({ stubActions: false }));

    store = useCurrencyStore();
  });

  test("component exist", async () => {
    expect(CurrencyList).toBeTruthy();
  });

  test("test no currencies", async () => {
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

  test("test loading", async () => {
    const wrapper = mountCurrencyList({
      currencyList: currencyListMocked,
      isLoading: true,
    });
    expect(wrapper.find("[data-testid='loader']").exists()).toBeTruthy();
  });

  test("test listing", async () => {
    const wrapper = mountCurrencyList({
      currencyList: currencyListMocked,
      isLoading: false,
    });
    expect(
      wrapper.find("[data-testid='currency-filter']").exists()
    ).toBeTruthy();
    expect(
      wrapper.find("[data-testid='card-container']").exists()
    ).toBeTruthy();
    expect(wrapper.find("[data-testid='card-link']").exists()).toBeTruthy();
    expect(wrapper.find("[data-testid='card']").exists()).toBeTruthy();
  });

  test("test filtering", async () => {
    const wrapper = mountCurrencyList({
      currencyList: currencyListMocked,
      isLoading: false,
    });

    wrapper.vm.filter = "btc";
    await nextTick();
    expect(
      wrapper.findAll("[data-testid='card-link']").length
    ).toBeGreaterThanOrEqual(1);

    wrapper.vm.filter = "btc123123123123";
    await nextTick();
    expect(wrapper.findAll("[data-testid='card-link']").length).toBe(0);
  });
});
