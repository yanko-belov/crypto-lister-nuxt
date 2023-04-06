<template>
  <div class="mb-6 items-center justify-between sm:flex">
    <div class="flex items-center gap-3">
      <img
        class="h-8 w-8"
        :src="`/img/svg-crypto-logos/${symbol}.svg`"
        alt="Bitcoin Logo"
      />
      <h1 class="text-3xl font-bold">{{ currency.name }}</h1>
    </div>
    <button
      type="button"
      class="mt-4 inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 focus:z-10 focus:outline-none sm:mt-0"
      @click.stop.prevent="toggleFavorite"
    >
      <img
        class="-ml-1 mr-2 h-4 w-4"
        :src="`/img/icons/favorite-${isFavorite ? 'in' : ''}active.svg`"
        alt="Favorite toggle"
        @click.stop.prevent="toggleFavorite"
      />
      <span v-if="isFavorite">Remove from Favorites</span>
      <span v-else>Add to Favorites</span>
    </button>
  </div>
  <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
    <div class="rounded-lg bg-white p-6 shadow-xl">
      <h2 class="mb-2 text-lg font-semibold text-gray-800">Current Price</h2>
      <p class="text-2xl font-bold text-gray-800">$60,000</p>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-xl">
      <h2 class="mb-2 text-lg font-semibold text-gray-800">Market Cap</h2>
      <p class="text-2xl font-bold text-gray-800">$1.1 trillion</p>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-xl">
      <h2 class="mb-2 text-lg font-semibold text-gray-800">24h Volume</h2>
      <p class="text-2xl font-bold text-gray-800">$50 billion</p>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-xl">
      <h2 class="mb-2 text-lg font-semibold text-gray-800">
        Circulating Supply
      </h2>
      <p class="text-2xl font-bold text-gray-800">18.6 BTC</p>
    </div>
  </div>

  <div class="mt-8 flex flex-wrap gap-3 rounded-lg bg-white p-6 shadow-xl">
    <span
      v-for="tag in currency.tags"
      :key="`tag-${tag}`"
      class="whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
import { useCurrencyStore } from "~/store/currencyStore";

const store = useCurrencyStore();
const symbol = computed(() => route.params?.symbol.toLowerCase());

const currency = computed(
  () =>
    store.list.find(
      (currency) => currency.symbol.toLowerCase() === symbol.value
    ) as ICurrency
);

const isFavorite = computed(() => store.favorites.includes(symbol.value));
const toggleFavorite = () =>
  isFavorite.value
    ? store.removeFromFavorites(symbol.value)
    : store.addToFavorites(symbol.value);
</script>
