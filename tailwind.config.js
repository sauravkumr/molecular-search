/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          100: '#FFFDD0',
          200: '#FFFACD',
          300: '#FFF8DC',
          400: '#FFF5E1',
        },
        teal: {
          600: '#319795',
          500: '#38b2ac',
          700: '#2c7a7b',
        },
        purple: {
          600: '#6b46c1',
          700: '#553c9a',
        },
        orange: {
          600: '#dd6b20',
        },
        gray: {
          600: '#4a5568',
          700: '#2d3748',
          900: '#1a202c',
        },
      },
      fontFamily: {
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
