import React from 'react';
import DarkModeToggle from "./buttons/DarkModeToggle";
import ColorChange from "./buttons/ColorChange";

const Header = () => {

    return (
        <header className={`p-4 flex justify-center items-center w-full`}>
            <div className="flex flex-row items-center">
                <ColorChange />
                <DarkModeToggle />
            </div>
        </header>
    );

};

export default Header;