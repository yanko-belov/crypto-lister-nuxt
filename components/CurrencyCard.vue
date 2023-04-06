<template>
  <div class="group relative cursor-pointer">
    <div
      class="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-0 blur transition duration-300 group-hover:opacity-75"
    ></div>
    <div
      class="flex-grow-1 relative flex h-full w-full flex-col justify-between rounded-md bg-white p-4 shadow-lg"
    >
      <div class="flex gap-1">
        <div class="grow text-zinc-700">
          <h2 class="text-xl">{{ currency.name }}</h2>
          <h3 class="mt-2 text-sm font-bold">
            {{ formattedPrice }}
          </h3>
        </div>
        <img
          class="h-10 w-10"
          :src="`/img/svg-crypto-logos/${symbol}.svg`"
          alt="Bitcoin Logo"
        />
      </div>
      <div class="mt-4 flex items-center justify-between">
        <img
          class="h-8 w-8"
          :src="`/img/icons/favorite-${isFavorite ? 'in' : ''}active.svg`"
          alt="Favorite toggle"
          @click.stop.prevent="toggleFavorite"
        />
        <img
          class="h-6 w-6"
          src="/img/icons/chevron-right.svg"
          alt="View Details"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCurrency } from "~/composables/currency";

const props = defineProps<{ currency: ICurrency }>();

const { symbol, toggleFavorite, isFavorite, formattedPrice } = useCurrency(
  props.currency.symbol
);
</script>
