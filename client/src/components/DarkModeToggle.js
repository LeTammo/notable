import React from 'react';
import classNames from 'classnames';
import axios from "axios";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
    const toggleDarkMode = async () => {
        localStorage.setItem('darkMode', JSON.stringify(!darkMode));
        setDarkMode(!darkMode);

        let token = localStorage.getItem('token');
        if (!token) return;

        try {
            await axios.post('http://localhost:5000/preferences/dark-mode', { dark_mode: !darkMode }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    return (
        <div className={classNames('tdnn scale-item', {day: !darkMode})} onClick={toggleDarkMode}>
            <div className={classNames('moon', {sun: !darkMode})}></div>
        </div>
    );
};

export default DarkModeToggle;