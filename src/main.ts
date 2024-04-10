import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'

import '@/config'
import '@/styles/main.css'

import App from './App.vue'
import router from './router'
import store from './stores'

const app = createApp(App)

app.use(store).use(router).use(VueQueryPlugin).mount('#app')

export default app
