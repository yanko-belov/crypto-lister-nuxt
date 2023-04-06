<template>
  <CurrencyOverview v-if="hasValidCurrency" :currency="currency" />
</template>

<script lang="ts" setup>
import { useCurrency } from "~/composables/currency";

const route = useRoute();
const routesSymbol = computed(
  (): string => (route.params?.symbol as string) || ""
);

const { currency, hasValidCurrency } = useCurrency(routesSymbol.value);
</script>
1
