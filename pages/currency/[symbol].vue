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
      <svg
        v-if="isFavorite"
        class="-ml-1 mr-2 h-4 w-4"
        focusable="false"
        data-prefix="fab"
        role="img"
        fill="#ffd27d"
        viewBox="0 0 24 24"
        width="30px"
        height="30px"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        ></path>
      </svg>
      <svg
        v-else
        class="-ml-1 mr-2 h-4 w-4"
        focusable="false"
        data-prefix="fab"
        role="img"
        fill="none"
        stroke="#c3c3c3"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        width="30px"
        height="30px"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        ></path>
      </svg>
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
// const { symbol } = (route.params?.symbol || "").toLowerCase();
const symbol = "btc";

const currency = computed(
  () =>
    store.list.find(
      (currency) => currency.symbol.toLowerCase() === symbol
    ) as ICurrency
);

const isFavorite = computed(() => store.favorites.includes(symbol));
const toggleFavorite = () =>
  isFavorite.value
    ? store.removeFromFavorites(symbol)
    : store.addToFavorites(symbol);
</script>
