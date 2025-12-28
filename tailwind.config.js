/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1a1a1a',
          light: '#2d2d2d',
          dark: '#0d0d0d',
        },
        paper: {
          DEFAULT: '#f5f2e8',
          light: '#faf8f2',
          dark: '#e8e4d8',
        },
        copper: {
          DEFAULT: '#c45d2c',
          light: '#d97a4a',
          dark: '#a34a1f',
        },
        steel: {
          DEFAULT: '#4a6fa5',
          light: '#6b8fc5',
          dark: '#3a5a8a',
        },
        burgundy: {
          DEFAULT: '#8b2942',
          light: '#a83d56',
          dark: '#6d1f33',
        },
        forest: {
          DEFAULT: '#2d5a3d',
          light: '#3d7a52',
          dark: '#1d3a28',
        },
      },
      fontFamily: {
        masthead: ['Playfair Display', 'Georgia', 'serif'],
        headline: ['Crimson Text', 'Times New Roman', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
