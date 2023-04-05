<template>
  <div class="group relative cursor-pointer">
    <div
      class="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-0 blur transition duration-500 group-hover:opacity-75"
    ></div>
    <div
      class="flex-grow-1 relative flex h-full w-full flex-col rounded-md bg-white p-4 shadow-lg"
    >
      <div class="flex gap-1">
        <div class="grow">
          <h2 class="text-xl font-bold">{{ currency.name }}</h2>
          <h3 class="grow text-sm font-bold">Price: {{ priceFormatted }}</h3>
        </div>
        <img
          class="h-10 w-10"
          :src="`/public/img/svg-crypto-logos/${currency.symbol.toLowerCase()}.svg`"
          alt="Bitcoin Logo"
        />
      </div>
      <div class="mt-4 flex justify-end">
        <div class="flex w-10 justify-center">
          <img src="/img/chevron-right.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ currency: ICurrency }>();
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const priceFormatted = computed(() =>
  formatter.format(props.currency.quote["USD"].price)
);
</script>
