import React from 'react';
import { getAccentClass } from "../utilities/accentClasses";

const Submit = ({ accentColor, text }) => {
    return (
        <button
            type="submit"
            className={`
                w-full
                p-2
                ${getAccentClass(accentColor, 'background')}
                text-black
                font-bold
                rounded transition
            `}>{text}</button>
    );
}

export default Submit;