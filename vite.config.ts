import { URL, fileURLToPath } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dayjs from 'dayjs'
import AutoImport from 'unplugin-auto-import/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VitePluginMetaEnv from 'vite-plugin-meta-env'
import VueDevTools from 'vite-plugin-vue-devtools'

import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx({ transformOn: true }),
    VueDevTools(),
    VitePluginMetaEnv({
      APP_VERSION: version,
      APP_BUILD_TIME: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }, 'import.meta.env'),
    legacy({ modernPolyfills: true, renderLegacyChunks: false }),
    TurboConsole(),
    AutoImport({
      dts: true,
      injectAtEnd: true,
      imports: [
        'vue',
        'vue-router',
        'pinia',
        'vitest',
        '@vueuse/core',
        {
          'numbro': [['default', 'numbro']],
          'radash': [['*', '_']],
          '@/utils/dayjs': [['default', 'dayjs']],
          /**
           * 添加 ECharts 部分组件，当前添加但项目中未使用的组件不会被打包
           * 如果需要其他组件，可以自行添加
           */
          'echarts/core': ['use', 'graphic', 'registerTheme', 'registerMap'],
          'echarts/renderers': [
            'SVGRenderer',
            'CanvasRenderer',
          ],
          'echarts/charts': [
            'LineChart',
            'BarChart',
            'PieChart',
            'SankeyChart',
            'PictorialBarChart',
            'RadarChart',
            'GaugeChart',
            'MapChart',
            'ScatterChart',
          ],
          'echarts/components': [
            'GridComponent',
            'LegendComponent',
            'TitleComponent',
            'TooltipComponent',
            'MarkAreaComponent',
            'MarkLineComponent',
            'DataZoomComponent',
            'GraphicComponent',
            'DatasetComponent',
          ],
          'echarts/features': ['LabelLayout', 'UniversalTransition'],
          '@formkit/auto-animate/vue': ['useAutoAnimate'],
        },
      ],
      vueTemplate: true,
      resolvers: [
        TDesignResolver({ library: 'vue-next', esm: true }),
        {
          type: 'directive',
          resolve(name) {
            if (name === 'AutoAnimate') {
              return {
                from: '@formkit/auto-animate',
                name: 'vAutoAnimate',
              }
            }
          },
        },
      ],
    }),
    Components({
      dts: true,
      resolvers: [
        TDesignResolver({ library: 'vue-next', esm: true }),
        (componentName) => {
          if (componentName === 'VChart') {
            return {
              from: 'vue-echarts',
            }
          }
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  esbuild: {
    // 打包时移除 console 和 debugger
    drop: ['console', 'debugger'],
  },
  build: {
    rollupOptions: {
      output: {
        /**
         * 将一些第三方库单独打包，以便更好的利用浏览器缓存，实现更快的加载速度
         */
        manualChunks: (id) => {
          const moduleMap = {
            'radash': 'radash',
            'numbro': 'numbro',
            'dayjs': 'dayjs',
            // vue-echarts 必须在 echarts 之前，否则只会打包成 echarts
            'vue-echarts': 'vue-echarts',
            'echarts': 'echarts',
            'tdesign-vue-next': 'tdesign-vue-next',
          }

          if (id.includes('node_modules')) {
            for (const [key, value] of Object.entries(moduleMap)) {
              if (id.includes(key))
                return value
            }
          }
        },
      },
    },
  },
})
