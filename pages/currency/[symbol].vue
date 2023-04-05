<template>
  <div class="flex h-screen flex-col items-center justify-center bg-gray-100">
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-5xl font-bold text-gray-800">
        {{ currency.name }}
      </h1>
      <h2 class="text-2xl font-semibold text-gray-500">
        {{ currency.symbol }}
      </h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const { symbol } = router.currentRoute.value.params;

const currency = {
  id: 1,
  name: "Bitcoin",
  symbol: "BTC",
  slug: "bitcoin",
  quote: {
    USD: {
      price: 6602.60701122,
      market_cap_dominance: 51,
      fully_diluted_market_cap: 952835089431.14,
      last_updated: "2018-08-09T21:56:28.000Z",
    },
  },
};

useHead({
  title: currency.name,
});
</script>
