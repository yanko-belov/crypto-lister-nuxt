<template>
  <NavBar />
  <template v-if="store.isLoading" />
  <LoadingError v-else-if="store.hasError" @reload-data="reloadData" />
  <NuxtPage v-else />
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
