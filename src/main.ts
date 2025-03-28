import { VueQueryPlugin } from '@tanstack/vue-query'
import TDesign from 'tdesign-vue-next'
import { createApp } from 'vue'

import '@/configs'
import '@/styles/main.css'
import 'tdesign-vue-next/es/style/index.css'
import 'unfonts.css'
import App from './App.vue'
import router from './router'
import store from './stores'

const app = createApp(App)

if (import.meta.env.DEV) {
  app.use(TDesign)
}

app.use(store).use(router).use(VueQueryPlugin).mount('#app')

export default app
