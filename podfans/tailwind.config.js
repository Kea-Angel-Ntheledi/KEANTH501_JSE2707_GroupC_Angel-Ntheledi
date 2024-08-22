/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          750: '#1a2638',
          800: '#1e2a3a',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [],
}