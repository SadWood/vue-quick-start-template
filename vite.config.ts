import { URL, fileURLToPath } from 'node:url'

// import legacy from '@vitejs/plugin-legacy'
import http2Proxy from '@cpsoinos/vite-plugin-http2-proxy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dayjs from 'dayjs'
import AutoImport from 'unplugin-auto-import/vite'
import InlineEnum from 'unplugin-inline-enum/vite'
import TurboConsole from 'unplugin-turbo-console/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
// import VueDevTools from 'vite-plugin-vue-devtools'

import { version } from './package.json'

export default defineConfig(({ command }) => {
  // 构建前全量引入，构建后按需引入
  const ComponentsResolver
    = command === 'build'
      ? [
          TDesignResolver({
            library: 'vue-next',
            esm: true,
            // 排除Plugin，使用 $ 开头的变量
            exclude: /.*Plugin$/,
          }),
        ]
      : []

  return {
    base: './',
    plugins: [
      mkcert({
        source: 'coding',
      }),
      http2Proxy({ quiet: true }),
      VueRouter({
        dts: './src/typed-router.d.ts',
        // 禁止扫描 components 目录
        exclude: ['**/components/**/*.vue'],
      }),
      vue(),
      vueJsx({ transformOn: true }),
      // TODO: 启用 VueDevTools 会导致在使用 $message 等全局变量时，无法切换路由
      // VueDevTools(),
      InlineEnum({ scanMode: 'git' }),
      // legacy({ modernPolyfills: true, renderLegacyChunks: false }),
      TurboConsole(),
      AutoImport({
        dts: './src/auto-imports.d.ts',
        injectAtEnd: true,
        imports: [
          'vue',
          'pinia',
          'vitest',
          '@vueuse/core',
          {
            ...VueRouterAutoImports,
            'numbro': [['default', 'numbro']],
            'radash': [['*', '_']],
            '@/plugins/dayjs': [['default', 'dayjs']],
            /**
             * 添加 ECharts 部分组件，当前添加但项目中未使用的组件不会被打包
             * 如果需要其他组件，可以自行添加
             */
            'echarts/core': ['use', 'graphic', 'registerTheme', 'registerMap'],
            'echarts/renderers': ['SVGRenderer', 'CanvasRenderer'],
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
            // 重命名为以 $ 开头的全局变量
            'tdesign-vue-next': [
              ['MessagePlugin', '$message'],
              ['NotifyPlugin', '$notify'],
              ['LoadingPlugin', '$loading'],
              ['DialogPlugin', '$dialog'],
            ],
            '@tanstack/vue-query': [
              'useQueryClient',
              'useQuery',
              'useMutation',
              'keepPreviousData',
            ],
          },
        ],
        vueTemplate: true,
        resolvers: [
          ...ComponentsResolver,
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
        dts: './src/components.d.ts',
        resolvers: [
          ...ComponentsResolver,
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
    optimizeDeps: {
      // 避免因为发现新的依赖项而触发新的公共 chunk 生成，从而需要刷新整个页面。
      holdUntilCrawlEnd: false,
      // 强制预构建链接的包
      include: [
        'dayjs',
        'numbro',
        'radash',
        '@vueuse/core',
        'tdesign-vue-next/esm',
        'tdesign-vue-next',
        'vue-router',
        'unplugin-vue-router/runtime',
        'unplugin-vue-router/data-loaders/basic',
        'vue-echarts',
        'echarts/core',
        'echarts/renderers',
        'echarts/charts',
        'echarts/components',
        'echarts/features',
      ],
    },
    esbuild: {
      // 打包时移除 console 和 debugger
      drop: ['console', 'debugger'],
    },
    define: {
      'import.meta.env.ENV_VERSION': JSON.stringify(version),
      'import.meta.env.APP_BUILD_TIME': JSON.stringify(
        dayjs().format('YYYY-MM-DD HH:mm:ss'),
      ),
    },
    json: {
      stringify: true,
    },
    build: {
      rollupOptions: {
        output: {
          // 将 node_modules 中的模块分包
          manualChunks: (id, { getModuleInfo }) => {
            const moduleList = [
              'radash',
              'numbro',
              'dayjs',
              'vue-echarts',
              'echarts',
              'tdesign-vue-next',
            ]

            if (id.includes('node_modules')) {
              const moduleInfo = getModuleInfo(id)
              const isCommon = moduleInfo && moduleInfo?.importers.length > 1

              return (
                moduleList.find(name => id.includes(name))
                || (isCommon ? 'common' : undefined)
              )
            }
          },
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js',
          assetFileNames: ({ name }) => {
            if (name?.endsWith('.css'))
              return 'css/[name].[hash].css'
            return 'assets/[name].[hash][extname]'
          },
        },
      },
    },
  }
})
