const colors = [
  'red', 'blue', 'green', 'yellow', 'pink',
  'cyan', 'purple', 'indigo', 'gray', 'teal',
  'orange', 'emerald', 'lime', 'rose', 'fuchsia',
  'violet', 'sky'
];

const accentColors = colors.map((color) => ({
  bg: `bg-${color}-300`,
  hover: `hover:bg-${color}-400`,
  text: `text-${color}-300`
}));

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
  safelist: accentColors.flatMap(color => [color.bg, color.hover, color.text]),
};