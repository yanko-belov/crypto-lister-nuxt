<template>
  <NuxtPage />
</template>
<script setup lang="ts">
import { useCurrencyStore } from "~/store/currencyStore";
const store = useCurrencyStore();

useHead({
  bodyAttrs: {
    class: "bg-gray-100",
  },
});

store.getList();
</script>
