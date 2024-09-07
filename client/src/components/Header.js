import React from 'react';

const accentColors = ['red', 'blue', 'green', 'yellow', 'pink'];

const Header = ({ darkMode, setDarkMode, accentColor, setAccentColor, updatePreferences }) => {
    const handleThemeToggle = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        updatePreferences({ dark_mode: newMode, accent_color: accentColor });

    };

    const handleColorChange = (e) => {
        const newColor = e.target.value;
        setAccentColor(newColor);
        updatePreferences({ dark_mode: darkMode, accent_color: newColor });
    };

    return (
        <header className={`p-4 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'} flex justify-between items-center`}>
            <h1 className="text-xl">Notable</h1>
            <div>
                <label className="mr-2">Dark Mode</label>
                <div className="tdnn">
                    <div className="moon">
                    </div>
                </div>
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={handleThemeToggle}
                />
                <label className="ml-4 mr-2">Accent Color</label>
                <select
                    value={accentColor}
                    onChange={handleColorChange}
                    className="p-2 border rounded"
                >
                    {accentColors.map(color => (
                        <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                    ))}
                </select>
            </div>
        </header>
    );
};

export default Header;