<template>
  <template v-if="hasCurrencies">
    <FilterInput v-model="filter" />
    <div
      class="mt-6 grid grid-cols-1 gap-6 min-[530px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <NuxtLink
        v-for="currency in currencyListFiltered"
        :key="`currency-${currency.id}`"
        :to="`currency/${currency.symbol.toLowerCase()}`"
      >
        <CurrencyCard :currency="currency" class="h-full" />
      </NuxtLink>
    </div>
  </template>
  <template v-else>
    <div class="flex h-full flex-col items-center justify-center">
      <img src="/img/data/no-data.svg" alt="No currencies found" class="w-96" />
      <h1 class="mt-5 text-2xl font-bold">
        <slot name="no-data-header">No Currencies Found</slot>
      </h1>
      <slot name="cta"></slot>
    </div>
  </template>
</template>

<script lang="ts" setup>
const filter = ref("");

const props = withDefaults(defineProps<{ currencyList: ICurrency[] }>(), {
  currencyList: [] as ICurrency[],
});

const hasCurrencies = computed(() => currencyListFiltered.value.length > 0);

const currencyListFiltered = computed(() =>
  props.currencyList.filter((currency) => {
    const name = currency.name.toLowerCase();
    const symbol = currency.symbol.toLowerCase();
    const filterValue = filter.value.toLowerCase();
    return name.includes(filterValue) || symbol.includes(filterValue);
  })
);
</script>
