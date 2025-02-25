<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const router = useRouter()

const routes = router.getRoutes()
  .filter(route => route.name !== '404')
  .map(route => ({
    name: _.title(String(route.name)),
    path: route.path,
  }))

console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss a')}好，旅行者！`)

const isDark = ref(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

function setDarkMode(e?: MediaQueryListEvent) {
  isDark.value = e?.matches ?? isDark.value
  if (isDark.value) {
    // 设置暗色模式
    document.documentElement.setAttribute('theme-mode', 'dark')
  }
  else {
    // 重置为浅色模式
    document.documentElement.removeAttribute('theme-mode')
  }
}

onMounted(() => {
  setDarkMode()
  darkModeMediaQuery.addEventListener('change', setDarkMode)
})

onUnmounted(() => {
  darkModeMediaQuery.removeEventListener('change', setDarkMode)
})
</script>

<template>
  <header
    class="max-h-screen leading-normal lg:flex lg:items-center lg:pr-20"
  >
    <div class="i-vue-logo aspect-square size-32 lg:mr-8"></div>
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
  <VueQueryDevtools />
</template>
