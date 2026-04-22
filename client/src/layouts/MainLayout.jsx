import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';
import BackToTop from '../components/BackToTop';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-500">
            <Navbar />

            <SmoothScroll>
                <main className="flex-grow">
                    {children}
                </main>

                <Footer />
                <BackToTop />
            </SmoothScroll>
        </div>
    );
};

export default MainLayout;
