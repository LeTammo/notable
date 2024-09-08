import React from 'react';
import useResolveAccentColor from "../hooks/useResolveAccentColor";

const Header = ({ handleLogout, isAuthenticated }) => {
    const textColor = useResolveAccentColor('text');

    return (
        <header className={`p-4 flex justify-between items-center w-full`}>
            <a href="/">
                <h1 className={`text-4xl font-bold ${textColor}`}>Notable</h1>
            </a>
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