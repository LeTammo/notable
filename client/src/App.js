import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateNote from './components/CreateNote';
import Header from './components/Header';
import Container from './components/Container';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accentColor, setAccentColor] = useState('blue'); // Default color
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log("Token found");
            setIsAuthenticated(true);
            fetchPreferences();
        }
    }, []);

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

    const updatePreferences = async (preferences) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post('http://localhost:5000/preferences', preferences, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDarkMode(preferences.dark_mode);
            setAccentColor(preferences.accent_color);
            document.documentElement.classList.toggle('dark', preferences.dark_mode);
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <Router>
                <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    accentColor={accentColor}
                    setAccentColor={setAccentColor}
                    updatePreferences={updatePreferences}
                />
                <Container>
                    <Routes>
                        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                        <Route path="/dashboard" element={isAuthenticated ? <Dashboard accentColor={accentColor} /> : <Navigate to="/" />} />
                        <Route path="/create" element={isAuthenticated ? <CreateNote accentColor={accentColor} /> : <Navigate to="/" />} />
                    </Routes>
                </Container>
            </Router>
        </div>
    );
}

export default App;