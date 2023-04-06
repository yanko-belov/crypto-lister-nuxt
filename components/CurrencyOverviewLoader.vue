<template>
  <div class="animate-pulse">
    <div class="mb-4 items-center justify-between sm:flex md:mt-6">
      <div class="flex items-center gap-3">
        <img
          class="h-8 w-8"
          src="/img/icons/image-placeholder.svg"
          alt="Image"
        />

        <div class="h-4 w-[200px] rounded-full bg-gray-300" />
      </div>
      <div class="h-4 w-[100px] rounded-full bg-gray-300" />
    </div>
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8"
    >
      <div class="rounded-lg bg-white p-6 shadow-xl">
        <h2 class="mb-2 text-lg font-semibold text-gray-800">Current Price</h2>
        <div class="w-25 mb-4 h-4 rounded-full bg-gray-200" />
      </div>
      <div class="rounded-lg bg-white p-6 shadow-xl">
        <h2 class="mb-2 text-lg font-semibold text-gray-800">Market Cap</h2>
        <div class="w-25 mb-4 h-4 rounded-full bg-gray-200" />
      </div>
      <div class="rounded-lg bg-white p-6 shadow-xl">
        <h2 class="mb-2 text-lg font-semibold text-gray-800">24h Volume</h2>
        <div class="w-50 mb-4 h-4 rounded-full bg-gray-200" />
      </div>
      <div class="rounded-lg bg-white p-6 shadow-xl">
        <h2 class="mb-2 text-lg font-semibold text-gray-800">
          Circulating Supply
        </h2>
        <div class="w-25 mb-4 h-4 rounded-full bg-gray-200" />
      </div>
    </div>

    <div
      class="mt-4 flex flex-wrap gap-3 rounded-lg bg-white p-6 shadow-xl md:mt-6 lg:mt-8"
    >
      <div class="flex w-full items-center space-x-2">
        <div class="h-2.5 w-32 rounded-full bg-gray-200" />
        <div class="h-2.5 w-24 rounded-full bg-gray-300" />
        <div class="h-2.5 w-32 rounded-full bg-gray-200" />
        <div class="h-2.5 w-full rounded-full bg-gray-300" />
      </div>
      <div class="flex w-full max-w-[480px] items-center space-x-2">
        <div class="h-2.5 w-full rounded-full bg-gray-200" />
        <div class="h-2.5 w-full rounded-full bg-gray-300" />
        <div class="h-2.5 w-24 rounded-full bg-gray-300" />
        <div class="h-2.5 w-full rounded-full bg-gray-200" />
      </div>
      <div class="flex w-full max-w-[400px] items-center space-x-2">
        <div class="h-2.5 w-full rounded-full bg-gray-300" />
        <div class="h-2.5 w-80 rounded-full bg-gray-200" />
        <div class="h-2.5 w-full rounded-full bg-gray-300" />
        <div class="h-2.5 w-full rounded-full bg-gray-200" />
        <div class="h-2.5 w-24 rounded-full bg-gray-300" />
      </div>
    </div>
  </div>
</template>
<script setup></script>
