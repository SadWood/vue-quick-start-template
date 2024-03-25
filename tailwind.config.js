/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
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
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
