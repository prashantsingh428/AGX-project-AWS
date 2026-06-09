import React from 'react';
import limitlessImage from '../assets/images/limitless_collaboration.png';
import { Link } from 'react-router-dom';
import RotatingText from '../components/RotatingText';

const LimitlessSection = () => {
    return (
        <section className="relative h-[480px] md:h-[590px] w-full overflow-hidden flex items-center">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={limitlessImage} 
                    alt="Limitless Together" 
                    className="w-full h-full object-cover md:w-[125%] md:max-w-none md:absolute md:left-[-15%] md:top-0"
                />
                <div className="absolute inset-0 bg-black/65"></div> {/* Dark overlay for text readability */}
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-6 lg:px-24 max-w-7xl relative z-10">
                <div className="max-w-3xl space-y-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight antialiased uppercase tracking-tight flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>We Are</span>
                        <RotatingText
                            texts={['Limitless', 'Growing', 'Scaling', 'Succeeding', 'Innovating']}
                            mainClassName="px-3 md:px-4 bg-[#e6b446] text-black border border-[#e6b446]/20 overflow-hidden py-1 justify-center rounded-xl inline-flex text-2xl md:text-4xl font-black"
                            staggerFrom="last"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                            splitBy="characters"
                            auto
                            loop
                        />
                        <span>Together</span>
                    </h2>
                    <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-2xl font-normal antialiased">
                        At AI Growth Exa, you're not just joining a company – you're becoming part of a community. Let's be limitless together.
                    </p>
                    <div className="pt-4">
                        <Link to="/careers" className="inline-block px-10 py-3 bg-white text-slate-950 font-bold uppercase tracking-widest text-xs hover:bg-slate-100 transition-all duration-300 shadow-xl">
                            KNOW MORE
                        </Link>
                    </div>
                </div>
            </div>

            {/* Diagonal Lines Detail at Bottom Right (Reference matching) */}
            <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
                <svg width="100%" height="100%" className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 scale-150 transform rotate-[-25deg]">
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="0.5" />
                    {Array.from({ length: 15 }).map((_, i) => (
                        <line
                            key={i}
                            x1="0"
                            y1={`${i * 5}%`}
                            x2="100%"
                            y2={`${i * 5}%`}
                            stroke="white"
                            strokeWidth="1"
                            opacity={1 - (i * 0.05)}
                        />
                    ))}
                </svg>
            </div>
        </section>
    );
};

export default LimitlessSection;
