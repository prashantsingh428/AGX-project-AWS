import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
    Bot, BarChart3, Zap, Mic, Smartphone, MapPin, Bolt, Palette,
    PenTool, Globe, Tablet, FileText, Handshake, Mail,
    ShoppingBag, MessageCircle, Users, Star, Target, TrendingUp, Flag,
    ChevronDown, ChevronRight, ArrowRight
} from 'lucide-react';
import p1 from '../assets/images/homeimg/p1.avif';
import p2 from '../assets/images/homeimg/p2.webp';
import p3 from '../assets/images/homeimg/p3.webp';
import p4 from '../assets/images/homeimg/p4.jpg';
import p5 from '../assets/images/homeimg/p5.jpg';
import p6 from '../assets/images/homeimg/p6.jpg';
import p7 from '../assets/images/homeimg/p7.jpg';
import p8 from '../assets/images/homeimg/p8.jpg';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        tag: "RESEARCH REPORT",
        title: "The Generative AI Marketing Revolution",
        subtitle: "How LLM-powered systems are redefining brand-customer interactions through predictive intelligence.",
        image: p1,
        accent: "#3b82f6"
    },
    {
        tag: "PERSPECTIVE",
        title: "10X AI Growth Strategy: Scaling New World 2026",
        subtitle: "A deep dive into the next decade of autonomous business scaling and market disruption.",
        image: p2,
        accent: "#8b5cf6"
    },
    {
        tag: "CASE STUDY",
        title: "Performance Excellence: AI Ad Management",
        subtitle: "Eliminating human error in multi-billion dollar ad spend through neural network optimization.",
        image: p3,
        accent: "#ec4899"
    },
    {
        tag: "INSIGHT",
        title: "Podcast Marketing & Audio Branding AI",
        subtitle: "Leveraging voice synthesis and tone analysis for next-gen consumer engagement.",
        image: p4,
        accent: "#f59e0b"
    },
    {
        tag: "RESEARCH REPORT",
        title: "Intelligent Social Media Infrastructures",
        subtitle: "The shift from human content management to agentic social workflows.",
        image: p5,
        accent: "#ef4444"
    },
    {
        tag: "PERSPECTIVE",
        title: "The Zero-Click Search Era: AI SEO 3.0",
        subtitle: "Strategies for brand visibility in an world dominated by AI-answering engines.",
        image: p6,
        accent: "#10b981"
    },
    {
        tag: "REPORT",
        title: "Unified Growth: Exa Intelligence 360",
        subtitle: "Harmonizing every touchpoint from email to SMS with unified AI models.",
        image: p7,
        accent: "#06b6d4"
    },
    {
        tag: "TREND",
        title: "Autonomous Funnels & Lead Gen Models",
        subtitle: "Removing friction in the B2B sales cycle with self-correcting conversion loops.",
        image: p8,
        accent: "#8b5cf6"
    }
];

const InsightCard = ({ tag, title, subtitle, image, accent, isDark }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative w-full h-[12.5cm] overflow-hidden transition-all duration-700 shadow-xl border ${isDark ? 'bg-primary border-primary' : 'bg-white border-gray-100'} cursor-pointer`}
        >
            {/* Visual Part (Hidden on hover) */}
            <div className="absolute inset-0 z-0 transition-opacity duration-500 group-hover:opacity-0">
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-110 opacity-90"
                    />
                )}

                {/* Bottom-to-Top Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            </div>

            {/* Hover Background (Shown on hover) */}
            <div className={`absolute inset-0 z-1 transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${isDark ? 'bg-primary' : 'bg-gray-50'}`} />

            {/* Content Container (Always visible) */}
            <div className="absolute inset-x-0 bottom-0 p-10 z-20 transition-all duration-500 group-hover:h-full group-hover:flex group-hover:flex-col group-hover:justify-center">
                {/* Tag */}
                <div className="flex items-center gap-3 mb-6 transition-all duration-500 transform group-hover:-translate-y-2">
                    <div className="w-2 h-2 rounded-full bg-primary" style={{ backgroundColor: !isDark ? 'var(--primary)' : '#fff' }} />
                    <span className={`text-[11px] uppercase font-black tracking-[0.25em] transition-all duration-500 ${isDark ? 'text-white/70' : 'text-white group-hover:text-primary'}`}>
                        {tag}
                    </span>
                </div>

                {/* Heading (Always Visible) */}
                <h3 className={`text-2xl md:text-3xl font-bold leading-tight transition-all duration-500 ${isDark ? 'text-white' : 'text-white group-hover:text-primary group-hover:text-4xl'}`}>
                    {title}
                </h3>

                {/* Description (Reveal on hover) */}
                <div className="max-h-0 opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-700 delay-100 overflow-hidden mt-0 group-hover:mt-10">
                    <p className={`text-base md:text-lg leading-relaxed font-medium ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                        {subtitle}
                    </p>
                </div>

                {/* Simple Expand Button (Always Visible) */}
                <div className="mt-8 group-hover:mt-12 transition-all duration-500">
                    <div className={`flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-white/80 hover:text-white' : 'text-white group-hover:text-primary'}`}>
                        <span>Expand Report</span>
                        <ChevronRight size={18} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </div>

            {/* Accessibility Accent Bottom */}
            <div className={`absolute bottom-0 left-0 w-full h-1.5 transition-all duration-500 ${isDark ? 'bg-white' : 'bg-primary'} transform origin-left scale-x-0 group-hover:scale-x-100`} />
        </motion.div>
    );
};

const OurFeaturesSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const containerRef = useRef(null);
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-white text-gray-900 pt-12 pb-32">
            {/* Header Section - Split Layout to fill vacant space */}
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl pt-20 pb-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">
                    <div ref={headerRef}>
                        {/* Tag */}
                        <div className="inline-block px-5 py-2 border border-gray-100 bg-gray-50/50 mb-10">
                            <span className="text-[11px] uppercase font-bold tracking-[0.3em] text-gray-500">
                                CORE CAPABILITIES
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-5xl md:text-7xl font-extrabold leading-[1] tracking-tight text-gray-900">
                            The future of intelligent <span className="text-primary italic">growth</span>
                        </h2>
                    </div>

                    {/* New Vision Text Block */}
                    <div className="lg:pb-1">
                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium lg:border-l lg:border-primary/20 lg:pl-12">
                            <span className="block mb-3 text-gray-900 font-bold">Explore what drives intelligent growth.</span>
                            Insights that anticipate change. Research that defines what’s next. 
                            Perspectives that challenge convention. <span className="text-primary/80 italic">Ideas that move businesses forward.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid Layout - Static & Resized */}
            <div className="container mx-auto px-4 max-w-[95vw] relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {features.map((feature, index) => (
                        <InsightCard
                            key={index}
                            tag={feature.tag}
                            title={feature.title}
                            subtitle={feature.subtitle}
                            image={feature.image}
                            accent={feature.accent}
                            isDark={index % 2 !== 0} // Alternate for variety like in screenshot
                        />
                    ))}
                </div>
            </div>

            {/* Background Accents (Subtle Light Variant) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default OurFeaturesSection;
