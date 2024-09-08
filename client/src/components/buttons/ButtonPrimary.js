import React from 'react';
import useResolveAccentColor from "../../hooks/useResolveAccentColor";

const ButtonPrimary = ({ text, onClick }) => {
    const backgroundColor = useResolveAccentColor('background');

    return (
        <button className={`
                    w-full
                    p-2
                    ${backgroundColor}
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