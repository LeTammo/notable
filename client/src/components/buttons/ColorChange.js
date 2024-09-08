import React from 'react';
import axios from "axios";
import { getAccentClass } from "../utilities/accentClasses";
import { colors } from "../utilities/colors";

const ColorChange = ({ accentColor, setAccentColor }) => {
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
        colors.map((color) => (
            <div
                style={{width: '20px', height: '20px'}}
                key={color}
                className={`m-auto ${getAccentClass(color, 'background')} rounded-full mr-2 cursor-pointer ${color === accentColor ? 'border-2 border-white' : ''}`}
                onClick={() => handleColorChange(color)}
            ></div>
        ))
    );
};

export default ColorChange;