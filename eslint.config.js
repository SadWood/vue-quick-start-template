import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

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
    },
  },
  ...compat.config({
    extends: [
      'plugin:tailwindcss/recommended',
      // Other extends...
    ],
    rules: {
      // 允许tailwindcss以外的自定义类名
      'tailwindcss/no-custom-classname': 'off',
    },
  }),
)
