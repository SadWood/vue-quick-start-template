<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header
    class="max-h-screen leading-normal lg:flex lg:items-center lg:pr-[calc(var(--section-gap)/2)]"
  >
    <img
      alt="Vue logo"
      class="lg:mr-8"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    >

    <div class="wrapper lg:flex lg:flex-start lg:flex-wrap">
      <HelloWorld msg="You did it!" />

      <nav
        class="nav mt-8 w-full text-center text-xs lg:mt-4 lg:-ml-4 lg:py-4 lg:px-0 lg:text-left lg:text-base [&_a]:inline-block [&_a]:border-l-1 [&_a]:border-[var(--color-border)] [&_a]:py-0 [&_a]:px-4 [&_a.router-link-exact-active]:text-[var(--color-text)] [&_a.router-link-exact-active:hover]:bg-transparent [&_a:first-of-type]:border-0"
      >
        <RouterLink to="/">
          Home
        </RouterLink>
        <RouterLink to="/about">
          About
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
