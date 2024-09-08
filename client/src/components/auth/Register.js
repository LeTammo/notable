import React, { useState } from 'react';
import axios from 'axios';
import Submit from "../forms/Submit";
import InputText from "../forms/InputText";
import { getAccentClass } from "../utilities/accentClasses";

function Register({accentColor}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/auth/register', {
                username,
                password,
            });
            localStorage.setItem('token', res.data.token);

            window.location.href = '/dashboard';
        } catch (err) {
            if (err.response && err.response.status === 409) {
                setError('Username already exists.');
            } else {
                setError('Error registering user.');
            }
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl mb-4">Create account</h1>
            <form onSubmit={handleRegister}>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <InputText accentColor={accentColor}
                           placeholder="Username"
                           value={username}
                           setValue={setUsername}
                           required />
                <InputText accentColor={accentColor}
                           placeholder="Password"
                           value={password}
                           setValue={setPassword}
                           required />
                <InputText accentColor={accentColor}
                           placeholder="Password (repeat)"
                           value={password}
                           setValue={setPassword}
                           required />
                <Submit accentColor={accentColor} text="Register"/>
            </form>
            <p className="mt-4 text-center">
                <div>Already have an account?</div>
                <div className={`${getAccentClass(accentColor, 'text')}`}><a href="/login">Log in here</a></div>
            </p>
        </div>
    );
}

export default Register;