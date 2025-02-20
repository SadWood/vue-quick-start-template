import { dynamicIconsPlugin, iconsPlugin } from '@egoist/tailwindcss-icons'
import {
  cleanupSVG,
  importDirectorySync,
  isEmptyColor,
  parseColors,
  runSVGO,
} from '@iconify/tools'
import { compareColors, stringToColor } from '@iconify/utils/lib/colors'

import type { Config } from 'tailwindcss'

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
      colors: {
        'vue-background': 'var(-color-background)',
        'vue-background-soft': 'var(--color-background-soft)',
        'vue-background-mute': 'var(--color-background-mute)',
        'vue-border': 'var(--color-border)',
        'vue-border-hover': 'var(--color-border-hover)',
        'vue-heading': 'var(--color-heading)',
        'vue-text': 'var(--color-text)',
      },
    },
  },
  plugins: [
    // example: icon-vue-logo
    iconsPlugin({
      prefix: 'icon',
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
