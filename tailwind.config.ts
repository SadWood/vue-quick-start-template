import fs from 'node:fs'
import path from 'node:path'

import { dynamicIconsPlugin, iconsPlugin } from '@egoist/tailwindcss-icons'
import {
  cleanupSVG,
  importDirectorySync,
  isEmptyColor,
  parseColors,
  runSVGO,
} from '@iconify/tools'
import { compareColors, stringToColor } from '@iconify/utils/lib/colors'

import { generateFileName, isValidFontFile } from './src/utils/index'

import type { IconifyJSON } from '@iconify/types'
import type { Config } from 'tailwindcss'

/**
 * 生成字体配置
 */
async function generateFontFamily(dir: string, prefix?: string): Promise<Record<string, string[]>> {
  try {
    const files = await fs.promises.readdir(dir, { withFileTypes: true })
    const fontFiles: Record<string, string[]> = {}

    // 并行处理所有文件以提高性能
    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(dir, file.name)

        if (file.isDirectory()) {
          try {
            const subFonts = await generateFontFamily(filePath, file.name || prefix)
            Object.assign(fontFiles, subFonts)
          }
          catch (err) {
            console.error(`Error processing font directory ${filePath}:`, err)
          }
        }
        else if (file.isFile() && isValidFontFile(file)) {
          const name = generateFileName(file, prefix)
          fontFiles[name.toLowerCase()] = [name]
        }
      }),
    )

    return fontFiles
  }
  catch (error) {
    console.error(`Error generating font family from ${dir}:`, error)
    return {}
  }
}

/**
 * 获取图标集合
 */
function getCollections(dir: string): IconifyJSON {
  try {
    // 导入图标
    const iconSet = importDirectorySync(dir, {
      includeSubDirs: true, // 优化: 支持子目录以更灵活地组织图标
    })

    let processedCount = 0
    let skippedCount = 0

    // 验证、清理、修复调色板和优化
    iconSet.forEachSync((name, type) => {
      if (type !== 'icon') {
        skippedCount++
        return
      }

      const svg = iconSet.toSVG(name)
      if (!svg) {
        // 无效图标
        iconSet.remove(name)
        skippedCount++
        return
      }

      // 清理和优化图标
      try {
        // 清理图标代码
        cleanupSVG(svg)

        // 将颜色更改为 `currentColor`
        const blackColor = stringToColor('black')!
        const whiteColor = stringToColor('white')!

        parseColors(svg, {
          defaultColor: 'currentColor',
          callback: (attr, colorStr, color) => {
            if (!color) {
              // 颜色无法解析!
              throw new Error(`Invalid color: "${colorStr}" in attribute ${attr}`)
            }

            if (isEmptyColor(color)) {
              // 颜色为空: 'none' 或 'transparent'
              return color
            }

            // 将黑色更改为 'currentColor'
            if (compareColors(color, blackColor))
              return 'currentColor'

            // 移除白色形状
            if (compareColors(color, whiteColor))
              return 'remove'

            // 非单色图标
            return color
          },
        })

        // 优化
        runSVGO(svg)

        // 更新图标
        iconSet.fromSVG(name, svg)
        processedCount++
      }
      catch (err) {
        // 无效图标
        console.error(`Error processing icon ${name}:`, err)
        iconSet.remove(name)
        skippedCount++
      }
    })

    console.info(`Icons processed: ${processedCount}, skipped: ${skippedCount}`)

    // 导出
    return iconSet.export()
  }
  catch (error) {
    console.error(`Failed to process icons from ${dir}:`, error)
    // 返回空的图标集而不是抛出错误，以防止应用崩溃
    return { prefix: path.basename(dir), icons: {} }
  }
}

// 缓存字体处理结果，避免重复计算
const fontFamilyPromise = generateFontFamily('./src/fonts')

export default {
  theme: {
    extend: {
      fontFamily: {
        ...(await fontFamilyPromise),
      },
    },
  },
  plugins: [
    // 示例: i-vue-logo
    iconsPlugin({
      // prefix: 'icon',
      collections: {
        vue: getCollections('./src/icons/vue'),
      },
      extraProperties: {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    }),
    // 示例: icon-[heroicons--check-solid]
    dynamicIconsPlugin({
      prefix: 'iconify',
      extraProperties: {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    }),
  ],
} satisfies Config
