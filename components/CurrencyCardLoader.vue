<template>
  <div
    class="flex-grow-1 relative flex h-full w-full animate-pulse flex-col justify-between rounded-md bg-white p-4 shadow-lg"
    data-testid="currency-loader-card"
  >
    <div class="flex gap-1">
      <div class="grow pt-2">
        <div class="mb-4 h-2.5 w-20 rounded-full bg-gray-200" />

        <div class="mb-2.5 h-2 w-28 rounded-full bg-gray-200" />
      </div>
      <div
        class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300"
      >
        <img
          class="h-6 w-6"
          src="/img/icons/image-placeholder.svg"
          alt="Image"
        />
      </div>
    </div>
    <div class="mt-4 flex items-center justify-between">
      <div class="mb-2.5 h-2 max-w-[20px] rounded-full bg-gray-200" />
      <div class="mb-2.5 h-2 max-w-[20px] rounded-full bg-gray-200" />
    </div>
  </div>
</template>
<script setup></script>
