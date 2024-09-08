import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateNote from './components/CreateNote';
import Header from './components/Header';
import Container from './components/Container';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accentColor, setAccentColor] = useState('blue');
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Token found");
            setIsAuthenticated(true);
            fetchPreferences();
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        document.body.className = darkMode ? '' : 'light';
    }, [darkMode]);

    const fetchPreferences = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('http://localhost:5000/preferences', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDarkMode(res.data.dark_mode);
            setAccentColor(res.data.accent_color);
            document.documentElement.classList.toggle('dark', res.data.dark_mode);
        } catch (error) {
            console.error('Error fetching preferences:', error);
        }
    };

    return (
        <div>
            <Router>
                <div className="absolute top-0 w-full">
                    <Header
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        accentColor={accentColor}
                        setAccentColor={setAccentColor}
                    />
                </div>
                <div className="flex flex-col min-h-screen justify-center items-center">
                    <Container>
                        <Routes>
                            <Route path="/" element={isAuthenticated
                                ? <Navigate to="/dashboard" />
                                : <Login />} />
                            <Route path="/dashboard" element={isAuthenticated
                                ? <Dashboard accentColor={accentColor} />
                                : <Navigate to="/" />} />
                            <Route path="/create" element={isAuthenticated
                                ? <CreateNote accentColor={accentColor} />
                                : <Navigate to="/" />} />
                        </Routes>
                    </Container>
                </div>
            </Router>
        </div>
    );

}

export default App;