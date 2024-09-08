export const getAccentClass = (color, type) => {
    const validColors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'indigo', 'gray', 'teal', 'orange', 'emerald', 'lime', 'rose', 'fuchsia', 'violet', 'sky'];

    if (validColors.includes(color)) {
        switch (type) {
            case 'background':
                return `bg-${color}-300 dark:bg-${color}-400 hover:bg-${color}-500 dark:hover:bg-${color}-400`;
            case 'text':
                return `text-${color}-500 dark:text-${color}-400`;
            default:
                return '';
        }
    }
    return '';
};