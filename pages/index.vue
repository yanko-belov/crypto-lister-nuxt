<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="mb-6 text-3xl font-bold">List of Cryptocurrencies</h1>
    <div
      class="grid grid-cols-1 gap-6 min-[530px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
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

const store = useCurrencyStore();
const currencyList = computed(() => store.list);
</script>
