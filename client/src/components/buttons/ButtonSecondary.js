import React from 'react';
import useResolveAccentColor from "../../hooks/useResolveAccentColor";

const FormSubmit = ({ text }) => {
    const backgroundColor = useResolveAccentColor('background');

    return (
        <button
            type="submit"
            className={`
                w-full
                p-2
                ${backgroundColor}
                text-black
                font-bold
                rounded transition
            `}>{text}</button>
    );
}

export default FormSubmit;