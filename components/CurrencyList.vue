<template>
  <CurrencyListLoader v-if="props.isLoading" />
  <template v-else-if="hasCurrencies">
    <FilterInput v-model="filter" />
    <div
      class="mt-4 grid grid-cols-1 gap-4 min-[530px]:grid-cols-2 md:mt-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5"
    >
      <NuxtLink
        v-for="currency in currencyListFiltered"
        :key="`currency-${currency.id}`"
        :to="`currency/${currency.symbol.toLowerCase()}`"
      >
        <CurrencyCard :symbol="currency.symbol.toLowerCase()" class="h-full" />
      </NuxtLink>
    </div>
  </template>
  <div v-else class="flex h-full flex-col items-center justify-center">
    <img src="/img/data/no-data.svg" alt="No currencies found" class="w-96" />
    <h1 class="mt-5 text-2xl font-bold">
      <slot name="no-data-header">No Currencies Found</slot>
    </h1>
    <slot name="cta"></slot>
  </div>
</template>

<script lang="ts" setup>
import type { ICurrency } from "~/types";
const filter = ref("");

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
    const symbol = currency.symbol.toLowerCase();
    const filterValue = filter.value.toLowerCase();
    return name.includes(filterValue) || symbol.includes(filterValue);
  })
);
</script>
