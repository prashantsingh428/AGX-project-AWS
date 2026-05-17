import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import Notification from './components/Notification';
import ChatWidget from './components/ChatWidget';


function App() {
    return (
        <ThemeProvider>
            <NotificationProvider>
                <AppRoutes />
                <Notification />
                <ChatWidget />
                <Analytics />
            </NotificationProvider>
        </ThemeProvider>
    );
}


export default App;
