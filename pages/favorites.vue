<template>
  <h1 class="mb-4 flex items-center gap-2 text-3xl font-bold md:mt-4">
    <span>Favorites</span>
    <FavouritesCounterIndicator />
  </h1>
  <CurrencyList
    :is-loading="store.isLoading"
    :currency-list="store.favouritesList"
  >
    <template #no-data-header>Your Favorites List is Currently Empty</template>
    <template #cta>
      <NuxtLink to="/" class="btn btn-primary">
        <button
          type="button"
          class="mt-3 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Find Favorites
        </button>
      </NuxtLink>
    </template>
  </CurrencyList>
</template>

<script lang="ts" setup>
import { useCurrencyStore } from "~/store/currency";

const store = useCurrencyStore();
</script>
