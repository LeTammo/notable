import React from 'react';
import DarkModeToggle from "./buttons/DarkModeToggle";
import ColorChange from "./buttons/ColorChange";

const Header = ({ darkMode, setDarkMode, accentColor, setAccentColor }) => {

    return (
        <header className={`p-4 flex justify-center items-center w-full`}>
            <div className="flex flex-row items-center">
                <ColorChange accentColor={accentColor} setAccentColor={setAccentColor}/>
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
            </div>
        </header>
    );

};

export default Header;