<template>
  <div class="flex h-full flex-col items-center justify-center">
    <img src="/img/data/error.svg" alt="No currencies found" class="w-96" />
    <h1 class="mt-5 text-2xl font-bold">Loading Error Occurred</h1>
    <button
      type="button"
      class="mt-3 rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
      @click="$emit('reload-data')"
    >
      Reload data
    </button>
  </div>
</template>

<script lang="ts" setup>
defineEmits(["reload-data"]);
</script>
