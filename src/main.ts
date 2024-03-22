import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import '@/config'
import '@/assets/main.css'
// 引入组件库的少量全局样式变量
// import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
