import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';

import cert1 from '../assets/images/certifications/cert-1.jpeg';
import cert2 from '../assets/images/certifications/cert-2.jpeg';
import cert3 from '../assets/images/certifications/cert-3.jpeg';
import cert4 from '../assets/images/certifications/cert-4.jpeg';

import award1 from '../assets/images/awards/award-1.jpeg';
import award2 from '../assets/images/awards/award-2.jpeg';

const Awards = () => {
    const [activeTab, setActiveTab] = useState('awards');
    const [tabAnimation, setTabAnimation] = useState('slide-up');
    const [selectedImage, setSelectedImage] = useState(null);
    const tabContentRef = useRef(null);
    const location = useLocation();

    // Certification data
    const certifications = [
        {
            id: 1,
            title: "Google Digital Marketing & E-commerce",
            description: "Comprehensive certification covering digital marketing foundations, customer acquisition, and e-commerce growth systems.",
            issuer: "Google",
            date: "December 2023",
            imageUrl: cert1,
            altText: "Google Digital Marketing Certification"
        },
        {
            id: 2,
            title: "Google Ads Search Certification",
            description: "Advanced expertise in search campaign structure, keyword targeting, and conversion optimization.",
            issuer: "Google",
            date: "December 2023",
            imageUrl: cert2,
            altText: "Google Ads Search Certification"
        },
        {
            id: 3,
            title: "Google Analytics 4 (GA4) Essential Training",
            description: "Expertise in event-based tracking, funnel analysis, and data-driven decision making.",
            issuer: "LinkedIn Learning",
            date: "December 2021",
            imageUrl: cert3,
            altText: "Google Analytics 4 Certification"
        },
        {
            id: 4,
            title: "UX/UI Fundamentals Certification",
            description: "Expertise in user behavior, conversion-focused design, and experience-led growth systems.",
            issuer: "Simplilearn",
            date: "2022",
            imageUrl: cert4,
            altText: "UX/UI Fundamentals Certification"
        }
    ];

    // Awards data
    const awards = [
        {
            id: 1,
            title: "Certificate of Achievement - Google Business Profile",
            description: "Awarded for outstanding contribution and expertise in Google Business Profile optimization and local SEO growth strategies.",
            issuer: "Annual Community Recognition Event 2024",
            date: "2024",
            imageUrl: award1,
            altText: "Google Business Profile Achievement Award",
            achievements: [
                "Local SEO growth systems",
                "Reputation & review management",
                "Local visibility strategies"
            ]
        },
        {
            id: 2,
            title: "Meta Certified Company Recognition",
            description: "Officially recognized by Meta for excellence in digital advertising and campaign management.",
            issuer: "Meta (Facebook & Instagram)",
            date: "2024",
            imageUrl: award2,
            altText: "Meta Certified Company",
            achievements: [
                "Policy-aligned advertising practices",
                "Advanced campaign optimization",
                "Ethical media buying at scale"
            ]
        }
    ];

    // Partner logos data
    const partners = [
        { name: "Deloitte", logo: "https://via.placeholder.com/150x80/fff/555?text=Deloitte", sector: "Consulting" },
        { name: "McKinsey & Company", logo: "https://via.placeholder.com/150x80/fff/555?text=McKinsey", sector: "Strategy" },
        { name: "EY", logo: "https://via.placeholder.com/150x80/fff/555?text=EY", sector: "Advisory" },
        { name: "KPMG", logo: "https://via.placeholder.com/150x80/fff/555?text=KPMG", sector: "Consulting" },
        { name: "Infosys", logo: "https://via.placeholder.com/150x80/fff/555?text=Infosys", sector: "Technology" },
        { name: "Accenture", logo: "https://via.placeholder.com/150x80/fff/555?text=Accenture", sector: "Digital" },
        { name: "IBM", logo: "https://via.placeholder.com/150x80/fff/555?text=IBM", sector: "Technology" },
        { name: "PwC", logo: "https://via.placeholder.com/150x80/fff/555?text=PwC", sector: "Consulting" },
        { name: "Cognizant", logo: "https://via.placeholder.com/150x80/fff/555?text=Cognizant", sector: "Digital" },
        { name: "Bain & Company", logo: "https://via.placeholder.com/150x80/fff/555?text=Bain", sector: "Strategy" },
        { name: "Capgemini", logo: "https://via.placeholder.com/150x80/fff/555?text=Capgemini", sector: "Technology" },
        { name: "HCL Technologies", logo: "https://via.placeholder.com/150x80/fff/555?text=HCL", sector: "IT Services" }
    ];

    // Results metrics
    const results = [
        {
            icon: "📈",
            title: "Lower CPL",
            desc: "Cost-effective customer acquisition",
            stat: "40% reduction"
        },
        {
            icon: "💰",
            title: "Higher ROAS",
            desc: "Maximum return on ad spend",
            stat: "3.5x average"
        },
        {
            icon: "🚀",
            title: "Scalable Systems",
            desc: "Sustainable growth frameworks",
            stat: "100% scalable"
        },
        {
            icon: "🤝",
            title: "Client Partnerships",
            desc: "Long-term successful collaborations",
            stat: "95% retention"
        }
    ];

    // Handle tab click with animation
    const handleTabClick = (tab) => {
        if (tab === activeTab) {
            setTabAnimation('fade');
            setTimeout(() => {
                setTabAnimation('slide-up');
            }, 50);
        } else {
            setActiveTab(tab);
            setTabAnimation('slide-up');
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
                    entry.target.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-card').forEach(el => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, [activeTab]);

    // Render Awards Content
    const renderAwardsContent = () => (
        <div className={`transition-all duration-500 transform ${tabAnimation === 'fade' ? 'opacity-0' : 'opacity-100 translate-y-0'}`}>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Industry & Community Recognition
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Our work has been recognized by global platforms, industry leaders, and professional institutions.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {awards.map((award) => (
                    <div
                        key={award.id}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 animate-card opacity-0 translate-y-8 scale-95 group"
                    >
                        <div
                            className="relative h-64 overflow-hidden cursor-pointer"
                            onClick={() => setSelectedImage(award.imageUrl)}
                        >
                            <img
                                src={award.imageUrl}
                                alt={award.altText}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white pointer-events-none">
                                <div className="text-xs bg-primary inline-block px-3 py-1 rounded-full">
                                    AWARD
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{award.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            🏢 {award.issuer}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            📅 {award.date}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-4xl">🏆</span>
                            </div>

                            <p className="text-gray-700 mb-6 leading-relaxed">{award.description}</p>

                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                                <ul className="space-y-2">
                                    {award.achievements.map((achievement, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-green-500 mr-2 mt-1">✓</span>
                                            <span className="text-gray-700">{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-gray-200">
                                <span className="text-sm text-gray-500">
                                    Validates our strength in AI-powered growth systems
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Render Certifications Content
    const renderCertificationsContent = () => (
        <div className={`transition-all duration-500 transform ${tabAnimation === 'fade' ? 'opacity-0' : 'opacity-100 translate-y-0'}`}>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Global Certifications & Professional Excellence
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Validated hands-on, real-world digital marketing expertise, not just theory.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {certifications.map((cert) => (
                    <div
                        key={cert.id}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 animate-card opacity-0 translate-y-8 scale-95 group"
                    >
                        <div
                            className="relative h-56 overflow-hidden cursor-pointer"
                            onClick={() => setSelectedImage(cert.imageUrl)}
                        >
                            <img
                                src={cert.imageUrl}
                                alt={cert.altText}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                                <div className="text-xs bg-white text-gray-800 inline-block px-3 py-1 rounded-full font-semibold">
                                    CERTIFIED
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            📋 {cert.issuer}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            🎓 Completed: {cert.date}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-3xl text-primary/80">📜</span>
                            </div>

                            <p className="text-gray-700 mb-6 leading-relaxed">{cert.description}</p>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                                <span className="text-sm text-gray-500">
                                    Certificate ID: {cert.id.toString().padStart(6, '0')}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setSelectedImage(cert.imageUrl)}
                                    className="text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-2"
                                >
                                    View Details
                                    <span>→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Render Partners Content
    const renderPartnersContent = () => (
        <div className={`transition-all duration-500 transform ${tabAnimation === 'fade' ? 'opacity-0' : 'opacity-100 translate-y-0'}`}>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Platform Recognition & Partner Validation
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Trusted by leading organizations and recognized by global platforms.
                </p>
            </div>

            {/* Meta Certification */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center">
                        <div className="inline-block p-6 bg-primary/5 rounded-3xl mb-6">
                            <div className="text-6xl mb-4">📱</div>
                            <div className="text-2xl font-bold text-gray-900">Meta Certified</div>
                            <div className="text-primary font-semibold">Company Recognition</div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://via.placeholder.com/400x250/1877f2/ffffff?text=Meta+Certified+Partner"
                                alt="Meta Certified Company"
                                className="rounded-xl shadow-lg w-full max-w-md mx-auto"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Officially Recognized by Meta</h3>
                        <p className="text-gray-700 mb-6">
                            Acknowledged by Meta (Facebook & Instagram) for excellence in digital advertising and campaign management.
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-green-600">✓</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Policy-Aligned Practices</h4>
                                    <p className="text-gray-600 text-sm">Compliant advertising following Meta's guidelines</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-primary">⚡</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Advanced Optimization</h4>
                                    <p className="text-gray-600 text-sm">Data-driven campaign performance enhancement</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-purple-600">💎</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900">Ethical Media Buying</h4>
                                    <p className="text-gray-600 text-sm">Transparent and responsible advertising</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <p className="text-gray-700 italic">
                                "This recognition confirms our ability to manage high-performance paid media campaigns at scale with measurable results."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Partner Logos */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">
                    Trusted by Industry Leaders
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-10">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-6 rounded-xl flex flex-col items-center justify-center h-32 hover:shadow-lg transition-all duration-300 animate-card opacity-0 translate-y-8 hover:-translate-y-2 group"
                        >
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="max-h-12 mx-auto opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="text-center mt-2">
                                <div className="text-xs font-semibold text-gray-700">{partner.name}</div>
                                <div className="text-xs text-gray-500">{partner.sector}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Hero Section */}
                <section className="text-center mb-16 animate-fade-in">
                    <div className="mb-10">
                        <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                            Recognized Excellence
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Awards & Recognition
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            At <span className="text-primary font-semibold">AI Growth Exa</span>, recognition validates our expertise, but results define our success.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-primary/5 to-gray-50 p-8 rounded-2xl max-w-4xl mx-auto border border-primary/10">
                        <blockquote className="text-2xl md:text-3xl text-gray-800 leading-relaxed font-medium">
                            "We don't just talk about growth.<br />
                            <span className="font-bold text-primary">We're qualified, tested, and trusted to deliver it.</span>"
                        </blockquote>
                    </div>
                </section>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <div className="text-3xl font-bold text-primary mb-2">50+</div>
                        <div className="text-gray-600">Certifications</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <div className="text-3xl font-bold text-primary mb-2">24</div>
                        <div className="text-gray-600">Industry Awards</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <div className="text-3xl font-bold text-primary mb-2">12</div>
                        <div className="text-gray-600">Global Partners</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow text-center">
                        <div className="text-3xl font-bold text-primary mb-2">100%</div>
                        <div className="text-gray-600">Client Satisfaction</div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="mb-12">
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <button
                            onClick={() => handleTabClick('awards')}
                            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${activeTab === 'awards'
                                ? 'bg-primary text-white shadow-lg transform -translate-y-1'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-primary/50'
                                }`}
                        >
                            <span className="text-2xl">🏆</span>
                            Awards & Recognition
                        </button>
                        <button
                            onClick={() => handleTabClick('certifications')}
                            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${activeTab === 'certifications'
                                ? 'bg-primary text-white shadow-lg transform -translate-y-1'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-primary/50'
                                }`}
                        >
                            <span className="text-2xl">📜</span>
                            Certifications
                        </button>
                        <button
                            onClick={() => handleTabClick('partners')}
                            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 ${activeTab === 'partners'
                                ? 'bg-primary text-white shadow-lg transform -translate-y-1'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-primary/50'
                                }`}
                        >
                            <span className="text-2xl">🤝</span>
                            Partner Recognition
                        </button>
                    </div>

                    <div ref={tabContentRef}>
                        {activeTab === 'awards' && renderAwardsContent()}
                        {activeTab === 'certifications' && renderCertificationsContent()}
                        {activeTab === 'partners' && renderPartnersContent()}
                    </div>
                </div>

                {/* Results Focus Section */}
                <section className="mb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Recognition Validates, Results Matter
                        </h2>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                            Awards prove our capability, but results prove our impact. Here's what really matters:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {results.map((result, index) => (
                            <div
                                key={index}
                                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group"
                            >
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {result.icon}
                                </div>
                                <div className="text-3xl font-bold text-primary mb-3">{result.stat}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{result.title}</h3>
                                <p className="text-gray-600">{result.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-50 rounded-full translate-y-24 -translate-x-24 opacity-50"></div>

                    <div className="relative z-10 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Ready to Partner with Excellence?
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
                            Work with a team that's not just certified, but proven to deliver measurable growth and results.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Link
                                to="/contact"
                                state={{ background: location }}
                                className="px-10 py-5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex items-center justify-center gap-3 text-lg"
                            >
                                <span>📋</span>
                                Customize Your Growth Plan
                            </Link>
                            <Link
                                to="/contact"
                                state={{ background: location }}
                                className="px-10 py-5 bg-white text-primary font-bold rounded-xl border-2 border-primary hover:bg-primary/5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex items-center justify-center gap-3 text-lg"
                            >
                                <span>📞</span>
                                Book a Strategy Call
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Image Lightbox Modal */}
            {selectedImage && createPortal(
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 transition-opacity duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-5xl max-h-[90vh] w-full flex justify-center">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full View"
                            className="w-full h-full object-contain max-h-[90vh] rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default Awards;
