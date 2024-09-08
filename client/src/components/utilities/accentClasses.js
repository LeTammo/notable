import { colors } from "./colors";

export const getAccentClass = (color, type) => {
    if (colors.includes(color)) {
        switch (type) {
            case 'background':
                return `bg-${color}-400 dark:bg-${color}-400 hover:bg-${color}-300 dark:hover:bg-${color}-400`;
            case 'text':
                return `text-${color}-500 dark:text-${color}-400`;
            default:
                return '';
        }
    }
    return '';
};