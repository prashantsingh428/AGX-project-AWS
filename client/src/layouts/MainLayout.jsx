import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';
import BackToTop from '../components/BackToTop';
import TargetCursor from '../components/TargetCursor';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-500">
            <TargetCursor 
                spinDuration={2.5}
                hideDefaultCursor={false}
                parallaxOn={true}
                hoverDuration={0.25}
                targetSelector="input[placeholder*='Search'], input[placeholder*='search'], input[type='search'], .cursor-target"
            />
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
