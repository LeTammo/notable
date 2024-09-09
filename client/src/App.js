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
    const { isAuthenticated, handleLogout } = useAuth();

    return (
        <Router>
            <div className="sticky top-0 w-full">
                <Header handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
            </div>
            <main className="p-20 flex flex-col min-h-screen justify-center items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="p-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
                        <Routes>
                            <Route path="/"
                                   element={isAuthenticated
                                       ? <Navigate to="/dashboard"/>
                                       : <Navigate to="/login"/>}
                            />
                            <Route path="/register"
                                   element={<Register />}
                            />
                            <Route path="/login"
                                   element={isAuthenticated
                                       ? <Navigate to="/dashboard"/>
                                       : <Login />}
                            />
                            <Route path="/dashboard"
                                   element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                                       <Dashboard /></ProtectedRoute>}/>
                            <Route path="/create"
                                   element={<ProtectedRoute isAuthenticated={isAuthenticated}>
                                       <CreateNote /></ProtectedRoute>}/>
                        </Routes>
                    </div>
                </div>
            </main>
            <div className="sticky w-full bottom-0 right-0">
                <Footer />
            </div>
        </Router>
    );
}

export default App;