import tailwindColors from "tailwindcss/colors";

const excludeColors = [
    'slate',
    'gray',
    'neutral',
    'zinc',
    'stone',
    'black',
    'white',
    'transparent',
    'current',
    'inherit',
    'lightBlue',
    'warmGray',
    'trueGray',
    'coolGray',
    'blueGray',
];

const colorNames = Object.keys(tailwindColors).filter(
    (color) => !excludeColors.includes(color)
);

export const colors = colorNames;