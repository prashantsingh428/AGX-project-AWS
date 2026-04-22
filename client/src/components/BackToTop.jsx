import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top coordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    className="fixed bottom-28 right-10 z-[100]"
                >                    <motion.button
                        onClick={scrollToTop}
                        initial={{ borderColor: 'rgba(29,52,97,0.2)' }}
                        animate={{ 
                            borderColor: ['rgba(29,52,97,0.2)', 'rgba(59,130,246,0.6)', 'rgba(29,52,97,0.2)']
                        }}
                        transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="group flex items-center bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] rounded-full border border-primary/20 overflow-hidden transition-all duration-300 hover:shadow-[0_15px_50px_rgba(29,52,97,0.15)] hover:-translate-y-1 w-auto min-w-fit"
                    >
                        {/* Text Part */}
                        <div className="pl-5 pr-3 py-2.5 border-r border-primary/10 flex-shrink-0">
                            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-primary whitespace-nowrap">
                                Back to top
                            </span>
                        </div>
                        
                        {/* Icon Part */}
                        <div className="px-3.5 py-2.5 bg-primary text-white flex-shrink-0 flex items-center justify-center">
                            <ChevronUp size={16} strokeWidth={3} className="transition-transform group-hover:-translate-y-1" />
                        </div>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
