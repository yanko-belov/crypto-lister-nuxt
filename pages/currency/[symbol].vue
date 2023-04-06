<template>
  <CurrencyOverviewLoader v-if="store.isLoading" />
  <CurrencyOverview v-else-if="hasValidCurrency" :symbol="symbol" />
  <LoadingError v-else>
    <template #title>
      No currency is found with the symbol
      <span class="font-bold text-red-500">{{ routesSymbol }}</span>
    </template>
    <template #cta>
      <button
        type="button"
        class="mt-3 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
        @click="goHome"
      >
        Go back
      </button>
    </template>
  </LoadingError>
</template>

<script lang="ts" setup>
import { useCurrency } from "~/composables/currency";
import { useCurrencyStore } from "~/store/currencyStore";

const store = useCurrencyStore();
const router = useRouter();
const routesSymbol = computed(
  (): string => (router.currentRoute.value.params?.symbol as string) || ""
);

const { currency, hasValidCurrency, symbol } = useCurrency(routesSymbol.value);

const goHome = () => router.push("/");
</script>
1
