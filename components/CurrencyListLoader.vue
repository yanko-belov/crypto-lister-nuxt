<template>
  <FilterInput :disabled="true" />
  <div
    class="mt-4 grid grid-cols-1 gap-4 min-[530px]:grid-cols-2 md:mt-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5"
    data-testid="currency-list-loader"
  >
    <CurrencyCardLoader
      v-for="i in 15"
      :key="`currency-card-loader-${i}`"
      class="h-full"
    />
  </div>
</template>

<script lang="ts" setup>
import CurrencyCardLoader from "~/components/CurrencyCardLoader.vue";
import FilterInput from "~/components/FilterInput.vue";
</script>
