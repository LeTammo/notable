import React, { createContext, useContext, useState } from 'react';

const PreferencesContext = createContext();

const usePreferences = () => {
    return useContext(PreferencesContext);
};

const PreferencesProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [accentColor, setAccentColor] = useState('blue');

    return (
        <PreferencesContext.Provider value={{ darkMode, setDarkMode, accentColor, setAccentColor }}>
            {children}
        </PreferencesContext.Provider>
    );
};

export { PreferencesProvider, usePreferences };