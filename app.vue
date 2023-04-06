<template>
  <NavBar />
  <div class="container mx-auto px-4 py-6">
    <LoadingError v-if="store.hasError" @reload-data="reloadData" />
    <NuxtPage v-else />
  </div>
</template>
<script setup lang="ts">
import { useCurrencyStore } from "~/store/currencyStore";
const store = useCurrencyStore();

useHead({
  bodyAttrs: {
    class: "bg-gray-200",
  },
});
const reloadData = () => store.loadList();

store.loadList();
</script>
