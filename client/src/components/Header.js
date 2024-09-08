import React from 'react';
import { getAccentClass } from "./utilities/accentClasses";

const Header = ({ accentColor, handleLogout, isAuthenticated }) => {
    return (
        <header className={`p-4 flex justify-between items-center w-full`}>
            <h1 className={`text-3xl ${getAccentClass(accentColor, 'text')}`}>Notable</h1>
            {isAuthenticated && (
                <button className="small bg-gray-400 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-500 text-xs font-medium text-white px-2 py-1 rounded"
                        onClick={handleLogout}>
                    Logout
                </button>
            )}
        </header>
    );

};

export default Header;