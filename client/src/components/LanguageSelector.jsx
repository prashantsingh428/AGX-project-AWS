import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const languageData = [
    {
        group: 'Americas',
        items: [
            { code: 'es', name: 'Argentina', flag: '🇦🇷' },
            { code: 'pt', name: 'Brazil', flag: '🇧🇷' },
            { code: 'en', name: 'Canada', flag: '🇨🇦', variants: ['En', 'Fr'] },
            { code: 'es', name: 'Costa Rica', flag: '🇨🇷' },
            { code: 'es', name: 'El Salvador', flag: '🇸🇻' },
            { code: 'es', name: 'Mexico', flag: '🇲🇽' },
            { code: 'en', name: 'United States', flag: '🇺🇸' },
        ],
        footer: {
            title: 'Middle East',
            link: 'Visit our Regional Website'
        }
    },
    {
        group: 'Europe',
        items: [
            { code: 'fr', name: 'Belgium', flag: '🇧🇪', variants: ['Fr', 'Nl', 'En'] },
            { code: 'da', name: 'Denmark', flag: '🇩🇰' },
            { code: 'fi', name: 'Finland', flag: '🇫🇮' },
            { code: 'fr', name: 'France', flag: '🇫🇷' },
            { code: 'de', name: 'Germany', flag: '🇩🇪' },
            { code: 'hu', name: 'Hungary', flag: '🇭🇺' },
            { code: 'it', name: 'Italy', flag: '🇮🇹' },
            { code: 'lv', name: 'Latvia', flag: '🇱🇻' },
            { code: 'lt', name: 'Lithuania', flag: '🇱🇹' },
            { code: 'no', name: 'Norway', flag: '🇳🇴' },
            { code: 'pl', name: 'Poland', flag: '🇵🇱' },
            { code: 'pt', name: 'Portugal', flag: '🇵🇹' },
            { code: 'ro', name: 'Romania', flag: '🇷🇴' },
            { code: 'es', name: 'Spain', flag: '🇪🇸' },
            { code: 'sv', name: 'Sweden', flag: '🇸🇪' },
            { code: 'fr', name: 'Switzerland', flag: '🇨🇭', variants: ['Fr', 'En', 'De'] },
            { code: 'nl', name: 'The Netherlands', flag: '🇳🇱' },
            { code: 'en', name: 'United Kingdom & Ireland', flag: '🇬🇧' },
        ]
    },
    {
        group: 'Asia Pacific',
        items: [
            { code: 'en', name: 'Australia', flag: '🇦🇺' },
            { code: 'zh', name: 'China', flag: '🇨🇳', variants: ['En', '中文'] },
            { code: 'zh', name: 'Hong Kong SAR', flag: '🇭🇰' },
            { code: 'hi', name: 'India', flag: '🇮🇳', variants: ['En', 'हिंदी'] },
            { code: 'ja', name: 'Japan', flag: '🇯🇵', variants: ['日本語'] },
            { code: 'ms', name: 'Malaysia', flag: '🇲🇾' },
            { code: 'en', name: 'New Zealand', flag: '🇳🇿' },
            { code: 'en', name: 'Philippines', flag: '🇵🇭' },
            { code: 'en', name: 'Singapore', flag: '🇸🇬' },
            { code: 'th', name: 'Thailand', flag: '🇹🇭' },
        ]
    }
];

// Flatten for easier lookup
const allLanguages = languageData.flatMap(g => g.items);

const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { i18n } = useTranslation();

    // Find matching language object or default to English/US
    const currentLang = allLanguages.find(l => l.code.toLowerCase() === i18n.language.split('-')[0]) || allLanguages[6];

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (code) => {
        i18n.changeLanguage(code);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 rounded-lg transition-all duration-300 group"
            >
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700 uppercase tracking-tight">
                    <Globe className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                    <span>{currentLang.code === 'en' ? 'US-EN' : `${currentLang.code.toUpperCase()}`}</span>
                </div>
                <ChevronDown
                    className={`w-3 h-3 text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    strokeWidth={3}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Top Tip Arrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute top-full right-8 mt-1.5 w-4 h-4 bg-white border-t border-l border-slate-100 rotate-45 z-[101]"
                        />

                        {/* Dropdown Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.99 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.99 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="absolute top-full right-0 mt-3 w-screen max-w-[920px] bg-white border border-slate-100 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-[100] overflow-hidden hidden md:block"
                        >
                            <div className="p-10 grid grid-cols-3 gap-12">
                                {languageData.map((region) => (
                                    <div key={region.group} className="space-y-6">
                                        <h4 className="text-sm font-black text-slate-800 tracking-tight">{region.group}</h4>
                                        <div className="flex flex-col gap-3">
                                            {region.items.map((lang) => (
                                                <div key={lang.name} className="flex items-center justify-between group/item">
                                                    <button
                                                        onClick={() => handleLanguageChange(lang.code)}
                                                        className="flex items-center gap-3 text-slate-600 hover:text-primary transition-all duration-200 text-[13px] font-medium"
                                                    >
                                                        <span className="text-lg flex-shrink-0 transition-all">
                                                            {lang.flag}
                                                        </span>
                                                        <span className="truncate">
                                                            {lang.name}
                                                        </span>
                                                        {lang.variants && (
                                                            <span className="text-[11px] text-slate-400 font-normal">
                                                                ( {lang.variants.join(' | ')} )
                                                            </span>
                                                        )}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {region.footer && (
                                            <div className="pt-8 space-y-4">
                                                <h4 className="text-sm font-black text-slate-800 tracking-tight">{region.footer.title}</h4>
                                                <a href="/contact" className="flex items-center gap-3 text-slate-600 hover:text-primary transition-all text-[13px] font-medium group/link">
                                                    <Globe className="w-4 h-4 text-slate-400 group-hover/link:text-primary" />
                                                    {region.footer.link}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Mobile Fallback - Simpler List */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full right-0 mt-3 w-64 bg-white border border-slate-100 rounded-xl shadow-xl z-[100] overflow-hidden md:hidden"
                        >
                            <div className="p-4 max-h-[60vh] overflow-y-auto">
                                {allLanguages.map((lang) => (
                                    <button
                                        key={lang.name}
                                        onClick={() => handleLanguageChange(lang.code)}
                                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg text-sm text-slate-600"
                                    >
                                        <span>{lang.flag}</span>
                                        <span>{lang.name}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;
