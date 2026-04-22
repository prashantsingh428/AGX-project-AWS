import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import AppRoutes from './routes/AppRoutes';
import Loader from './components/Loader';
import { ThemeProvider } from './context/ThemeContext';
import ChatWidget from './components/ChatWidget';


function App() {
    const [loading, setLoading] = useState(true);

    return (
        <ThemeProvider>
            {loading && <Loader onComplete={() => setLoading(false)} />}
            <AppRoutes />
            <ChatWidget />
            <Analytics />
        </ThemeProvider>
    );
}


export default App;
