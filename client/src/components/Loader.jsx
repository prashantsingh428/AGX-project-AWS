import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = ({ onComplete }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        
        const hasLoaded = sessionStorage.getItem('hasLoaded');

        if (hasLoaded) {
            onComplete();
            return;
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('hasLoaded', 'true');
            if (onComplete) onComplete();
        }, 3500); 

        return () => clearTimeout(timer);
    }, [onComplete]);

    
    if (sessionStorage.getItem('hasLoaded')) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712] overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <div className="absolute inset-0 pointer-events-none opacity-50">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-8"
                        >
                            <span className="text-xl md:text-2xl text-primary/80 font-light tracking-widest uppercase">
                                Introducing
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
                            className="text-5xl md:text-8xl font-bold tracking-tighter text-white"
                        >
                            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                AI Growth
                            </span>
                            <span className="text-white">Exa</span>
                        </motion.h1>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100px" }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                            className="h-1 bg-gradient-to-r from-primary to-purple-500 mt-6 rounded-full"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
