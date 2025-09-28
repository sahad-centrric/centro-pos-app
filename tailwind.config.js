/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/src/**/*.{js,jsx,ts,tsx}', './src/renderer/public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#334155',
        accent: '#3b82f6'
      }
    }
  },
  plugins: []
}
