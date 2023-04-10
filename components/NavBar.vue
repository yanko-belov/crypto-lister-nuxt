<template>
  <nav class="border-gray-200 bg-white">
    <div
      class="container mx-auto flex flex-wrap items-center justify-between p-4"
    >
      <NuxtLink to="/" class="flex items-center" data-testid="nav-logo-link">
        <img src="/img/logo.svg" class="mr-3 h-8" alt="CryptoLister" />
        <span class="self-center whitespace-nowrap text-2xl font-semibold">
          CryptoLister
        </span>
      </NuxtLink>
      <button
        type="button"
        class="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
        data-testid="nav-burger-menu-button"
        @click="toggleMenu"
      >
        <span class="sr-only">Open main menu</span>
        <img class="h-5 w-5" src="/img/icons/burger-menu.svg" alt="Menu" />
      </button>
      <div class="w-full md:block md:w-auto" :class="{ hidden: !isMenuOpen }">
        <ul
          class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0"
        >
          <li>
            <NuxtLink to="/" class="nav-link" data-testid="nav-home-link">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/favorites"
              class="nav-link"
              data-testid="nav-favorites-link"
            >
              <div class="flex gap-2">
                <span>Favorites</span>
                <FavoritesCounterIndicator />
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const route = useRoute();

const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const closeMenu = () => (isMenuOpen.value = false);

watch(() => route.fullPath, closeMenu);
</script>

<style lang="scss" scoped>
.nav-link {
  @apply block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-red-700;

  &.router-link-active {
    @apply block rounded bg-red-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-red-700;
  }
}
</style>
