<template>
  <CurrencyListLoader v-if="props.isLoading" />
  <template v-else-if="hasCurrencies || !isFilterEmpty">
    <FilterInput v-model="filter" />
    <div
      class="mt-4 grid grid-cols-1 gap-4 min-[530px]:grid-cols-2 md:mt-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5"
      data-testid="card-container"
    >
      <NuxtLink
        v-for="currency in currencyListFiltered"
        :key="`currency-${currency.id}`"
        :to="`currency/${currency.symbol}`"
      >
        <CurrencyCard :symbol="currency.symbol" class="h-full" />
      </NuxtLink>
    </div>
  </template>
  <div
    v-if="!hasCurrencies && !props.isLoading"
    data-testid="missing-data"
    class="flex h-full flex-col items-center justify-center"
  >
    <img
      data-testid="missing-data-image"
      src="/img/data/no-data.svg"
      alt="No currencies found"
      class="w-96"
    />
    <h1 data-testid="missing-data-title" class="mt-5 text-2xl font-bold">
      <span v-if="!isFilterEmpty">
        No Currencies Found with filter "{{ filter }}"
      </span>
      <slot v-else name="no-data-header">No Currencies Found</slot>
    </h1>

    <button
      v-if="!isFilterEmpty"
      type="button"
      class="mt-3 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
      @click="clearFilter"
    >
      Clear filter
    </button>
    <slot v-else name="cta"></slot>
  </div>
</template>

<script lang="ts" setup>
import type { ICurrency } from "~/types";
const filter = ref("");
const isFilterEmpty = computed(() => filter.value.length === 0);
const clearFilter = () => (filter.value = "");

const props = withDefaults(
  defineProps<{ currencyList: ICurrency[]; isLoading?: boolean }>(),
  {
    currencyList: () => [],
    isLoading: false,
  }
);

const hasCurrencies = computed(() => currencyListFiltered.value.length > 0);

const currencyListFiltered = computed(() =>
  props.currencyList.filter((currency) => {
    const name = currency.name.toLowerCase();
    const filterValue = filter.value.toLowerCase();
    return name.includes(filterValue) || currency.symbol.includes(filterValue);
  })
);
</script>
