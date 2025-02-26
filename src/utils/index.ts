import type { Dirent } from 'node:fs'
import type { CustomFontFace } from 'unplugin-fonts/types'

export function classNames(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}

/**
 * 用于处理字体的权重和名称
 */
export function transformFontGeneric(font: CustomFontFace): CustomFontFace {
  const fontWeightMap: Record<string, number> = {
    Thin: 100,
    Light: 300,
    Regular: 400,
    Normal: 400,
    Medium: 500,
    Bold: 700,
    Black: 900,
  }

  const matchedWeight = Object.entries(fontWeightMap)
    .find(([key]) => font.basename.includes(key))

  if (matchedWeight) {
    const [key, weight] = matchedWeight
    font.weight = weight
    font.name += `-${key}`
  }

  return font
}

const FONT_EXTENSION_REGEX = /\.(?:ttf|woff|woff2)$/i
/**
 * 判断是否为有效的字体文件
 */
export function isValidFontFile(file: Dirent): boolean {
  return file.isFile() && FONT_EXTENSION_REGEX.test(file.name)
}

/**
 * 生成字体文件名
 */
export function generateFileName(file: Dirent, prefix?: string) {
  const baseName = file.name.replace(/\.[^./]+$/, '')
  const namePart = baseName.split('_').pop() || ''

  return (prefix ? `${prefix}-` : '') + namePart
}
