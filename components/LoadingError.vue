<template>
  <div class="flex h-full flex-col items-center justify-center">
    <img
      src="/img/data/error.svg"
      alt="No currencies found"
      class="w-96"
      data-testid="loading-error-image"
    />
    <h1 class="mt-5 text-2xl font-bold" data-testid="loading-error-title">
      <slot name="title">Loading Error Occurred</slot>
    </h1>
    <slot name="cta" />
  </div>
</template>
