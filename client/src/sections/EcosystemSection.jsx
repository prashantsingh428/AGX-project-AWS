import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Search } from 'lucide-react';
import officeImage from '../assets/images/modern_office_collab.png';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ClickSpark from '../components/ClickSpark';

gsap.registerPlugin(ScrollTrigger);

// Import client logos
const imagesGlob = import.meta.glob('../assets/images/clients/*.{png,svg,webp,jpeg,jpg}', { eager: true, query: '?url', import: 'default' });
const clientImages = Object.values(imagesGlob);

const EcosystemSection = () => {
    const sectionRef = useRef(null);
    const topTierRef = useRef(null);
    const bottomTierRef = useRef(null);
    const pinnedContainerRef = useRef(null);
    const logoCardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                // Pinning Interaction for Bottom Tier - "Full Slide" Experience
                ScrollTrigger.create({
                    trigger: bottomTierRef.current,
                    start: "top 100px",
                    end: "bottom bottom",
                    pin: pinnedContainerRef.current,
                    pinSpacing: true,
                    anticipatePin: 1
                });

                // Top Tier Animation
                gsap.fromTo(
                    topTierRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: topTierRef.current,
                            start: 'top 90%',
                            once: true
                        }
                    }
                );
            });

            // Mobile/Universal animations
            mm.add("(max-width: 1023px)", () => {
                gsap.fromTo(
                    topTierRef.current.children,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: topTierRef.current,
                            start: 'top 80%',
                            once: true
                        }
                    }
                );
            });

            // Animate Logo Cards (Universal)
            logoCardsRef.current.forEach((card, index) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { scale: 0.9, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.2,
                        delay: index * 0.02,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 95%',
                            once: true
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Use only unique logos as requested
    const displayLogos = clientImages;

    return (
        <section
            ref={sectionRef}
            className="pb-24 md:pb-40 pt-32 md:pt-40 bg-slate-100 relative z-50 overflow-hidden"
        >
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Top Tier: Innovation Overview */}
                <div ref={topTierRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-32 md:mb-48">
                    <div className="lg:col-span-5 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                            Bringing Together <br />
                            <span className="text-primary italic">World-Class Innovation</span>
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                AI Growth Exa works with global technology leaders to address complex operational and business challenges through perpetually adaptive intelligence.
                            </p>
                            <p>
                                As an ecosystem orchestrator, we provide our clients curated, best-in-class components from a network of technology partners and innovators.
                            </p>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <div className="relative rounded-none overflow-hidden shadow-none w-full max-w-[800px] h-[340px] mx-auto lg:ml-auto">
                            <img
                                src={officeImage}
                                alt="Innovation Hub"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Discovery Banner: Ecosystem Search Mockup - Scaled Down & Theme Aligned */}
            <div className="bg-gradient-to-r from-[#1D3557] to-[#2A4A7F] py-12 my-16 md:my-24 relative overflow-hidden">
                {/* Subtle Geometric Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-white blur-3xl"></div>
                    <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-white blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                        {/* Left: Search Interaction */}
                        <div className="lg:col-span-7 space-y-6">
                            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                                Discover more about <br />
                                AI Growth Exa Ecosystem
                            </h2>
                            <div className="space-y-3">
                                <p className="text-base text-white/70 font-medium">
                                    Let our AI-powered search help you
                                </p>
                                <div className="relative group max-w-xl">
                                    <input
                                        type="text"
                                        placeholder="Search ..."
                                        className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 pr-20 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-white/30 transition-all duration-300 backdrop-blur-sm cursor-target"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-4">
                                        <Search className="w-4 h-4 text-white/30" />
                                        <div className="h-6 w-[1px] bg-white/10"></div>
                                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Suggested Topics */}
                        <div className="lg:col-span-5 lg:border-l lg:border-white/5 lg:pl-12 space-y-4">
                            <h4 className="text-lg font-bold text-white mb-4">We think these topics might interest you</h4>
                            <div className="grid gap-2">
                                {[
                                    'AI Growth Exa innovation partnerships',
                                    'Collaborative digital ecosystems',
                                    'Enterprise co-innovation platforms'
                                ].map((topic) => (
                                    <Link
                                        key={topic}
                                        to="/blog"
                                        className="flex items-center justify-between w-full p-3 bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 group text-left cursor-target"
                                    >
                                        <span className="text-white/80 text-xs font-medium pr-4">{topic}</span>
                                        <Search className="w-3 h-3 text-white/30 group-hover:text-white transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl">

                {/* Bottom Tier: Partner Ecosystem - Reversed Layout */}
                <div ref={bottomTierRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Left: Scrolling Logos Grid (Moved to Left) */}
                    <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-6 lg:order-1">
                        {displayLogos.map((logo, idx) => (
                            <div
                                key={idx}
                                ref={(el) => (logoCardsRef.current[idx] = el)}
                                className="aspect-[16/10] bg-white border border-slate-100 rounded-none shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-500 group overflow-hidden"
                            >
                                <ClickSpark
                                    sparkColor="#1D3557"
                                    sparkSize={8}
                                    sparkRadius={20}
                                    sparkCount={8}
                                    duration={400}
                                >
                                    <div className="w-full h-full flex items-center justify-center p-6 cursor-pointer">
                                        <img
                                            src={logo}
                                            alt="Partner Logo"
                                            className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </ClickSpark>
                            </div>
                        ))}
                    </div>

                    {/* Right: Pinned Text Container (Moved to Right) */}
                    <div ref={pinnedContainerRef} className="lg:col-span-5 space-y-8 lg:order-2">
                        <ScrollReveal
                            as="h2"
                            trigger={bottomTierRef}
                            baseRotation={2}
                            enableBlur={true}
                            baseOpacity={0.1}
                            containerClassName="text-4xl md:text-5xl font-black text-slate-900 leading-tight"
                        >
                            Strategic Alliance Partner Ecosystem
                        </ScrollReveal>
                        <div className="space-y-6">
                            <ScrollReveal
                                as="p"
                                trigger={bottomTierRef}
                                baseRotation={0}
                                enableBlur={true}
                                baseOpacity={0.2}
                                containerClassName="text-lg text-slate-600 leading-relaxed"
                            >
                                With a deep focus on AI/GenAI and cloud, we drive partnerships with the world's leading technology firms to create new and differentiated solutions.
                            </ScrollReveal>
                            <ScrollReveal
                                as="p"
                                trigger={bottomTierRef}
                                baseRotation={0}
                                enableBlur={true}
                                baseOpacity={0.2}
                                containerClassName="text-lg text-slate-600 leading-relaxed"
                            >
                                AI Growth Exa's vast experience and business acumen coupled with these dynamic innovators enable us to solve your business problems so you can thrive.
                            </ScrollReveal>
                        </div>
                        <Link to="/contact" className="group inline-flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-700 font-bold text-sm hover:border-primary hover:text-primary transition-all duration-300 shadow-sm">
                            <ScrollReveal
                                as="span"
                                trigger={bottomTierRef}
                                baseRotation={0}
                                enableBlur={false}
                                baseOpacity={0.3}
                                containerClassName="font-bold text-sm"
                            >
                                Click each partner logo to learn more
                            </ScrollReveal>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default EcosystemSection;
