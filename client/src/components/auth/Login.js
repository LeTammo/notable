import React, { useState } from 'react';
import axios from 'axios';
import Submit from "../forms/Submit";
import InputText from "../forms/InputText";
import useResolveAccentColor from "../../hooks/useResolveAccentColor";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const textColor = useResolveAccentColor('text');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/login', { username, password });
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            window.location.href = '/dashboard';
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-2xl mb-4">Log in to Notable</h1>
            <form onSubmit={handleLogin}>
                <InputText placeholder="Username"
                           value={username}
                           setValue={setUsername}
                           required />
                <InputText placeholder="Password"
                           value={password}
                           setValue={setPassword}
                           required />
                <Submit text="Log in" />
            </form>
            <div className="mt-4 text-center">
                <div>Don't have an account?</div>
                <div className={`${textColor}`}><a href="/auth/Register">Register here</a></div>
            </div>
        </div>
    );
};

export default Login;