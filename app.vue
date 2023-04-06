<template>
  <NavBar />
  <div class="container mx-auto px-4 py-6">
    <LoadingError v-if="store.hasError">
      <template #cta>
        <button
          type="button"
          class="mt-3 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
          @click="reloadData"
        >
          Reload data
        </button>
      </template>
    </LoadingError>
    <NuxtPage v-else />
  </div>
</template>
<script lang="ts" setup>
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
