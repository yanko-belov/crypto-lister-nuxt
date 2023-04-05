<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="mb-6 text-3xl font-bold">List of Cryptocurrencies</h1>
    <div
      class="grid grid-cols-1 gap-6 min-[530px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <NuxtLink
        v-for="currency in currencyList"
        :key="`currency-${currency.id}`"
        :to="`currency/${currency.symbol.toLowerCase()}`"
      >
        <CurrencyCard :currency="currency" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const currencyList = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    slug: "bitcoin",
    is_active: 1,
    is_fiat: 0,
    circulating_supply: 17199862,
    total_supply: 17199862,
    max_supply: 21000000,
    date_added: "2013-04-28T00:00:00.000Z",
    num_market_pairs: 331,
    cmc_rank: 1,
    last_updated: "2018-08-09T21:56:28.000Z",
    tags: ["mineable"],
    platform: null,
    self_reported_circulating_supply: null,
    self_reported_market_cap: null,
    quote: {
      USD: {
        price: 6602.60701122,
        volume_24h: 4314444687.5194,
        volume_change_24h: -0.152774,
        percent_change_1h: 0.988615,
        percent_change_24h: 4.37185,
        percent_change_7d: -12.1352,
        percent_change_30d: -12.1352,
        market_cap: 852164659250.2758,
        market_cap_dominance: 51,
        fully_diluted_market_cap: 952835089431.14,
        last_updated: "2018-08-09T21:56:28.000Z",
      },
    },
  },
  {
    id: 3,
    name: "Ethereum",
    symbol: "ETH",
    slug: "ethereum",
    is_active: 1,
    is_fiat: 0,
    circulating_supply: 17199862,
    total_supply: 17199862,
    max_supply: 21000000,
    date_added: "2013-04-28T00:00:00.000Z",
    num_market_pairs: 331,
    cmc_rank: 1,
    last_updated: "2018-08-09T21:56:28.000Z",
    tags: ["mineable"],
    platform: null,
    self_reported_circulating_supply: null,
    self_reported_market_cap: null,
    quote: {
      USD: {
        price: 6602.60701122,
        volume_24h: 4314444687.5194,
        volume_change_24h: -0.152774,
        percent_change_1h: 0.988615,
        percent_change_24h: 4.37185,
        percent_change_7d: -12.1352,
        percent_change_30d: -12.1352,
        market_cap: 852164659250.2758,
        market_cap_dominance: 51,
        fully_diluted_market_cap: 952835089431.14,
        last_updated: "2018-08-09T21:56:28.000Z",
      },
    },
  },
  {
    id: 2,
    name: "Solana",
    symbol: "SOL",
    slug: "solana",
    is_active: 1,
    is_fiat: 0,
    circulating_supply: 17199862,
    total_supply: 17199862,
    max_supply: 21000000,
    date_added: "2013-04-28T00:00:00.000Z",
    num_market_pairs: 331,
    cmc_rank: 1,
    last_updated: "2018-08-09T21:56:28.000Z",
    tags: ["mineable"],
    platform: null,
    self_reported_circulating_supply: null,
    self_reported_market_cap: null,
    quote: {
      USD: {
        price: 6602.60701122,
        volume_24h: 4314444687.5194,
        volume_change_24h: -0.152774,
        percent_change_1h: 0.988615,
        percent_change_24h: 4.37185,
        percent_change_7d: -12.1352,
        percent_change_30d: -12.1352,
        market_cap: 852164659250.2758,
        market_cap_dominance: 51,
        fully_diluted_market_cap: 952835089431.14,
        last_updated: "2018-08-09T21:56:28.000Z",
      },
    },
  },
];
</script>
