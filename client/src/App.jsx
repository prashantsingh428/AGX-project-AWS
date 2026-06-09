import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { AuthProvider } from './context/AuthContext';
import Notification from './components/Notification';


function App() {
    return (
        <ThemeProvider>
            <NotificationProvider>
                <AuthProvider>
                    <AppRoutes />
                    <Notification />
                    <Analytics />
                </AuthProvider>
            </NotificationProvider>
        </ThemeProvider>
    );
}


export default App;
