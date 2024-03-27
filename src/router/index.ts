import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: () => import('../views/EchartsView.vue'),
    },
    {
      path: '/tailwind',
      name: 'tailwind',
      component: () => import('../views/TailwindView.vue'),
    },
    {
      path: '/tdesign',
      name: 'tdesign',
      component: () => import('../views/TDesignView.vue'),
    },
    {
      path: '/vueuse',
      name: 'vueuse',
      component: () => import('../views/VueUseView.vue'),
    },
  ],
})

export default router
