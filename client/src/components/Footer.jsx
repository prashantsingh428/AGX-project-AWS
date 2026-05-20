import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Globe, Users, Mail, Phone, Shield, ArrowRight, Instagram,
    Facebook, Linkedin, Youtube, Twitter,
    Briefcase, User, MessageCircle, Info, BookOpen, Scale,
    Cookie, Copyright, Send, Building2
} from 'lucide-react';
import logo from '../assets/client-logos/ailogo2.png';
import api from '../api/api.js';
import LanguageSelector from './LanguageSelector';
import { useNotification } from '../context/NotificationContext';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const location = useLocation();
    const { showNotification } = useNotification();
    const footerRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await api.post("/connect", formData);
            showNotification("Message sent successfully 🚀", "success");

            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                message: "",
            });
        } catch (error) {
            showNotification("Something went wrong 😢", "error");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".footer-column",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 80%",
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const handleLinkHover = (e) => {
        gsap.to(e.target, { x: 5, color: "#1d3461", duration: 0.3 });
    };

    const handleLinkLeave = (e) => {
        gsap.to(e.target, { x: 0, color: "#9ca3af", duration: 0.3 });
    };

    const socialLinks = [
        { name: "LinkedIn", url: "https://www.linkedin.com/company/ai-growthexa/about/?viewAsMember=true", icon: <Linkedin size={16} /> },
        { name: "Instagram", url: "https://www.instagram.com/aigrowthexa/", icon: <Instagram size={16} /> },
        { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61586954705320", icon: <Facebook size={16} /> },
        { name: "YouTube", url: "https://www.youtube.com/@AIGrowthExa", icon: <Youtube size={16} /> },
        { name: "X (Twitter)", url: "https://x.com/aigrowthexa", icon: <Twitter size={16} /> },
    ];

    return (
        <footer ref={footerRef} className="bg-slate-50 text-slate-600 py-12 px-6 sm:px-12 lg:px-16 border-t border-gray-200 relative overflow-hidden mt-24">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/30 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 max-w-7xl relative z-10">
                {/* Branding Column */}
                <div className="footer-column flex flex-col space-y-6 lg:pr-4">
                    <div className="space-y-4">
                        <Link to="/" className="inline-block transform transition-transform hover:scale-105">
                            <img src={logo} alt="Ai Growth Exa" className="h-10 md:h-12 w-auto object-contain" />
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Elevating businesses through precision AI-powered strategies and performance-first growth systems.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-500 hover:text-primary transition-colors">
                            <Mail size={16} className="text-primary/60" />
                            <a href="mailto:contact@aigrowthexa.com" className="text-sm">contact@aigrowthexa.com</a>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500 hover:text-primary transition-colors">
                            <Phone size={16} className="text-primary/60" />
                            <span className="text-sm">+1 (555) 000-0000</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-slate-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 shadow-sm"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 text-gray-500 pt-2 border-t border-gray-100 italic">
                        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold">
                            <Shield size={12} className="text-primary" />
                            Secure
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold">
                            <Globe size={12} className="text-primary" />
                            Global
                        </span>
                    </div>
                </div>

                {/* Explore Column */}
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 relative flex items-center gap-2">
                        <Globe size={18} className="text-primary" />
                        Explore
                        <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
                    </h3>
                    <ul className="space-y-2.5">
                        {[
                            { name: "About Us", path: "/about", icon: <Info size={14} /> },
                            { name: "Our Services", path: "/services", icon: <Briefcase size={14} /> },
                            { name: "Blog", path: "/blog", icon: <BookOpen size={14} /> },
                            { name: "Careers", path: "/careers", icon: <Users size={14} /> },
                            { name: "Global Presence", path: "/about", icon: <Building2 size={14} /> },
                            { name: "Case Studies", path: "/blog", icon: <BookOpen size={14} /> },
                            { name: "Contact Us", path: "/contact", icon: <MessageCircle size={14} /> }
                        ].map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.path}
                                    state={item.path === '/contact' ? { background: location } : undefined}
                                    className="flex items-center gap-2 transition-colors duration-300 text-slate-500 hover:text-primary text-sm"
                                    onMouseEnter={handleLinkHover}
                                    onMouseLeave={handleLinkLeave}
                                >
                                    <span className="text-primary/50">{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Solutions Column - NEW */}
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 relative flex items-center gap-2">
                        <Briefcase size={18} className="text-primary" />
                        Solutions
                        <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
                    </h3>
                    <ul className="space-y-2.5">
                        {[
                            "Generative AI Strategy",
                            "Custom AI Agents",
                            "Data Infrastructure",
                            "Growth Intelligence",
                            "Cloud Transformation",
                            "Automated Operations",
                            "Predictive Analytics"
                        ].map((sol) => (
                            <li key={sol}>
                                <Link
                                    to="/services"
                                    className="flex items-center gap-2 transition-colors duration-300 text-slate-500 hover:text-primary text-sm"
                                    onMouseEnter={handleLinkHover}
                                    onMouseLeave={handleLinkLeave}
                                >
                                    <ArrowRight size={12} className="text-primary/30" />
                                    {sol}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>


                {/* Connect Column */}
                <div className="footer-column flex flex-col space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 relative flex items-center gap-2">
                        <Mail size={18} className="text-primary" />
                        Connect With Us
                        <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
                    </h3>
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 rounded px-4 py-2 focus:outline-none focus:border-primary transition-colors text-[13px] text-slate-900"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-200 rounded px-4 py-2 focus:outline-none focus:border-primary transition-colors text-[13px] text-slate-900"
                            />
                        </div>
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-white border border-gray-200 rounded px-4 py-2 focus:outline-none focus:border-primary transition-colors text-[13px] text-slate-900"
                        />
                        <textarea
                            placeholder="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="2"
                            className="w-full bg-white border border-gray-200 rounded px-4 py-2 focus:outline-none focus:border-primary transition-colors text-[13px] resize-none text-slate-900"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded text-sm transition-all duration-300 transform"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-200 mt-16 pt-10 relative z-10">
                {/* Language Row */}
                <div className="flex justify-center mb-8">
                    <LanguageSelector />
                </div>

                {/* Copyright & Legal Row */}
                <div className="flex flex-col items-center justify-center space-y-3 text-sm text-slate-500 mb-6">
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
                        <span className="font-medium text-slate-600">Copyrights © {new Date().getFullYear()} Ai Growth Exa. All rights reserved.</span>
                        <span className="text-slate-300 hidden sm:inline">•</span>
                        <Link to="/contact" state={{ background: location }} className="hover:text-primary transition-colors">Contact Us</Link>
                        <span className="text-slate-300">/</span>
                        <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Statement</Link>
                        <span className="text-slate-300">/</span>
                        <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms of use</Link>
                        <span className="text-slate-300">/</span>
                        <Link to="/cookie-policy" className="hover:text-primary transition-colors">Cookie info</Link>
                    </div>
                </div>

                {/* Cookie Notice Row */}
                <div className="text-center text-xs text-slate-400 max-w-2xl mx-auto px-4">
                    We use cookies on our site. Please read more about our <Link to="/cookie-policy" className="text-primary hover:underline">cookies policy</Link> here.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
