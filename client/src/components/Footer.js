import React from 'react';
import {getAccentClass} from "./utilities";
import DarkModeToggle from "./DarkModeToggle";
import axios from "axios";

const accentColors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'indigo', 'gray', 'teal', 'orange', 'emerald', 'lime', 'rose', 'fuchsia', 'violet', 'sky'];

const Header = ({ darkMode, setDarkMode, accentColor, setAccentColor }) => {
    const handleColorChange = async (color) => {
        localStorage.setItem('accentColor', color);
        setAccentColor(color);

        let token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.post('http://localhost:5000/preferences/accent-color', { accent_color: color }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    return (
        <header className={`p-4 flex justify-center items-center w-full`}>
            <div className="flex flex-row items-center">
                {accentColors.map((color) => (
                    <div
                        style={{width: '20px', height: '20px'}}
                        key={color}
                        className={`m-auto ${getAccentClass(color, 'background')} rounded-full mr-2 cursor-pointer ${color === accentColor ? 'border-2 border-white' : ''}`}
                        onClick={() => handleColorChange(color)}
                    ></div>
                ))}
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode}/>
            </div>
        </header>
    );

};

export default Header;