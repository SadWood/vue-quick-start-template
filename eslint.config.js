import antfu from '@antfu/eslint-config'

export default antfu(
  {
    vue: true,
    typescript: true,
    formatters: {
      css: 'prettier',
      html: 'prettier',
      markdown: 'prettier',
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
)
