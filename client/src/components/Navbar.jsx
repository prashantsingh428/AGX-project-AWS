import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import api from '../api/api';
import logo from '../assets/client-logos/ailogo2.png';
import { FaTimes, FaBars } from 'react-icons/fa';
import AuthModal from './Modals/AuthModal';
import LanguageSelector from './LanguageSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MegaMenu from './Navbar/MegaMenu';

const Navbar = () => {
    const { t } = useTranslation();
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const linksRef = useRef([]);
    const mobileMenuRef = useRef(null);
    const mobileLinksRef = useRef([]);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [hoveredLink, setHoveredLink] = useState(null);

    const [navbarSearch, setNavbarSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authModalView, setAuthModalView] = useState('login');
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const location = useLocation();

    const openAuthModal = (view) => {
        setAuthModalView(view);
        setIsAuthModalOpen(true);
        setIsMenuOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
                if (navbarSearch.trim() === '') {
                    setIsSearchExpanded(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [navbarSearch]);

    // Live search logic
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (navbarSearch.trim().length > 1) {
                try {
                    setIsSearching(true);
                    const response = await api.get(`/services/search?q=${navbarSearch}`);
                    if (response.data.success) {
                        setSearchResults(response.data.data);
                        setShowDropdown(true);
                    }
                } catch (error) {
                    console.error("Navbar search error:", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [navbarSearch]);

    const handleResultClick = (service) => {
        navigate(`/services?q=${encodeURIComponent(service.title)}`);
        setNavbarSearch('');
        setShowDropdown(false);
    };

    // Close menu when route changes
    useEffect(() => {
        if (isMenuOpen) {
            toggleMenu();
        }
    }, [location]);

    useEffect(() => {
        if (!navRef.current || !logoRef.current || linksRef.current.length === 0) return;

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8 }
        )
            .fromTo(logoRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5 },
                "-=0.4"
            )
            .fromTo(linksRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
                "-=0.3"
            );
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            // Animate menu in
            gsap.fromTo(mobileMenuRef.current,
                { height: 0, opacity: 0 },
                { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [isMenuOpen]);

    const toggleMenu = () => {
        if (isMenuOpen) {
            // Animate out before setting state is tricky with simple state,
            // but for a snappy feel we can just toggle.
            // If we really want exit animation we need to keep it mounted.
            // For now, let's keep it simple as requested.
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    };

    const navLinks = [
        {
            name: t('navbar.who_we_are.main'),
            path: '/about',
            megaData: {
                title: "Architects of Intelligence",
                description: "Redefining boundaries and empowering businesses with cutting-edge AI strategy and global infrastructure.",
                ctaText: "Discover Our Story",
                ctaPath: "/about"
            },
            dropdown: [
                { name: t('navbar.who_we_are.about'), path: '/about', description: "Our mission, vision, and global impact" },
                { name: t('navbar.who_we_are.founder'), path: '/founder', description: "The visionary leadership behind Exa" },
                { name: t('navbar.who_we_are.awards'), path: '/awards', description: "Celebrating excellence in AI innovation" }
            ]
        },
        {
            name: t('navbar.what_we_do'),
            path: '/services',
            megaData: {
                title: "Future-Ready Ecosystem",
                description: "We build perpetually adaptive solutions that evolve as fast as the market moves.",
                ctaText: "Explore Services",
                ctaPath: "/services"
            },
            dropdown: [
                { name: "AI Marketing", path: "/services/ai-marketing", description: "LLM-powered performance automation" },
                { name: "Data Strategy", path: "/services/data-strategy", description: "Predictive analytics and business intelligence" },
                { name: "Brand Identity", path: "/services/brand-identity", description: "Next-gen design for an AI-first world" },
                { name: "Cloud Infrastructure", path: "/services/cloud-infrastructure", description: "Scalable enterprise AI architecture" }
            ]
        },
        { name: t('navbar.insights'), path: '/blog' },
        {
            name: t('navbar.careers.main') || t('navbar.careers'),
            path: '/careers',
            megaData: {
                title: "Build the Future with Us",
                description: "Join a team of visionaries, engineers, and creatives shaping the next frontier of artificial intelligence.",
                ctaText: "View All Openings",
                ctaPath: "/careers"
            },
            dropdown: [
                { name: t('navbar.careers.overview'), path: '/careers', description: "Our culture, values and mission" },
                { 
                    name: t('navbar.careers.open_roles.main'), 
                    path: '/careers#open-roles', 
                    description: "Find your next challenge",
                    subItems: [
                        { name: t('navbar.careers.open_roles.all_jobs'), path: '/careers#open-roles' },
                        { name: t('navbar.careers.open_roles.featured'), path: '/careers#open-roles' },
                        { 
                            name: t('navbar.careers.open_roles.departments.main'), 
                            path: '/careers#open-roles',
                            isDepartment: true,
                            children: [
                                { name: t('navbar.careers.open_roles.departments.marketing'), path: '/careers#open-roles' },
                                { name: t('navbar.careers.open_roles.departments.technology'), path: '/careers#open-roles' },
                                { name: t('navbar.careers.open_roles.departments.creative'), path: '/careers#open-roles' },
                                { name: t('navbar.careers.open_roles.departments.business'), path: '/careers#open-roles' },
                            ]
                        }
                    ]
                },
                { name: t('navbar.careers.life_at_exa'), path: '/careers#life-at-exa', description: "A glimpse into our daily work environment" },
                { name: t('navbar.careers.growth_learning'), path: '/careers/growth-learning', description: "How we invest in your professional journey" },
                { name: t('navbar.careers.what_you_work_on'), path: '/careers/what-you-work-on', description: "Impactful projects and cutting-edge tech" },
                { name: t('navbar.careers.apply_now'), path: '/careers#open-roles', isHighlight: true }
            ]
        },
        { name: t('navbar.contact_us'), path: '/contact' },
    ];

    const addToRefs = (el) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200/50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
        >
            <div className="max-w-[1600px] mx-auto px-8 lg:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-16">
                    {/* Logo */}
                    <Link to="/" ref={logoRef} className="shrink-0">
                        <img src={logo} alt="Ai Growth Exa" className="h-12 md:h-14 w-auto object-contain" />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <div
                                key={index}
                                className="relative py-4"
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                            >
                                <NavLink
                                    to={link.path}
                                    state={link.path === '/contact' ? { background: location } : undefined}
                                    ref={addToRefs}
                                    className={({ isActive }) =>
                                        `flex items-center gap-1.5 text-[15px] font-semibold transition-all hover:text-primary nav-link-hover ${isActive || (link.path === '/contact' && location.pathname === '/contact') || hoveredLink === link.name
                                            ? 'text-primary'
                                            : 'text-gray-600'
                                        }`
                                    }
                                >
                                    {link.name}
                                    {link.dropdown && (
                                        <svg
                                            className={`w-3.5 h-3.5 transition-transform duration-300 ${hoveredLink === link.name ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Search & Auth */}
                <div className="hidden md:flex items-center gap-9 ml-auto">
                    <motion.div
                        ref={dropdownRef}
                        initial={false}
                        animate={{ width: isSearchExpanded ? 240 : 40 }}
                        className="relative group h-10 flex items-center bg-gray-50 border border-gray-100 rounded-full overflow-hidden transition-all duration-300 hover:border-gray-200"
                    >
                        <button
                            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                            className="absolute left-0 inset-y-0 w-10 flex items-center justify-center text-gray-400 hover:text-primary transition-colors z-10"
                        >
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>

                        <AnimatePresence>
                            {isSearchExpanded && (
                                <motion.input
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    type="text"
                                    autoFocus
                                    value={navbarSearch}
                                    onChange={(e) => setNavbarSearch(e.target.value)}
                                    className="block w-full h-full pl-10 pr-4 text-sm text-gray-900 bg-transparent border-none placeholder-gray-400 focus:outline-none focus:ring-0"
                                    placeholder="Search services..."
                                />
                            )}
                        </AnimatePresence>

                        {/* Search Results Dropdown */}
                        <AnimatePresence>
                            {showDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl shadow-xl overflow-hidden z-[60]"
                                >
                                    {isSearching ? (
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            Searching...
                                        </div>
                                    ) : searchResults.length > 0 ? (
                                        <div className="max-h-80 overflow-y-auto">
                                            {searchResults.map((service, index) => (
                                                <button
                                                    key={service._id || index}
                                                    onClick={() => handleResultClick(service)}
                                                    className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors border-b border-gray-50 last:border-0"
                                                >
                                                    <div className="text-sm font-semibold text-gray-900 truncate">
                                                        {service.title}
                                                    </div>
                                                    <div className="text-xs text-primary font-medium">
                                                        {service.category}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            No results found
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>


                    <div className="flex items-center gap-4">
                        <div ref={addToRefs}>
                            <button
                                onClick={() => openAuthModal('register')}
                                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-medium transition-all shadow-lg shadow-primary/20"
                            >
                                {t('navbar.get_started')}
                            </button>
                        </div>
                        <div ref={addToRefs}>
                            <LanguageSelector />
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-700 hover:text-primary focus:outline-none p-2 transition-colors"
                >
                    {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </button>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl md:hidden overflow-hidden"
                    >
                        <div className="flex flex-col p-4 space-y-1">
                            {navLinks.map((link, index) => (
                                <div key={index}>
                                    {link.dropdown ? (
                                        <>
                                            <button
                                                onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg text-base font-medium transition-colors"
                                            >
                                                {link.name}
                                                <svg className={`w-4 h-4 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                            {openDropdown === link.name && (
                                                <div className="bg-slate-50 rounded-lg mt-1 space-y-1">
                                                    {link.dropdown.map((subItem, subIdx) => (
                                                        <Link
                                                            key={subIdx}
                                                            to={subItem.path}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className={`block px-8 py-2.5 text-sm transition-colors ${location.pathname === subItem.path ? 'text-primary' : 'text-gray-600 hover:text-primary'
                                                                }`}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <NavLink
                                            to={link.path}
                                            state={link.path === '/contact' ? { background: location } : undefined}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={({ isActive }) =>
                                                `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive || (link.path === '/contact' && location.pathname === '/contact')
                                                    ? 'bg-blue-600/10 text-blue-400'
                                                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                                                }`
                                            }
                                        >
                                            {link.name}
                                        </NavLink>
                                    )}
                                </div>
                            ))}

                            <div className="pt-2 mt-2 border-t border-gray-200 flex flex-col gap-3">
                                <button
                                    onClick={() => openAuthModal('register')}
                                    className="block w-full text-center px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg text-base font-medium transition-colors"
                                >
                                    {t('navbar.get_started')}
                                </button>
                                <div className="flex justify-center">
                                    <LanguageSelector />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Global Mega Menu */}
            <AnimatePresence mode="wait">
                {navLinks.map((link, index) => (
                    link.dropdown && hoveredLink === link.name && (
                        <MegaMenu
                            key={index}
                            name={link.name}
                            data={link.megaData}
                            items={link.dropdown}
                            isOpen={true}
                            onClose={() => setHoveredLink(null)}
                            onMouseEnter={() => setHoveredLink(link.name)}
                        />
                    )
                ))}
            </AnimatePresence>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialView={authModalView}
            />
        </nav>
    );
};

export default Navbar;
