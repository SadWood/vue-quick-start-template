// @ts-expect-error numbro 中文语言包
import locale from 'numbro/languages/zh-CN.js'

numbro.registerLanguage(locale)
numbro.setLanguage('zh-CN')

if (import.meta.env.DEV) {
  // @ts-expect-error 增加开发环境的 numbro 全局变量
  globalThis.numbro = numbro
}
