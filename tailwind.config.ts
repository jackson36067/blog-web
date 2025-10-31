import lineClamp from '@tailwindcss/line-clamp'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 手动控制 dark 模式
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [lineClamp],
}
