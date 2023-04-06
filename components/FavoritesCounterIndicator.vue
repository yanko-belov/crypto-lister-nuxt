<template>
  <div
    class="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white"
  >
    {{ store.favorites.length }}
  </div>
</template>

<script lang="ts" setup>
import { useCurrencyStore } from "~/store/currencyStore";

const store = useCurrencyStore();
</script>
