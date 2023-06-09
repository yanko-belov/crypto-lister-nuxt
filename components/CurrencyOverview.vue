<template>
  <div class="mb-4 items-center justify-between sm:flex md:mt-6">
    <div class="flex items-center gap-3">
      <img
        data-testid="logo"
        class="h-8 w-8"
        :src="`/img/svg-crypto-logos/${symbol}.svg`"
        alt="Logo"
      />
      <h1 class="text-3xl font-bold" data-testid="name">
        {{ currency.name }}
      </h1>
    </div>
    <button
      data-testid="toggle-favorite-button"
      type="button"
      class="mt-4 inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 focus:z-10 focus:outline-none sm:mt-0"
      @click.stop.prevent="toggleFavorite"
    >
      <img
        data-testid="toggle-favorite-img"
        class="-ml-1 mr-2 h-4 w-4"
        :src="`/img/icons/favorite-${isFavorite ? '' : 'in'}active.svg`"
        alt="Favorite toggle"
        @click.stop.prevent="toggleFavorite"
      />
      <span v-if="isFavorite">Remove from Favorites</span>
      <span v-else>Add to Favorites</span>
    </button>
  </div>
  <div
    class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8"
  >
    <div class="rounded-lg bg-white p-6 shadow-xl">
      <h2 class="mb-2 text-lg font-semibold text-gray-800">Current Price</h2>
      <p class="text-2xl font-bold text-gray-800" data-testid="current-price">
        {{ formattedPrice }}
      </p>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-xl">
      <h2 class="mb-2 text-lg font-semibold text-gray-800">Market Cap</h2>
      <p class="text-2xl font-bold text-gray-800" data-testid="market-cap">
        {{ formatCurrencyCompact(currency.quote.USD.market_cap) }}
      </p>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-xl">
      <h2 class="mb-2 text-lg font-semibold text-gray-800">24h Volume</h2>
      <p class="text-2xl font-bold text-gray-800" data-testid="volume-24h">
        {{ formatCurrencyCompact(currency.quote.USD.volume_24h) }}
      </p>
    </div>
    <div class="rounded-lg bg-white p-6 shadow-xl">
      <h2 class="mb-2 text-lg font-semibold text-gray-800">
        Circulating Supply
      </h2>
      <p class="text-2xl font-bold text-gray-800" data-testid="current-supply">
        {{ formatCurrencyCompact(currency.circulating_supply) }}
        {{ currency.symbol.toUpperCase() }}
      </p>
    </div>
  </div>

  <div
    class="mt-4 flex flex-wrap gap-3 rounded-lg bg-white p-6 shadow-xl md:mt-6 lg:mt-8"
  >
    <span
      v-for="tag in currency.tags"
      :key="`tag-${tag}`"
      data-testid="tag"
      class="whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useCurrency } from "~/composables/currency";
import { formatCurrencyCompact } from "~/helpers/utils";
const props = defineProps<{ symbol: string }>();

const { symbol, toggleFavorite, isFavorite, formattedPrice, currency } =
  useCurrency(props.symbol);
</script>
