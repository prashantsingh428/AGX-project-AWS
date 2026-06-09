import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Users,
    Zap,
    Globe,
    Cpu,
    CheckCircle2,
    ArrowRight,
    LayoutGrid,
    Repeat,
    Cloud,
    Briefcase
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        title: "Growth & Performance",
        items: ["Global SEO Projects", "Performance Marketing OEM"]
    },
    {
        title: "Digital Engineering",
        items: ["Scalable Web Ecosystems", "Custom UI/UX Architectures"]
    },
    {
        title: "AI & Intelligence",
        items: ["GenAI Implementations", "Data Strategy & Analytics"]
    }
];

const statCards = [
    {
        icon: LayoutGrid,
        value: "95%+",
        label: "Customer Retention",
        description: "High-density satisfaction aligned by quality.",
        color: "indigo"
    },
    {
        icon: Repeat,
        value: "98%",
        label: "Operational Excellence",
        description: "Project success ratio across all services.",
        color: "blue"
    },
    {
        icon: Cloud,
        value: "1,557+",
        label: "Global Paid Media",
        description: "Ad campaigns managed at scale.",
        color: "purple",
        link: true
    },
    {
        icon: Briefcase,
        value: "151+",
        label: "AI Growth Labs",
        description: "Enabling cross-ecosystem collaboration.",
        color: "slate"
    }
];

const StatsSection = () => {
    const sectionRef = useRef(null);
    const leftContentRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate left side content
            gsap.fromTo(
                leftContentRef.current,
                { x: -30, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        once: true
                    }
                }
            );

            // Animate cards in a staggered sequence triggered by the section entry
            const validCards = cardsRef.current.filter(Boolean);
            if (validCards.length > 0) {
                gsap.fromTo(
                    validCards,
                    { x: 30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 85%',
                            once: true
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className="pt-20 md:pt-24 pb-32 md:pb-40 bg-white relative z-50 overflow-hidden"
        >
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* Left Column: Context & Categories */}
                    <div ref={leftContentRef} className="lg:col-span-5 space-y-10">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                Real Numbers. <br />
                                <span className="text-primary italic">Real Growth.</span>
                            </h2>
                            <p className="text-lg text-slate-600 mt-6 max-w-md">
                                Our performance snapshot reflects the tangible impact we delivered for our global enterprise partners.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {categories.map((cat, idx) => (
                                <div key={idx} className="space-y-3">
                                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                        {cat.title}
                                    </h3>
                                    <div className="space-y-2">
                                        {cat.items.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-600">
                                                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                                                </div>
                                                <span className="text-sm md:text-base">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Cards Stack */}
                    <div className="lg:col-span-7 flex flex-col gap-5">
                        {statCards.map((stat, index) => (
                            <div
                                key={index}
                                ref={(el) => (cardsRef.current[index] = el)}
                                className="group relative bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 md:p-8 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-500"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                                        <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-2xl md:text-3xl font-black text-slate-900">{stat.value}</span>
                                            <h4 className="text-lg md:text-xl font-bold text-slate-800">{stat.label}</h4>
                                        </div>
                                        <p className="mt-2 text-slate-500 font-medium leading-relaxed max-w-md">
                                            {stat.description}
                                        </p>
                                        {stat.link && (
                                            <div className="mt-4 flex items-center text-primary font-semibold text-sm gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                Learn more <ArrowRight className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StatsSection;

