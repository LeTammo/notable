import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import CreateNote from './components/CreateNote';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Register from './components/auth/Register';

function App() {
    const {
        isAuthenticated,
        accentColor,
        darkMode,
        setDarkMode,
        setAccentColor,
        handleLogout
    } = useAuth();

    return (
        <Router>
            <div className="absolute top-0 w-full">
                <Header accentColor={accentColor}
                        handleLogout={handleLogout}
                        isAuthenticated={isAuthenticated}
                />
            </div>
            <main className="flex flex-col min-h-screen justify-center items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Routes>
                        <Route path="/"
                               element={isAuthenticated
                                   ? <Navigate to="/dashboard"/>
                                   : <Navigate to="/login"/>}
                        />
                        <Route path="/register"
                               element={<Register accentColor={accentColor}/>}
                        />
                        <Route path="/login"
                               element={isAuthenticated
                                   ? <Navigate to="/dashboard"/>
                                   : <Login accentColor={accentColor}/>}
                        />
                        <Route path="/dashboard"
                               element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                                   <Dashboard accentColor={accentColor}/></ProtectedRoute>}/>
                        <Route path="/create"
                               element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                                   <CreateNote accentColor={accentColor}/></ProtectedRoute>}/>
                    </Routes>
                </div>
            </main>
            <div className="absolute bottom-0 right-0">
                <Footer darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        accentColor={accentColor}
                        setAccentColor={setAccentColor}
                />
            </div>
        </Router>
    );
}

export default App;