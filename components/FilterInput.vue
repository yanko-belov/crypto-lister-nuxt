<template>
  <label class="sr-only mb-2">Filter by name or symbol</label>
  <div class="relative">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <img class="h-5 w-5" src="/img/icons/search.svg" alt="Search" />
    </div>
    <input
      type="search"
      :disabled="disabled"
      class="block w-full rounded-lg border border-gray-300 p-4 pl-10 text-sm text-gray-900 focus:border-red-500 focus:ring-red-500"
      placeholder="Filter by name or symbol"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
<script lang="ts" setup>
withDefaults(defineProps<{ modelValue?: string; disabled?: boolean }>(), {
  modelValue: "",
  disabled: false,
});
defineEmits(["update:modelValue"]);
</script>
