import { URL, fileURLToPath } from 'node:url'

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dayjs from 'dayjs'
import AutoImport from 'unplugin-auto-import/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VitePluginMetaEnv from 'vite-plugin-meta-env'
// import { ElementPlusResolver, TDesignResolver } from 'unplugin-vue-components/resolvers'
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
           * 添加 ECharts 部分组件，未在echarts.ts中使用的组件不会被打包
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
          ],
          'echarts/features': ['LabelLayout', 'UniversalTransition'],
          '@formkit/auto-animate/vue': ['useAutoAnimate'],
        },
      ],
      vueTemplate: true,
      resolvers: [
        // ElementPlusResolver(),
        // TDesignResolver({ library: 'vue-next' }),
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
        // ElementPlusResolver(),
        // TDesignResolver({ library: 'vue-next' }),
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
         * 如果未使用到的库，可以注释掉，以免生成空文件
         */
        manualChunks: {
          'radash': ['radash'],
          'numbro': ['numbro'],
          'dayjs': ['dayjs'],
          'echarts': ['echarts'],
          'vue-echarts': ['vue-echarts'],
        },
      },
    },
  },
})
