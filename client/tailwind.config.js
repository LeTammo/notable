import { colors } from "./src/components/utilities/colors";

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
  safelist: colors.flatMap(color => [
    `bg-${color}-400`,
    `dark:bg-${color}-400`,
    `hover:bg-${color}-300`,
    `dark:hover:bg-${color}-400`,
    `text-${color}-500`,
    `dark:text-${color}-400`,
  ]),
};