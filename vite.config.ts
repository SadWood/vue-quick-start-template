import { URL, fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dayjs from 'dayjs'
import TurboConsole from 'unplugin-turbo-console/vite'
import { defineConfig } from 'vite'
import VitePluginMetaEnv from 'vite-plugin-meta-env'
import VueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx({ transformOn: true }),
    VueDevTools(),
    tailwindcss(),
    VitePluginMetaEnv({
      APP_VERSION: version,
      APP_BUILD_TIME: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }, 'import.meta.env'),
    legacy({ modernPolyfills: true, renderLegacyChunks: false }),
    TurboConsole(),
    AutoImport({
      dts: true,
      injectAtEnd: true,
      imports: ['vue', 'vue-router', 'pinia', 'vitest', '@vueuse/core', {
        numbro: [['default', 'numbro']],
        dayjs: [['*', 'dayjs']],
      }],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
