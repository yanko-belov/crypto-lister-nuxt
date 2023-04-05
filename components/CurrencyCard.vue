<template>
  <div class="group relative cursor-pointer">
    <div
      class="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-0 blur transition duration-500 group-hover:opacity-75"
    ></div>
    <div
      class="flex-grow-1 relative flex h-full w-full flex-col justify-between rounded-md bg-white p-4 shadow-lg"
    >
      <div class="flex gap-1">
        <div class="grow text-zinc-700">
          <h2 class="text-xl">{{ currency.name }}</h2>
          <h3 class="mt-2 text-sm font-bold">
            {{ store.getPriceFormatted(currency) }}
          </h3>
        </div>
        <img
          class="h-10 w-10"
          :src="`/img/svg-crypto-logos/${currency.symbol.toLowerCase()}.svg`"
          alt="Bitcoin Logo"
        />
      </div>
      <div class="mt-4 flex items-center justify-between">
        <svg
          v-if="isFavorite"
          fill="#ffd27d"
          viewBox="0 0 24 24"
          width="30px"
          height="30px"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          @click.stop.prevent="store.removeFromFavorites(symbol)"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          ></path>
        </svg>
        <svg
          v-else
          fill="none"
          stroke="#c3c3c3"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          width="30px"
          height="30px"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          @click.stop.prevent="store.addToFavorites(symbol)"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          ></path>
        </svg>
        <svg
          fill="none"
          stroke="#c3c3c3"
          stroke-width="2"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCurrencyStore } from "~/store/currencyStore";

const store = useCurrencyStore();
const props = defineProps<{ currency: ICurrency }>();

const symbol = computed(() => props.currency.symbol.toLowerCase());

const isFavorite = computed(() => store.favorites.includes(symbol.value));
</script>
