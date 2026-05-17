import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Award, ShieldCheck, Handshake, Target, TrendingUp, Cpu, Users, ChevronRight } from 'lucide-react';

// Import images from original Awards
import cert1 from '../assets/images/certifications/cert-1.jpeg';
import cert2 from '../assets/images/certifications/cert-2.jpeg';
import cert3 from '../assets/images/certifications/cert-3.jpeg';
import cert4 from '../assets/images/certifications/cert-4.jpeg';
import award1 from '../assets/images/awards/award-1.jpeg';
import award2 from '../assets/images/awards/award-2.jpeg';
import awardsHero from '../assets/images/awards_hero.png';

const PremiumAwards = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const location = useLocation();

    // Data mapped directly from original Awards.jsx
    const certifications = [
        { id: 1, title: "Google Digital Marketing", issuer: "Google", date: "Dec 2023", imageUrl: cert1 },
        { id: 2, title: "Google Ads Search", issuer: "Google", date: "Dec 2023", imageUrl: cert2 },
        { id: 3, title: "Google Analytics 4", issuer: "LinkedIn Learning", date: "Dec 2021", imageUrl: cert3 },
        { id: 4, title: "UX/UI Fundamentals", issuer: "Simplilearn", date: "2022", imageUrl: cert4 }
    ];

    const awards = [
        {
            id: 1,
            title: "Certificate of Achievement - Google Business Profile",
            description: "Awarded for outstanding contribution and expertise in Google Business Profile optimization and local SEO growth strategies.",
            issuer: "Annual Community Recognition Event",
            date: "2024",
            imageUrl: award1,
            achievements: ["Local SEO growth systems", "Reputation & review management", "Local visibility strategies"]
        },
        {
            id: 2,
            title: "Meta Certified Company Recognition",
            description: "Officially recognized by Meta for excellence in digital advertising and campaign management.",
            issuer: "Meta (Facebook & Instagram)",
            date: "2024",
            imageUrl: award2,
            achievements: ["Policy-aligned advertising practices", "Advanced campaign optimization", "Ethical media buying at scale"]
        }
    ];

    const results = [
        { icon: <TrendingUp size={24}/>, title: "Lower CPL", desc: "Cost-effective acquisition", stat: "40% reduction" },
        { icon: <Target size={24}/>, title: "Higher ROAS", desc: "Maximum return on ad spend", stat: "3.5x average" },
        { icon: <Cpu size={24}/>, title: "Scalable Systems", desc: "Sustainable frameworks", stat: "100% scalable" },
        { icon: <Users size={24}/>, title: "Client Partnerships", desc: "Long-term collaborations", stat: "95% retention" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-primary selection:text-white">
            
            {/* 1. HERO SECTION */}
            <section className="relative w-full h-[60vh] md:h-[70vh] bg-white border-b-2 border-primary/30 overflow-hidden">
                <div className="absolute inset-0">
                    <img src={awardsHero} alt="Premium Office" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
                </div>
                
                <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
                    <div className="max-w-2xl bg-white/90 backdrop-blur-md p-10 border-l-4 border-primary shadow-xl">
                        <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Recognized Excellence</span>
                        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6 leading-tight">
                            Awards & <br/>Recognition
                        </h1>
                        <p className="text-gray-600 text-lg md:text-xl font-light">
                            At AI Growth Exa, recognition validates our expertise, but results define our success. We are qualified, tested, and trusted.
                        </p>
                    </div>
                </div>
            </section>

            <main className="container mx-auto px-6 max-w-7xl py-24 space-y-32">
                
                {/* 2. GRID & GOLD BOX SECTION */}
                <section className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left Grid: Certifications */}
                    <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                        {certifications.map((cert) => (
                            <div key={cert.id} className="group relative cursor-pointer" onClick={() => setSelectedImage(cert.imageUrl)}>
                                <div className="border border-gray-200 bg-white p-2 hover:border-primary transition-colors h-full shadow-sm">
                                    <div className="h-40 overflow-hidden mb-3 relative">
                                        <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                                    </div>
                                    <div className="text-center px-2 pb-2">
                                        <h3 className="text-primary font-serif text-sm font-bold truncate">{cert.title}</h3>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">{cert.issuer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Gold Box */}
                    <div className="lg:w-1/2 bg-primary p-10 lg:p-14 shadow-2xl relative">
                        {/* Decorative corner pieces */}
                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-white/50"></div>
                        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-white/50"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-white/50"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-white/50"></div>

                        <h2 className="text-3xl font-serif text-white mb-6 font-bold">Global Standards of Excellence</h2>
                        <p className="text-white/90 text-lg mb-8 font-medium leading-relaxed">
                            Validated hands-on, real-world digital marketing expertise. Trusted by leading organizations and recognized by global platforms.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-white/20 p-4 border border-white/30 text-center">
                                <div className="text-2xl text-white font-bold">50+</div>
                                <div className="text-sm text-white/90 uppercase font-semibold">Certifications</div>
                            </div>
                            <div className="bg-white/20 p-4 border border-white/30 text-center">
                                <div className="text-2xl text-white font-bold">100%</div>
                                <div className="text-sm text-white/90 uppercase font-semibold">Satisfaction</div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-white text-primary py-3 px-4 font-bold uppercase tracking-wider text-sm hover:bg-gray-50 transition-colors shadow-md">
                                View Awards
                            </button>
                            <button className="flex-1 border-2 border-white text-white py-3 px-4 font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors">
                                View Partners
                            </button>
                        </div>
                    </div>
                </section>

                {/* Divider Line */}
                <div className="flex items-center justify-center">
                    <div className="w-1/3 h-px bg-gradient-to-r from-transparent to-primary/50"></div>
                    <div className="mx-4 text-primary"><Award size={24} /></div>
                    <div className="w-1/3 h-px bg-gradient-to-l from-transparent to-primary/50"></div>
                </div>

                {/* 3. SPLIT AWARD DETAIL VIEW */}
                <section className="flex flex-col lg:flex-row gap-16">
                    {awards.map((award, index) => (
                        <div key={award.id} className="lg:w-1/2 flex flex-col sm:flex-row gap-8 bg-white p-8 border border-gray-100 hover:border-primary/40 transition-colors shadow-xl relative">
                            {/* Number Background */}
                            <div className="absolute top-4 right-4 text-6xl font-serif font-black text-gray-100 pointer-events-none">
                                0{index + 1}
                            </div>
                            
                            <div className="w-full sm:w-2/5 cursor-pointer" onClick={() => setSelectedImage(award.imageUrl)}>
                                <div className="border-4 border-primary p-1 bg-white h-full shadow-md">
                                    <img src={award.imageUrl} alt={award.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="w-full sm:w-3/5 relative z-10">
                                <h3 className="text-xl font-serif text-primary mb-2 font-bold">{award.title}</h3>
                                <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-widest mb-6 font-semibold">
                                    <span>{award.issuer}</span>
                                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                                    <span>{award.date}</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    {award.description}
                                </p>
                                
                                <div className="space-y-3 mb-8">
                                    {award.achievements.map((ach, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 font-bold" />
                                            <span className="text-gray-700 text-sm font-medium">{ach}</span>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={() => setSelectedImage(award.imageUrl)} className="px-6 py-2 border-2 border-primary text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors">
                                    View Certificate
                                </button>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Divider Line */}
                <div className="flex items-center justify-center">
                    <div className="w-1/3 h-px bg-gradient-to-r from-transparent to-primary/50"></div>
                    <div className="mx-4 text-primary font-serif italic text-lg font-bold">Results Matter</div>
                    <div className="w-1/3 h-px bg-gradient-to-l from-transparent to-primary/50"></div>
                </div>

                {/* 4. FOUR BOTTOM CARDS */}
                <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.map((res, i) => (
                        <div key={i} className="bg-white border border-gray-100 shadow-lg p-8 flex flex-col items-center text-center hover:bg-gray-50 transition-colors group relative overflow-hidden">
                            {/* Subtle top border glow */}
                            <div className="absolute top-0 inset-x-0 h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            
                            <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                {res.icon}
                            </div>
                            <h4 className="text-gray-900 font-serif text-lg font-bold mb-2">{res.title}</h4>
                            <div className="text-3xl text-primary font-bold mb-4">{res.stat}</div>
                            <p className="text-gray-500 text-sm uppercase tracking-wider font-semibold">{res.desc}</p>
                        </div>
                    ))}
                </section>

                {/* CTA */}
                <section className="mt-20 border border-gray-200 shadow-xl p-12 text-center bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-serif text-gray-900 mb-6 font-bold">Ready to Partner with Excellence?</h2>
                        <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">Work with a team that's not just certified, but proven to deliver measurable growth and results.</p>
                        <Link to="/contact" state={{ background: location }} className="inline-block bg-primary text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors shadow-lg">
                            Customize Your Growth Plan
                        </Link>
                    </div>
                </section>

            </main>

            {/* Lightbox Modal */}
            {selectedImage && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 transition-opacity duration-300" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-5xl max-h-[90vh] w-full flex justify-center">
                        <button className="absolute -top-12 right-0 text-white hover:text-primary transition-colors focus:outline-none" onClick={() => setSelectedImage(null)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img src={selectedImage} alt="Full View" className="w-full h-full object-contain max-h-[90vh] shadow-2xl border border-primary/30" onClick={(e) => e.stopPropagation()} />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default PremiumAwards;
