import 'dayjs/locale/zh-cn'
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

// 插件示例
// dayjs.extend(isSameOrBefore)
// 设置中文
dayjs.locale('zh-cn')

if (import.meta.env.DEV) {
  // @ts-expect-error 增加开发环境的 dayjs 全局变量
  globalThis.dayjs = dayjs
}
