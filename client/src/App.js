import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateNote from './components/CreateNote';
import Header from './components/Header';
import Container from './components/Container';
import Register from "./components/Register";
import Footer from "./components/Footer";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accentColor, setAccentColor] = useState('blue');
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            validateToken(token);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        document.body.className = darkMode ? '' : 'light';
    }, [darkMode]);

    const validateToken = async (token) => {
        try {
            const res = await axios.get('http://localhost:5000/auth/validate-token', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 200) {
                setIsAuthenticated(true);
                await fetchPreferences(token);
            } else {
                await handleLogout();
            }
        } catch (error) {
            console.error('Error validating token:', error);
            await handleLogout();
        }
    };

    const fetchPreferences = async (token) => {
        try {
            const res = await axios.get('http://localhost:5000/preferences', {
                headers: { Authorization: `Bearer ${token}` },
            });
            let { dark_mode, accent_color } = res.data;
            setDarkMode(dark_mode);
            setAccentColor(accent_color);
            document.documentElement.classList.toggle('dark', dark_mode);
        } catch (error) {
            console.error('Error fetching preferences:', error);
        }
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/auth/logout', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            <Router>
                <div className="absolute top-0 w-full">
                    <Header accentColor={accentColor} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
                </div>
                <div className="pt-14 flex flex-col min-h-screen justify-center items-center">
                    <Container>
                        <Routes>
                            <Route path="/" element={isAuthenticated
                                ? <Navigate to="/dashboard" />
                                : <Navigate to="/login" />} />
                            <Route path="/register" element={<Register accentColor={accentColor} />} />
                            <Route path="/login" element={isAuthenticated
                                ? <Navigate to="/dashboard" />
                                : <Login accentColor={accentColor} />} />
                            <Route path="/dashboard" element={isAuthenticated
                                ? <Dashboard accentColor={accentColor} />
                                : <Navigate to="/login" />} />
                            <Route path="/create" element={isAuthenticated
                                ? <CreateNote accentColor={accentColor} />
                                : <Navigate to="/login" />} />
                        </Routes>
                    </Container>
                </div>
                <div className="absolute bottom-0 right-0">
                    <Footer
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        accentColor={accentColor}
                        setAccentColor={setAccentColor}
                    />
                </div>
            </Router>
        </div>
    );
}

export default App;