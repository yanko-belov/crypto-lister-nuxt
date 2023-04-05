<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="mb-6 text-3xl font-bold">Home</h1>
    <FilterInput v-model="filter" class="mt-3" />
    <div
      class="mt-3 grid grid-cols-1 gap-6 min-[530px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <NuxtLink
        v-for="currency in currencyList"
        :key="`currency-${currency.id}`"
        :to="`currency/${currency.symbol.toLowerCase()}`"
      >
        <CurrencyCard :currency="currency" class="h-full" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useCurrencyStore } from "~/store/currencyStore";

const filter = ref("");
const store = useCurrencyStore();
const currencyList = computed(() =>
  store.list.filter((currency) => {
    const name = currency.name.toLowerCase();
    const symbol = currency.symbol.toLowerCase();
    const filterValue = filter.value.toLowerCase();
    return name.includes(filterValue) || symbol.includes(filterValue);
  })
);
</script>
