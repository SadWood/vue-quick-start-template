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

import type { Config } from 'tailwindcss'

async function generateFontFamily(dir: string, prefix?: string): Promise<Record<string, string[]>> {
  const files = await fs.promises.readdir(dir, { withFileTypes: true })
  const fontFiles: Record<string, string[]> = {}

  await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file.name)

      if (file.isDirectory()) {
        const subFonts = await generateFontFamily(filePath, file.name)
        Object.assign(fontFiles, subFonts)
      }
      else if (file.isFile() && isValidFontFile(file)) {
        const name = generateFileName(file, prefix)
        fontFiles[name.toLowerCase()] = [name]
      }
    }),
  )

  return fontFiles
}

function getCollections(dir: string) {
  // Import icons
  const iconSet = importDirectorySync(dir, {
    includeSubDirs: false,
  })

  // Validate, clean up, fix palette and optimise
  iconSet.forEachSync((name, type) => {
    if (type !== 'icon')
      return

    const svg = iconSet.toSVG(name)
    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimise icons
    try {
      // Clean up icon code
      cleanupSVG(svg)

      // Change color to `currentColor`
      // Skip this step if icon has hardcoded palette
      const blackColor = stringToColor('black')!
      const whiteColor = stringToColor('white')!
      parseColors(svg, {
        defaultColor: 'currentColor',
        callback: (attr, colorStr, color) => {
          if (!color) {
            // Color cannot be parsed!
            throw new Error(`Invalid color: "${colorStr}" in attribute ${attr}`)
          }

          if (isEmptyColor(color)) {
            // Color is empty: 'none' or 'transparent'. Return as is
            return color
          }

          // Change black to 'currentColor'
          if (compareColors(color, blackColor))
            return 'currentColor'

          // Remove shapes with white color
          if (compareColors(color, whiteColor))
            return 'remove'

          // Icon is not monotone
          return color
        },
      })

      // Optimise
      runSVGO(svg)
    }
    catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err)
      iconSet.remove(name)
      return
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })

  // Export
  return iconSet.export()
}

export default {
  theme: {
    extend: {
      fontFamily: {
        ...(await generateFontFamily('./src/fonts')),
      },
    },
  },
  plugins: [
    // example: i-vue-logo
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
    // example: icon-[heroicons--check-solid]
    dynamicIconsPlugin({
      prefix: 'iconify',
      extraProperties: {
        display: 'inline-block',
        verticalAlign: 'middle',
      },
    }),
  ],
} satisfies Config
