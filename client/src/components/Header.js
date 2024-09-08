import React from 'react';
import {getAccentClass} from "./utilities";
import DarkModeToggle from "./DarkModeToggle";
import axios from "axios";

const accentColors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'indigo', 'gray', 'teal', 'orange', 'emerald', 'lime', 'rose', 'fuchsia', 'violet', 'sky'];

const Header = ({ darkMode, setDarkMode, accentColor, setAccentColor }) => {
    const handleColorChange = async (color) => {
        try {
            await axios.post('http://localhost:5000/preferences/accent-color', { accent_color: color }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            setAccentColor(color);
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    return (
        <header className={`p-4 flex justify-between items-center w-full`}>
            <h1 className={`text-3xl ${getAccentClass(accentColor, 'text')}`}>Notable</h1>
            <div className="flex flex-row items-center">
                {accentColors.map((color) => (
                    <div
                        style={{ width: '20px', height: '20px' }}
                        key={color}
                        className={`m-auto ${getAccentClass(color, 'background')} rounded-full mr-2 cursor-pointer ${color === accentColor ? 'border-2 border-white' : ''}`}
                        onClick={() => handleColorChange(color)}
                    ></div>
                ))}
                <div className="header-right">
                    <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
                </div>
            </div>
        </header>
    );

};

export default Header;