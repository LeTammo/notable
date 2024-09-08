import React, { useState } from 'react';
import axios from 'axios';
import Submit from "../forms/Submit";
import InputText from "../forms/InputText";
import useResolveAccentColor from "../../hooks/useResolveAccentColor";

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const textColor = useResolveAccentColor('text');

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
        <div>
            <h1 className="text-2xl mb-4">Create account</h1>
            <form onSubmit={handleRegister}>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <InputText placeholder="Username"
                           value={username}
                           setValue={setUsername}
                           required />
                <InputText placeholder="Password"
                           value={password}
                           setValue={setPassword}
                           required />
                <InputText placeholder="Password (repeat)"
                           value={password}
                           setValue={setPassword}
                           required />
                <Submit text="Register"/>
            </form>
            <p className="mt-4 text-center">
                <div>Already have an account?</div>
                <div className={`${textColor}`}><a href="/login">Log in here</a></div>
            </p>
        </div>
    );
}

export default Register;