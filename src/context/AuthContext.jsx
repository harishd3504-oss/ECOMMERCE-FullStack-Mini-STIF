import React, { createContext, useContext, useState } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email, password) => {
        const data = await api.login({ email, password });
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return true;
    };

    const signup = async (name, email, password) => {
        const data = await api.register({ name, email, password });
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
