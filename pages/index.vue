<template>
  <h1 class="mb-6 text-3xl font-bold">Home</h1>
  <CurrencyList :is-loading="store.isLoading" :currency-list="store.list" />
</template>

<script setup>
import { useCurrencyStore } from "~/store/currencyStore";

const store = useCurrencyStore();
</script>
