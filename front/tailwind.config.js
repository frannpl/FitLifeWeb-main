/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        health: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Vibrant Cyan/Blue
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        wellness: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#0f172a', // Deep Slate/Black
          600: '#020617',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        surface: {
          base: '#f8fafc', // Neutral Cool Gray
          muted: '#f1f5f9', 
          card: '#ffffff',
          dark: '#020617', 
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
