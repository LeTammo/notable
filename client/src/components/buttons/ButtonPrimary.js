import React from 'react';
import { getAccentClass } from "../utilities/accentClasses";

const ButtonPrimary = ({ accentColor, text, onClick }) => {
    return (
        <button className={`
                    w-full
                    p-2
                    ${getAccentClass(accentColor, 'background')}
                    text-black
                    font-bold
                    rounded
                    transition
                `}
                onClick={onClick}
        >
            {text}
        </button>
    );
}

export default ButtonPrimary;