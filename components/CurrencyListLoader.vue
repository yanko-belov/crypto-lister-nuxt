<template>
  <FilterInput :disabled="true" />
  <div
    class="mt-6 grid grid-cols-1 gap-6 min-[530px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <CurrencyCardLoader
      v-for="i in 15"
      :key="`currency-card-loader-${i}`"
      class="h-full"
    />
  </div>
</template>
