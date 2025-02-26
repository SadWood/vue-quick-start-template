import { VueQueryPlugin } from '@tanstack/vue-query'
import TDesign from 'tdesign-vue-next'
import { createApp } from 'vue'

import 'unfonts.css'
import App from './App.vue'
import router from './router'
import store from './stores'
import '@/configs'
import '@/styles/main.css'

const app = createApp(App)

if (import.meta.env.DEV) {
  app.use(TDesign)
}

app.use(store).use(router).use(VueQueryPlugin).mount('#app')

export default app
