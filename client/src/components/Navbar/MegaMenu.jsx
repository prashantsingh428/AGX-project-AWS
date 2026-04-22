import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const MegaMenu = ({ name, data, items, isOpen, onClose, onMouseEnter }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] z-40 overflow-hidden"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onClose}
        >
            <div className="max-w-[1600px] mx-auto px-12 py-12">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Column - Dynamic Content */}
                    <div className="lg:col-span-5 space-y-8 border-r border-gray-50 pr-16 text-left">
                        <div className="space-y-4">
                            <h3 className="text-4xl font-bold text-gray-900 leading-tight">
                                {data?.title || name}
                            </h3>
                            <p className="text-lg text-gray-500 leading-relaxed max-w-sm">
                                {data?.description || "Explore our comprehensive suite of solutions tailored for the next generation of digital growth."}
                            </p>
                        </div>

                        {data?.ctaText && (
                            <Link
                                to={data.ctaPath || "#"}
                                onClick={onClose}
                                className="group inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all"
                            >
                                {data.ctaText}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        )}
                    </div>

                    {/* Right Column - Navigation Links */}
                    <div className="lg:col-span-7 py-1">
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-left">
                            {items && items.map((item, idx) => (
                                <Link
                                    key={idx}
                                    to={item.path}
                                    onClick={onClose}
                                    className="group block transition-all duration-200"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[17px] font-bold text-gray-900 group-hover:text-primary transition-colors">
                                            {item.name}
                                        </span>
                                        <ChevronRight className="w-4 h-4 text-gray-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary transition-all" />
                                    </div>
                                    {item.description && (
                                        <p className="text-sm text-gray-500 leading-normal group-hover:text-gray-600 transition-colors">
                                            {item.description}
                                        </p>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Bottom Bar in Right Col */}
                        <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                                    AI Growth Exa Intel
                                </p>
                            </div>
                            <Link to="/contact" onClick={onClose} className="text-[12px] font-bold text-primary hover:underline underline-offset-4 uppercase tracking-wider">
                                Request a Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MegaMenu;
