import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const MegaMenu = ({ name, data, items, isOpen, onClose, onMouseEnter }) => {
    const [activeItem, setActiveItem] = React.useState(items ? items[0] : null);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 w-full bg-white text-gray-900 border-b border-gray-100 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] z-40 overflow-hidden"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onClose}
        >
            <div className="max-w-[1600px] mx-auto px-12 py-16">
                <div className="grid lg:grid-cols-12 gap-0">
                    {/* Left Column - Hero Content (4/12) */}
                    <div className="lg:col-span-4 space-y-10 border-r border-gray-50 pr-16 text-left">
                        <div className="space-y-6">
                            <h3 className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                                {data?.title || name}
                            </h3>
                            <p className="text-lg text-gray-500 leading-relaxed max-w-sm font-medium">
                                {data?.description || "Empowering the next generation of digital-first enterprises."}
                            </p>
                        </div>

                        <Link
                            to={data?.ctaPath || "#"}
                            onClick={onClose}
                            className="group inline-flex items-center gap-3 text-gray-900 font-bold text-base hover:gap-5 transition-all"
                        >
                            <span className="border-b-2 border-primary pb-1">
                                {data?.ctaText || "Join us"}
                            </span>
                            <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Middle Column - Main Links (4/12) */}
                    <div className="lg:col-span-4 border-r border-gray-50 px-8">
                        <div className="space-y-1">
                            {items && items.map((item, idx) => (
                                <div
                                    key={idx}
                                    onMouseEnter={() => setActiveItem(item)}
                                    className={`group flex items-center justify-between px-6 py-4 rounded-lg cursor-pointer transition-all duration-300 ${activeItem?.name === item.name ? 'bg-gray-50 text-primary' : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'}`}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={onClose}
                                        className="flex-1 text-[17px] font-bold tracking-wide"
                                    >
                                        {item.name}
                                    </Link>
                                    {(item.subItems || item.children) && (
                                        <ChevronRight size={18} className={`transition-transform duration-300 ${activeItem?.name === item.name ? 'translate-x-1 opacity-100' : 'opacity-0 -translate-x-2'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Dynamic Sub-Links (4/12) */}
                    <div className="lg:col-span-4 pl-12 py-2">
                        <AnimatePresence mode="wait">
                            {activeItem && (activeItem.subItems || activeItem.children) ? (
                                <motion.div
                                    key={activeItem.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.15 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-2">
                                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">
                                            {activeItem.name} Categories
                                        </p>
                                        <div className="grid grid-cols-1 gap-6">
                                            {(activeItem.subItems || activeItem.children).map((sub, sIdx) => (
                                                <div key={sIdx} className="space-y-4">
                                                    <Link
                                                        to={sub.path}
                                                        onClick={onClose}
                                                        className="block text-[19px] font-bold text-gray-900 hover:text-primary transition-colors"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                    
                                                    {sub.children && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pl-0">
                                                            {sub.children.map((child, cIdx) => (
                                                                <Link
                                                                    key={cIdx}
                                                                    to={child.path}
                                                                    onClick={onClose}
                                                                    className="text-[14px] font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-3 group/child"
                                                                >
                                                                    <div className="w-1.5 h-1.5 bg-gray-200 group-hover/child:bg-primary rounded-full transition-colors" />
                                                                    {child.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-300 italic text-sm">
                                    No sub-categories available
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MegaMenu;
