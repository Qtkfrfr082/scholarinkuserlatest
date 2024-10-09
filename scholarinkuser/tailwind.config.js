/** @type {import('tailwindcss').Config} */
export default {
  relative: true,
  content: [ "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {boxShadow: {
      'custom-green': '0 0 0 2px rgba(5, 150, 105, 0.2)',
    },},
  },
  plugins: [],
}

