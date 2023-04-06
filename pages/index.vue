<template>
  <h1 class="mb-4 text-3xl font-bold md:mt-6">Home</h1>
  <CurrencyList :is-loading="store.isLoading" :currency-list="store.list" />
</template>

<script lang="ts" setup>
import { useCurrencyStore } from "~/store/currencyStore";

const store = useCurrencyStore();
</script>
