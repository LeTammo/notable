import React, { useState } from 'react';
import axios from 'axios';
import FormSubmit from "./FormSubmit";
import FormInputText from "./FormInputText";
import {getAccentClass} from "./utilities";

const Login = ({ accentColor }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl mb-4">Log in to Notable</h1>
            <form onSubmit={handleLogin}>
                <FormInputText accentColor={accentColor}
                               placeholder="Username"
                               value={username}
                               setValue={setUsername}
                               required />
                <FormInputText accentColor={accentColor}
                               placeholder="Password"
                               value={password}
                               setValue={setPassword}
                               required />
                <FormSubmit accentColor={accentColor} text="Log in" />
            </form>
            <div className="mt-4 text-center">
                <div>Don't have an account?</div>
                <div className={`${getAccentClass(accentColor, 'text')}`}><a href="/register">Register here</a></div>
            </div>
        </div>
    );
};

export default Login;