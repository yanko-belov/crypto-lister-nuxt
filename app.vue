<template>
  <NavBar />
  <NuxtPage />
</template>
<script setup lang="ts">
import { useCurrencyStore } from "~/store/currencyStore";
const store = useCurrencyStore();

useHead({
  bodyAttrs: {
    class: "bg-gray-200",
  },
});

store.getList();
</script>
