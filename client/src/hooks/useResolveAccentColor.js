import { usePreferences } from '../contexts/PreferencesContext';
import { colors } from "../utilities/colors";

const useResolveAccentColor = (type) => {
    const { accentColor } = usePreferences();

    let classes = '';
    if (colors.includes(accentColor)) {
        switch (type) {
            case 'background':
                classes = `bg-${accentColor}-400 
                           dark:bg-${accentColor}-400 
                           hover:bg-${accentColor}-300 
                           dark:hover:bg-${accentColor}-400`;
                break;
            case 'text':
                classes = `text-${accentColor}-500 dark:text-${accentColor}-400`;
                break;
            default:
                break;
        }
    }
    return classes;
};

export default useResolveAccentColor;