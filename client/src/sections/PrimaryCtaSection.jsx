import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingParticles from '../components/FloatingParticles';
import StarBorder from '../components/StarBorder';
import PlansModal from '../components/Modals/PlansModal';
import StrategyCallModal from '../components/Modals/StrategyCallModal';

gsap.registerPlugin(ScrollTrigger);

const PrimaryCtaSection = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const [isPlansOpen, setIsPlansOpen] = React.useState(false);
    const [isStrategyOpen, setIsStrategyOpen] = React.useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-20 lg:py-24 flex items-center justify-center overflow-hidden bg-black">
            {/* Dark Background Glow Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(29,52,97,0.25)_0%,transparent_70%)] opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-30"></div>
            </div>

            {/* Particle Background */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <FloatingParticles theme="light" />
            </div>

            <div ref={contentRef} className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Column: Heading & Buttons */}
                    <div className="text-left space-y-8">
                        <div className="inline-block px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                            <span className="text-primary text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
                                ✦ Limitless Scalability
                            </span>
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05] tracking-tight text-white mb-6">
                            Ready to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                                Dominate Your Market?
                            </span>
                        </h2>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-xl font-medium mb-8">
                            Stop guessing. Start scaling. We build the infrastructure that powers predictable, high-ROI growth for ambitious brands.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 pt-2">
                            <button
                                onClick={() => setIsPlansOpen(true)}
                                className="group relative"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/40 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
                                <div className="relative px-8 py-4 bg-white text-primary rounded-full font-bold text-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2">
                                    Book Strategy Call
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                            </button>

                            <button
                                onClick={() => setIsPlansOpen(true)}
                                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full font-bold text-base transition-all transform hover:scale-105 backdrop-blur-sm flex items-center justify-center gap-2"
                            >
                                View Service Plans
                            </button>
                        </div>

                        {/* Trusted By Ticker - Expanded Content */}
                        <div className="mt-10 pt-8 border-t border-white/10">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Trusted by fast-growing brands</p>
                            <div className="flex flex-wrap gap-6 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="h-6 w-20 bg-white/20 rounded"></div>
                                <div className="h-6 w-24 bg-white/20 rounded"></div>
                                <div className="h-6 w-16 bg-white/20 rounded"></div>
                                <div className="h-6 w-20 bg-white/20 rounded"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Value Props */}
                    <div className="bg-gray-900/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                        <h3 className="text-2xl font-bold text-white mb-6">Why Partner With Us?</h3>

                        <ul className="space-y-4">
                            {[
                                { title: "Data-Driven Strategy", desc: "No guesswork. Just precision execution based on real metrics." },
                                { title: "Full-Stack AI Integration", desc: "Automate workflows and scale faster with cutting-edge tech." },
                                { title: "Dedicated Growth Team", desc: "Access to experts who treat your business like their own." },
                                { title: "Rapid Experimentation", desc: "Fast feedback loops to identify winning campaigns quickly." },
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="mt-1 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">{item.title}</h4>
                                        <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div >

            <PlansModal isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} />
            <StrategyCallModal isOpen={isStrategyOpen} onClose={() => setIsStrategyOpen(false)} />
        </section >
    );
};

export default PrimaryCtaSection;