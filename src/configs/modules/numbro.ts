// @ts-expect-error numbro 中文语言包
import locale from 'numbro/languages/zh-CN.js'

numbro.registerLanguage(locale)
numbro.setLanguage('zh-CN')

if (import.meta.env.DEV)
  Object.assign(window, { numbro })
