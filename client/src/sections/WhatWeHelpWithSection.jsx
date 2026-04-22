import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Zap, Target, Bot, BarChart3, Database, Rocket, LayoutGrid, ChevronRight } from 'lucide-react';
import FloatingParticles from '../components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "AI-Powered Performance Marketing",
        description: "Smarter targeting. Better ROAS. Lower CPL.",
        icon: <Zap size={28} />,
        animation: 'spin'
    },
    {
        title: "Lead Generation Systems",
        description: "Predictable, high-quality leads — not random traffic.",
        icon: <Target size={28} />,
        animation: 'pulse'
    },
    {
        title: "Marketing Automation & Funnels",
        description: "AI-driven follow-ups that convert while you sleep.",
        icon: <Bot size={28} />,
        animation: 'bounce'
    },
    {
        title: "Conversion Rate Optimization (CRO)",
        description: "Turn visitors into customers — scientifically.",
        icon: <BarChart3 size={28} />,
        animation: 'pulse'
    },
    {
        title: "AI CRM & Sales Automation",
        description: "Close more deals with less manual effort.",
        icon: <Database size={28} />,
        animation: 'breathe'
    },
    {
        title: "Brand Growth & Scaling Strategy",
        description: "From startup traction to scale-up dominance.",
        icon: <Rocket size={28} />,
        animation: 'bounce'
    }
];

const ServiceCard = ({ title, description, icon, animation }) => {
    const cardRef = useRef(null);
    const timelineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            timelineRef.current = gsap.timeline({ paused: true })
                .to(cardRef.current.querySelector('.card-inner'), {
                    rotateY: 180,
                    duration: 0.35,
                    ease: "power2.inOut"
                });
        }, cardRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => timelineRef.current?.play();
    const handleMouseLeave = () => timelineRef.current?.reverse();

    return (
        <div
            ref={cardRef}
            className="service-card w-full h-[220px] perspective-1000 cursor-pointer group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-inner relative w-full h-full transition-all duration-300 transform-style-3d">
                {/* Front Face - Glassmorphism */}
                <div className="absolute inset-0 w-full h-full backface-hidden bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] p-6 flex flex-col items-center justify-center text-center z-20 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(29,52,97,0.1)] group-hover:-translate-y-1 perspective-1000">
                    <motion.div
                        className="mb-4 p-4 bg-primary/10 rounded-2xl text-primary border border-primary/20 shadow-[0_6px_0_rgba(29,52,97,0.1)] transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_3px_0_rgba(255,255,255,0.2)] transform-style-3d"
                        whileHover={{
                            rotateX: 10,
                            rotateY: 10,
                            translateZ: 30,
                            scale: 1.05
                        }}
                    >
                        <motion.div
                            animate={
                                animation === 'spin' ? { rotate: 360 } :
                                    animation === 'bounce' ? { y: [0, -4, 0] } :
                                        animation === 'pulse' ? { scale: [1, 1.1, 1] } :
                                            animation === 'breathe' ? { opacity: [0.7, 1, 0.7], scale: [0.95, 1, 0.95] } :
                                                {}
                            }
                            transition={{
                                duration: animation === 'spin' ? 8 : 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
                                {icon}
                            </div>
                        </motion.div>
                    </motion.div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-primary font-bold text-[9px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        Details <ChevronRight size={10} />
                    </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#0a0a0a] rounded-3xl shadow-2xl p-6 flex flex-col items-center justify-center text-center text-white border border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-purple-600/15"></div>
                    <div className="relative z-10">
                        <h3 className="text-base font-black mb-2 text-white tracking-tight uppercase">{title}</h3>
                        <p className="text-[13px] leading-snug mb-5 text-gray-300 font-medium px-1">
                            {description}
                        </p>
                        <button className="px-7 py-2 bg-primary text-white font-black rounded-full text-[9px] uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WhatWeHelpWithSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    }
                }
            );

            gsap.fromTo(".service-card",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 90%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative z-20 py-20 bg-[#fafafa] overflow-hidden">
            {/* Geometric & Atmospheric Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(rgba(29, 52, 97, 0.05) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}></div>
                <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white shadow-lg shadow-primary/5 border border-primary/20 text-primary font-bold text-[9px] uppercase tracking-[0.2em] mb-6">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-primary"></span>
                        Capability Matrix
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 mb-4 tracking-tighter leading-tight uppercase">
                        Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Growth Engine</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-bold tracking-tight">
                        Deploying <span className="text-primary font-black">AI AGENTS</span> and <span className="text-purple-600 font-black">NEURAL STRATEGIES</span> to outpace competition.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>

                <div className="text-center border-t border-gray-100 pt-12">
                    <Link
                        to="/services"
                        ref={buttonRef}
                        className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gray-950 text-white font-black text-base rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        <LayoutGrid size={20} className="text-primary group-hover:rotate-90 transition-transform duration-500" />
                        <span>EXPLORE FULL SPECTRUM</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-primary" />
                    </Link>
                    <p className="mt-6 text-gray-400 font-bold text-[9px] uppercase tracking-[0.3em]">
                        SECURE_SYNC // GLOBAL_SCALE
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.05; transform: scale(1); }
                    50% { opacity: 0.08; transform: scale(1.1); }
                }
                .animate-pulse {
                    animation: pulse 8s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default WhatWeHelpWithSection;

