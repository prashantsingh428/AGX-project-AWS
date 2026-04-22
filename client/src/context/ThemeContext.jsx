import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }, [theme]);

    const toggleTheme = () => {
        setTheme('light');
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
