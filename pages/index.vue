<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="mb-6 text-3xl font-bold">Home</h1>
    <CurrencyList :currency-list="store.list" />
  </div>
</template>

<script setup>
import { useCurrencyStore } from "~/store/currencyStore";

const store = useCurrencyStore();
</script>
