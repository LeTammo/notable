export const getAccentClass = (color, type) => {
    const validColors = ['red', 'blue', 'green', 'yellow', 'pink'];

    if (validColors.includes(color)) {
        switch (type) {
            case 'background':
                return `bg-${color}-400 hover:bg-${color}-500`;
            case 'text':
                return `text-${color}-500`;
            default:
                return '';
        }
    }
    return '';
};