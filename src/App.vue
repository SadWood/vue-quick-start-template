<script setup lang="ts">
console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss a')}好，旅行者！`)
</script>

<template>
  <header
    class="max-h-screen leading-normal lg:flex lg:items-center lg:pr-20"
  >
    <img
      alt="Vue logo"
      class="lg:mr-8"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    >
    <div class="lg:flex lg:flex-wrap lg:place-items-start">
      <HelloWorld msg="You did it!" />
      <nav
        class="mt-8 w-full text-center text-xs lg:-ml-4 lg:mt-4 lg:px-0 lg:py-4 lg:text-left lg:text-base [&_a.router-link-exact-active:hover]:bg-transparent [&_a.router-link-exact-active]:text-vue-text [&_a:first-of-type]:border-0 [&_a]:inline-block [&_a]:border-0 [&_a]:border-l [&_a]:border-solid [&_a]:border-vue-border [&_a]:px-4 [&_a]:py-0"
      >
        <RouterLink to="/">
          Home
        </RouterLink>
        <RouterLink to="/about">
          About
        </RouterLink>
        <RouterLink to="/echarts">
          Echarts
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
