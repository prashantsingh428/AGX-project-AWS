import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            const currentToken = localStorage.getItem('token');
            if (!currentToken) {
                setUser(null);
                setToken(null);
                setLoading(false);
                return;
            }

            try {
                // Verify token and fetch latest user details
                const res = await api.get('/auth/me');
                if (res.data.success && res.data.user) {
                    setUser(res.data.user);
                    setToken(currentToken);
                    localStorage.setItem('user', JSON.stringify(res.data.user));
                } else {
                    handleLogout();
                }
            } catch (err) {
                console.error("Token verification failed:", err);
                handleLogout();
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    const handleLogin = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.token) {
                const userObj = res.data.user || { role: res.data.role };
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(userObj));
                
                setToken(res.data.token);
                setUser(userObj);
                
                // Keep the storage event for backward compatibility / other windows
                window.dispatchEvent(new Event('storage'));
                return { success: true };
            }
            return { success: false, message: "No token returned" };
        } catch (err) {
            console.error("AuthContext Login error:", err);
            const msg = err.response?.data?.message || "Login failed";
            return { success: false, message: msg };
        }
    };

    const handleGoogleLogin = (jwtToken, userObj) => {
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('user', JSON.stringify(userObj));
        setToken(jwtToken);
        setUser(userObj);
        window.dispatchEvent(new Event('storage'));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            isAuthenticated: !!token,
            login: handleLogin,
            googleLogin: handleGoogleLogin,
            logout: handleLogout,
            verifyToken: async () => {
                setLoading(true);
                try {
                    const res = await api.get('/auth/me');
                    if (res.data.success && res.data.user) {
                        setUser(res.data.user);
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                    }
                } catch {
                    handleLogout();
                } finally {
                    setLoading(false);
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
