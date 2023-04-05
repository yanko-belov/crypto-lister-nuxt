<template>
  <nav class="border-gray-200 bg-white">
    <div
      class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
    >
      <NuxtLink to="/" class="flex items-center">
        <img src="/img/logo.svg" class="mr-3 h-8" alt="CryptoLister" />
        <span class="self-center whitespace-nowrap text-2xl font-semibold">
          CryptoLister
        </span>
      </NuxtLink>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div id="navbar-default" class="hidden w-full md:block md:w-auto">
        <ul
          class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0"
        >
          <li>
            <NuxtLink to="/" class="nav-link" aria-current="page">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/favorites" class="nav-link">
              <div class="flex gap-2">
                <span>Favorites</span>
                <div
                  class="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900"
                >
                  {{ store.favorites.length }}
                </div>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCurrencyStore } from "~/store/currencyStore";

const store = useCurrencyStore();
</script>

<style lang="scss" scoped>
.nav-link {
  @apply block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-red-700;

  &.router-link-active {
    @apply block rounded bg-red-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-red-700;
  }
}
</style>
