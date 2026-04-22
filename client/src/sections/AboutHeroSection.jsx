import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingParticles from '../components/FloatingParticles';

gsap.registerPlugin(ScrollTrigger);

const AboutHeroSection = () => {
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const statsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" }
            });

            tl.fromTo(headingRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 }
            )
                .fromTo(leftRef.current,
                    { x: -30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8 },
                    "-=0.6"
                )
                .fromTo(rightRef.current,
                    { x: 30, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8 },
                    "-=0.8"
                )
                .fromTo(statsRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
                    "-=0.4"
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { number: "1600+", label: "Projects Delivered" },
        { number: "95%", label: "Client Retention" },
        { number: "3x", label: "Avg ROI Increase" },
        { number: "24/7", label: "Support Available" }
    ];

    const values = [
        {
            title: "AI-Powered",
            desc: "Data-driven decisions backed by machine learning and predictive analytics."
        },
        {
            title: "Results-Focused",
            desc: "Every strategy is directly tied to measurable revenue impact and growth."
        },
        {
            title: "Transparent",
            desc: "Real-time dashboards and weekly insights keep you in complete control."
        }
    ];

    return (
        <section ref={containerRef} className="relative pt-32 pb-20 flex items-center justify-center overflow-hidden bg-white text-gray-900">
            {/* Background enhancement */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                <FloatingParticles theme="light" />
            </div>

            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 blur-[120px] rounded-full pointer-events-none -ml-48 -mb-48"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Heading */}
                <div ref={headingRef} className="text-center mb-12">
                    <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Who We Are
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">AI Growth Exa</span>
                    </h1>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    {/* Left Column - Story */}
                    <div ref={leftRef} className="space-y-6">
                        <div className="relative">
                            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary to-purple-600 rounded-full"></div>
                            <div className="pl-6">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                                    Built for the New Era
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    <span className="font-bold text-gray-950">AI Growth Exa</span> is a growth marketing agency where <span className="text-primary font-semibold">AI</span>, <span className="text-indigo-600 font-semibold">automation</span>, and performance marketing work together seamlessly.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We don't just run campaigns—we build complete growth systems that combine cutting-edge technology with proven strategies to deliver measurable results at scale.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    From startups scaling from zero to Fortune 500 companies optimizing their marketing stack, we've delivered transformational growth across every industry.
                                </p>
                            </div>
                        </div>

                        {/* Key Highlights */}
                        <div className="mt-8 flex gap-4">
                            <div className="flex-1 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                                <div className="text-2xl font-black text-primary mb-1">1600+</div>
                                <div className="text-xs text-gray-600 font-medium">Projects</div>
                            </div>
                            <div className="flex-1 p-4 bg-purple-50 border border-purple-100 rounded-lg">
                                <div className="text-2xl font-black text-purple-600 mb-1">95%</div>
                                <div className="text-xs text-gray-600 font-medium">Retention</div>
                            </div>
                            <div className="flex-1 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                                <div className="text-2xl font-black text-indigo-600 mb-1">3x</div>
                                <div className="text-xs text-gray-600 font-medium">Avg ROI</div>
                            </div>
                        </div>

                        {/* Mission Badge */}
                        <div className="relative mt-8 p-6 bg-gradient-to-br from-primary via-indigo-600 to-purple-600 rounded-2xl text-white shadow-xl">
                            <div className="absolute -top-3 left-6 bg-white text-indigo-600 font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider shadow-sm">
                                Our Mission
                            </div>
                            <p className="text-xl md:text-2xl font-bold leading-tight mt-2">
                                Help brands grow faster, smarter, and sustainably.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Values & Benefits */}
                    <div ref={rightRef} className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Us</h3>

                        {values.map((value, i) => (
                            <div key={i} className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/10 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        {i === 0 && (
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        )}
                                        {i === 1 && (
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        )}
                                        {i === 2 && (
                                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold mb-1 text-gray-950">{value.title}</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Partner Types */}
                        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
                            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">We Partner With:</h4>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-sm text-gray-700">Startups scaling from zero to exponential growth</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                    <span className="text-sm text-gray-700">Growing brands fixing inconsistent lead flows</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                                    <span className="text-sm text-gray-700">Enterprises modernizing legacy marketing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} ref={el => statsRef.current[i] = el} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                            <div className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 mb-2">
                                {stat.number}
                            </div>
                            <p className="text-xs md:text-sm text-gray-600 font-medium uppercase tracking-wide">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutHeroSection;
