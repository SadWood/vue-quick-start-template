<script setup lang="ts">
import { title } from 'radash'

const router = useRouter()

const routes = router.getRoutes().map(route => ({
  name: title(route.name as string),
  path: route.path,
}))

console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss a')}好，旅行者！`)
</script>

<template>
  <header
    class="max-h-screen leading-normal lg:flex lg:items-center lg:pr-20"
  >
    <img
      alt="Vue logo"
      class="size-32 lg:mr-8"
      src="@/assets/logo.svg"
    >
    <div class="lg:flex lg:flex-wrap lg:place-items-start">
      <HelloWorld msg="You did it!" />
      <nav
        class="mt-8 w-full divide-x divide-vue-border text-center text-xs lg:-ml-4 lg:mt-4 lg:px-0 lg:py-4 lg:text-left lg:text-base"
      >
        <RouterLink v-for="route in routes" :key="route.name" :to="route.path" class="router-link">
          {{ route.name }}
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>
