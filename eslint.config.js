import antfu from '@antfu/eslint-config'
// import { FlatCompat } from '@eslint/eslintrc'
import pluginQuery from '@tanstack/eslint-plugin-query'
// import tailwind from 'eslint-plugin-tailwindcss'

// const compat = new FlatCompat()

export default antfu(
  {
    vue: true,
    typescript: true,
    formatters: {
      css: 'prettier',
      html: 'prettier',
      markdown: 'prettier',
      prettierOptions: {
        useTabs: false,
        tabWidth: 2,
        endOfLine: 'lf',
        singleQuote: true,
        semi: false,
      },
    },
    rules: {
      'import/order': ['error', {
        'newlines-between': 'always',
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'pathGroupsExcludedImportTypes': ['type'],
        'alphabetize': {
          order: 'asc',
        },
      }],
      'no-console': 'off', // 关闭规则，在打包时会自动删除，开发环境可用
      'no-debugger': 'off', // 同上
      'vue/html-self-closing': ['warn', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
      'perfectionist/sort-imports': 'off',
    },
  },
  {
    plugins: {
      '@tanstack/query': pluginQuery,
    },
  },
  // {...tailwind.configs["flat/recommended"]},
  // ...compat.config({
  // extends: [
  //   'plugin:tailwindcss/recommended',
  //   'plugin:@tanstack/eslint-plugin-query/recommended',
  // ],
  //   plugins: {
  //     '@tanstack/query': pluginQuery,
  //   },
  //   rules: {
  //     // 关闭禁用自定义类名
  //     'tailwindcss/no-custom-classname': 'off',
  //   },
  // }),
)
