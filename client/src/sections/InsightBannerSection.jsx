import React, { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bannerBg from '../assets/images/insight_banner_bg.png';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const InsightBannerSection = () => {
    const sectionRef = useRef(null);
    const boxRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                boxRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        once: true
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section 
            ref={sectionRef}
            className="relative w-full z-[60] h-0"
        >
            <div className="container mx-auto px-6 relative max-w-7xl">
                {/* Floating Navy Box - Centered on the seam between sections */}
                <div 
                    ref={boxRef}
                    className="w-full max-w-[85%] md:max-w-[1100px] bg-[#0c0e40] p-8 md:p-10 space-y-4 shadow-2xl -translate-y-1/2 mx-auto"
                >
                    <h2 className="text-xl md:text-2xl font-semibold text-white leading-tight">
                        How are AI-empowered customers shaping tomorrow’s markets?
                    </h2>

                    <p className="text-sm md:text-base text-slate-100 font-light leading-relaxed">
                        Consumers who embrace AI could drive up to 55% of spending by 2030.
                        It’s time to understand the new AI-empowered customer and the expectations
                        that will shape tomorrow’s markets.
                    </p>

                    <Link to="/blog" className="inline-flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-wide hover:gap-3 transition-all duration-300 group">
                        Read the report
                        <Play className="w-3 h-3 fill-cyan-400" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default InsightBannerSection;
