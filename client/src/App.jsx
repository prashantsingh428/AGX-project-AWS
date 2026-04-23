import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider } from './context/ThemeContext';
import ChatWidget from './components/ChatWidget';


function App() {
    return (
        <ThemeProvider>
            <AppRoutes />
            <ChatWidget />
            <Analytics />
        </ThemeProvider>
    );
}


export default App;
