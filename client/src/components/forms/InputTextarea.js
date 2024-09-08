import React from 'react';

const InputText = ({label, placeholder, value, setValue, required}) => {
    return (
        <div>
            {label && <label>{label}</label>}
            <textarea
                value={value}
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                required={required}
                className="text-black block w-full mb-4 p-2 rounded border border-gray-300"
            />
        </div>
    );
}

export default InputText;