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
        rr: {
          pink: '#EA1B75',
          'pink-hover': '#FF2D8A',
          'pink-dark': '#B80D58',
          'pink-glow': 'rgba(234, 27, 117, 0.35)',
          blue: '#1E3A8A',
          'blue-light': '#3B82F6',
          navy: '#0A1128',
          dark: '#050814',
          card: '#0D1527',
          'card-hover': '#131F3A',
          border: '#1E293B',
          gold: '#FBBF24',
          cyan: '#06B6D4',
          emerald: '#10B981',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-pink': '0 0 25px -5px rgba(234, 27, 117, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glow-gold': '0 0 25px -5px rgba(251, 191, 36, 0.4)',
      }
    },
  },
  plugins: [],
}
