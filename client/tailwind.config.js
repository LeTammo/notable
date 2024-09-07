/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-400', 'hover:bg-red-500', 'text-red-500',
    'bg-blue-400', 'hover:bg-blue-500', 'text-blue-500',
    'bg-green-400', 'hover:bg-green-500', 'text-green-500',
    'bg-yellow-400', 'hover:bg-yellow-500', 'text-yellow-500',
    'bg-pink-400', 'hover:bg-pink-500', 'text-pink-500'
  ],
};