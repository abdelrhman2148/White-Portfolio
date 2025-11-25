/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'terminal-black': '#0a0a0a',
        'terminal-green': '#00ff41',
        'accent-blue': '#2563EB',
        'accent-dark': '#0F172A',
      }
    },
  },
  plugins: [],
}