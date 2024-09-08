import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePreferences } from '../contexts/PreferencesContext';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { accentColor, setAccentColor, darkMode, setDarkMode } = usePreferences();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) validateToken(token);
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

    return { isAuthenticated, handleLogout };
};

export default useAuth;