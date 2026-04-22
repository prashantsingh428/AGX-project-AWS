import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import officeImage from '../assets/images/modern_office_collab.png';

gsap.registerPlugin(ScrollTrigger);

// Import client logos
const imagesGlob = import.meta.glob('../assets/images/clients/*.{png,svg,webp,jpeg,jpg}', { eager: true, as: 'url' });
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
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
                            once: true
                        }
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Ensure we have enough logos for a 3-column grid (multiple rows)
    const displayLogos = clientImages.length > 0
        ? [...clientImages, ...clientImages, ...clientImages].slice(0, 24) // More logos for a better scroll experience
        : [];

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
                            <p>
                                This collaboration is designed to drive lasting value and accelerate digital transformations by leveraging an innovative mindset and deep AI expertise.
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

                {/* Bottom Tier: Partner Ecosystem - The Pinning Area */}
                <div ref={bottomTierRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    {/* Left: Pinned Text Container */}
                    <div ref={pinnedContainerRef} className="lg:col-span-5 space-y-8">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                            Strategic Alliance <br />
                            Partner Ecosystem
                        </h2>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                            <p>
                                With a deep focus on AI/GenAI and cloud, we drive partnerships with the world's leading technology firms to create new and differentiated solutions.
                            </p>
                            <p>
                                AI Growth Exa's vast experience and business acumen coupled with these dynamic innovators enable us to solve your business problems so you can thrive.
                            </p>
                        </div>
                        <button className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-700 font-bold text-sm hover:border-primary hover:text-primary transition-all duration-300 shadow-sm">
                            Click each partner logo to learn more
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Right: Scrolling Logos Grid */}
                    <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayLogos.map((logo, idx) => (
                            <div
                                key={idx}
                                ref={(el) => (logoCardsRef.current[idx] = el)}
                                className="aspect-[16/10] bg-white border border-slate-100 rounded-none flex items-center justify-center p-6 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-500 group"
                            >
                                <img
                                    src={logo}
                                    alt="Partner Logo"
                                    className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default EcosystemSection;
