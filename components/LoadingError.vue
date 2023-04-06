<template>
  <div class="flex h-full flex-col items-center justify-center">
    <img src="/img/data/error.svg" alt="No currencies found" class="w-96" />
    <h1 class="mt-5 text-2xl font-bold">
      <slot name="title">Loading Error Occurred</slot>
    </h1>
    <slot name="cta" />
  </div>
</template>
