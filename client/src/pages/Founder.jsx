import React, { useEffect, useState, useRef } from 'react';
import {
    BarChart3,
    TrendingUp,
    Cpu,
    Users,
    Target,
    ChevronRight,
    Award,
    Briefcase,
    BookOpen,
    Linkedin,
    Mail,
    Phone,
    Facebook,
    Twitter,
    Youtube
} from 'lucide-react';

import WhatsAppModal from '../components/Modals/WhatsAppModal';
import founderProfile from '../assets/images/founder/founder-profile.png';
import chalkboardBanner from '../assets/images/founder/chalkboard_banner.png';

const FounderIntroduction = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const marketingPlanSteps = [
        { number: "1", title: "Situation (SWOT)", items: ["Identify problem", "Develop solution"] },
        { number: "2", title: "Objectives", items: ["Sales", "Market share"] },
        { number: "3", title: "Strategy", items: ["Segment-target", "Positioning"] },
        { number: "4", title: "Action Plan", items: ["Budget allocation", "Execution"] },
        { number: "5", title: "Forecasts", items: ["Quality", "Quantity"] },
        { number: "6", title: "Control", items: ["Evaluate results", "Adjustments"] }
    ];

    const professionalJourney = [
        { date: "STAGE 1", title: "Intern", desc: "Started from ground up" },
        { date: "STAGE 2", title: "Digital Marketing Specialist", desc: "Hands-on execution" },
        { date: "STAGE 3", title: "Digital Marketing Manager", desc: "Team leadership" },
        { date: "STAGE 4", title: "Chief Marketing Officer", desc: "Strategic oversight" },
        { date: "STAGE 5", title: "Founder & Growth Architect", desc: "AI Growth Exa" }
    ];

    return (
        <div className="min-h-screen bg-black font-sans selection:bg-primary selection:text-white">
            <WhatsAppModal isOpen={isWhatsAppModalOpen} onClose={() => setIsWhatsAppModalOpen(false)} />

            {/* 1. HERO SECTION (DARK) */}
            <section ref={heroRef} className="relative pt-32 pb-0 md:pt-40 overflow-hidden bg-black text-white border-b border-white/10">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-end justify-between">
                        
                        {/* Hero Text Content */}
                        <div className={`lg:w-1/2 pb-20 lg:pb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                                Growth Strategist, <br />
                                AI Architect <br />
                                & Founder
                            </h1>
                            <div className="w-16 h-1 bg-primary mb-8"></div>
                            <p className="text-gray-400 text-lg md:text-xl max-w-md leading-relaxed">
                                Priyanshu Srivastava is a growth-focused strategist and AI marketing architect who believes marketing should not just look good — it should perform, convert, and scale.
                            </p>
                        </div>

                        {/* Hero Image */}
                        <div className={`lg:w-1/2 relative flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="relative w-[300px] md:w-[450px] lg:w-[500px]">
                                {/* Subtle glow behind image */}
                                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
                                <img
                                    src={founderProfile}
                                    alt="Priyanshu Srivastava"
                                    className="relative z-10 w-full h-auto object-contain filter drop-shadow-2xl"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Logo Bar - Featured / Industries */}
                    <div className="border-t border-white/20 py-8 flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 md:gap-12">
                        <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Industries Served:</span>
                        <div className="flex flex-wrap items-center justify-center gap-8 text-xl font-bold text-gray-300 opacity-80">
                            <span>HEALTHCARE</span>
                            <span>SaaS & IT</span>
                            <span>REAL ESTATE</span>
                            <span>ENTERPRISE</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT & STATS SECTION (WHITE) */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    
                    <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
                        {/* Left: Bio & Button */}
                        <div className="lg:w-1/3">
                            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
                                Building <br />Growth That <br />Lasts.
                            </h2>
                            <div className="w-12 h-1 bg-primary mb-6"></div>
                            <p className="text-gray-600 mb-8 italic">
                                "Behind every scalable brand is a growth mind that understands both numbers and people."
                            </p>
                            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                                He founded AI Growth Exa with one clear vision: To replace guesswork marketing with intelligent, data-backed growth systems. In a market full of noise, trends, and shortcuts, Priyanshu focuses on clarity, systems, and results.
                            </p>
                            <a href="mailto:contact@aigrowthexa.com" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-bold uppercase tracking-wider text-black hover:bg-gray-50 hover:border-gray-400 transition-all rounded-sm">
                                Contact Priyanshu <ChevronRight className="ml-2 w-4 h-4" />
                            </a>
                        </div>

                        {/* Center: Cutout Image with Label */}
                        <div className="lg:w-1/3 flex justify-center relative">
                            <img
                                src={founderProfile}
                                alt="Priyanshu Profile"
                                className="w-64 h-auto object-contain filter drop-shadow-xl z-10"
                            />
                            {/* Yellow Label */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#ffcc00] text-black font-bold text-2xl px-6 py-2 rotate-[-2deg] z-20 whitespace-nowrap shadow-md">
                                Connect Today
                            </div>
                        </div>

                        {/* Right: Core Focus */}
                        <div className="lg:w-1/3 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-black mb-4 border-b-2 border-primary inline-block pb-1 self-start">Core Focus:</h3>
                            <div className="space-y-6 mt-6">
                                <div className="flex gap-4 items-start">
                                    <Target className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-black">Growth Strategy Design</h4>
                                        <p className="text-sm text-gray-500">Building scalable roadmaps.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <TrendingUp className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-black">Performance Marketing</h4>
                                        <p className="text-sm text-gray-500">ROI-focused ad systems.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <Cpu className="w-6 h-6 text-gray-400 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-black">AI Automation</h4>
                                        <p className="text-sm text-gray-500">Smarter funnels & targeting.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-gray-100">
                        <div className="text-center">
                            <div className="text-5xl font-light text-black mb-2">5.8+</div>
                            <div className="w-8 h-0.5 bg-[#ffcc00] mx-auto mb-3"></div>
                            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Years Exp.</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-light text-black mb-2">2CR</div>
                            <div className="w-8 h-0.5 bg-[#ffcc00] mx-auto mb-3"></div>
                            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Budgets Managed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-light text-black mb-2">1600+</div>
                            <div className="w-8 h-0.5 bg-[#ffcc00] mx-auto mb-3"></div>
                            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Projects Delivered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-light text-black mb-2">Top</div>
                            <div className="w-8 h-0.5 bg-[#ffcc00] mx-auto mb-3"></div>
                            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">ROAS Proven</div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 3. TEXTURED BANNER */}
            <section className="relative py-32 bg-black flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img src={chalkboardBanner} alt="Texture" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/50"></div>
                
                <div className="relative z-10 container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-wide uppercase max-w-5xl mx-auto leading-tight">
                        "Anyone can run ads. <br />
                        <span className="font-medium text-white/90 border-b border-white/20 pb-2">Very few can build growth that lasts."</span>
                    </h2>
                </div>
            </section>

            {/* 4. JOURNEY & CONTACT (WHITE) */}
            <section className="bg-white py-24">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    <div className="flex flex-col lg:flex-row gap-16 mb-20">
                        {/* Left: Journey Timeline */}
                        <div className="lg:w-3/5">
                            <h2 className="text-2xl font-bold mb-8 text-black">Professional Journey</h2>
                            <div className="space-y-6">
                                {professionalJourney.map((item, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row border-b border-gray-100 pb-6 group">
                                        <div className="sm:w-32 flex-shrink-0 pt-1">
                                            <span className="text-sm font-bold text-black uppercase">{item.date}</span>
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold text-black mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                            <p className="text-gray-500 text-sm flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#ffcc00]"></span>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Contact Card (Sticky) */}
                        <div className="lg:w-2/5 relative">
                            <div className="sticky top-24 bg-black text-white p-10 w-full max-w-md ml-auto flex flex-col overflow-hidden rounded-xl shadow-2xl border border-white/10">
                                <h3 className="text-2xl font-bold mb-8 z-10 leading-snug">
                                    CONNECT WITH <br/>PRIYANSHU TODAY
                                </h3>
                                <a href="mailto:contact@aigrowthexa.com" className="inline-flex items-center justify-between px-6 py-4 border border-white/20 text-sm font-bold uppercase tracking-wider text-white hover:bg-white hover:text-black transition-all mb-4 z-10 rounded-lg">
                                    Send an Email <ChevronRight className="w-4 h-4" />
                                </a>
                                <button onClick={() => setIsWhatsAppModalOpen(true)} className="inline-flex items-center justify-between px-6 py-4 border border-[#25D366] bg-[#25D366]/10 text-sm font-bold uppercase tracking-wider text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all z-10 rounded-lg">
                                    Chat on WhatsApp <Phone className="w-4 h-4" />
                                </button>

                                {/* Decorative Image in corner */}
                                <img
                                    src={founderProfile}
                                    alt="Priyanshu"
                                    className="absolute -bottom-10 -right-10 w-64 h-auto opacity-30 pointer-events-none filter grayscale mix-blend-screen"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Full Width: 6-Step Growth Plan */}
                    <div className="border-t border-gray-100 pt-20">
                        <div className="text-center mb-12">
                            <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-600 text-xs font-bold tracking-widest uppercase mb-4">Framework</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-black">The 6-Step Growth Plan</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {marketingPlanSteps.map((step, i) => (
                                <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center font-bold text-black flex-shrink-0 text-lg">
                                        {step.number}
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="font-bold text-black text-lg mb-2">{step.title}</h4>
                                        <p className="text-sm text-gray-500 leading-relaxed">{step.items.join(' • ')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* 5. FOOTER SOCIAL BLOCKS */}
            <div className="flex flex-col sm:flex-row w-full bg-[#f4f4f4] border-t border-gray-200">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex-1 py-8 flex flex-col items-center justify-center gap-3 text-gray-400 hover:bg-white hover:text-[#0077b5] transition-all border-b sm:border-b-0 sm:border-r border-gray-200">
                    <Linkedin className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Connect on LinkedIn</span>
                </a>
                <a href="mailto:contact@aigrowthexa.com" className="flex-1 py-8 flex flex-col items-center justify-center gap-3 text-gray-400 hover:bg-white hover:text-primary transition-all border-b sm:border-b-0 sm:border-r border-gray-200">
                    <Mail className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">Email Direct</span>
                </a>
                <button onClick={() => setIsWhatsAppModalOpen(true)} className="flex-1 py-8 flex flex-col items-center justify-center gap-3 text-gray-400 hover:bg-white hover:text-[#25D366] transition-all border-b sm:border-b-0 sm:border-r border-gray-200">
                    <Phone className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">WhatsApp</span>
                </button>
                <a href="#" className="flex-1 py-8 flex flex-col items-center justify-center gap-3 text-gray-400 hover:bg-white hover:text-black transition-all">
                    <Award className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-wider">View Portfolio</span>
                </a>
            </div>

        </div>
    );
};

export default FounderIntroduction;
