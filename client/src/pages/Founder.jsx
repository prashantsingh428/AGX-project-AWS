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
    Phone
} from 'lucide-react';

import WhatsAppModal from '../components/Modals/WhatsAppModal';
import founderProfile from '../assets/images/founder/founder-profile.png';

const FounderIntroduction = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const marketingPlanSteps = [
        {
            number: "1",
            title: "Situation (SWOT)",
            items: ["Identify problem", "Develop solution", "Implement solution"]
        },
        {
            number: "2",
            title: "Objectives",
            items: ["Sales", "Market share", "Increase revenue", "Reduce costs"]
        },
        {
            number: "3",
            title: "Strategy",
            items: ["Segment-target", "Price-quality", "Product positioning", "Differentiation", "Distribution"]
        },
        {
            number: "4",
            title: "Action Plan",
            items: ["Budget allocation", "Production", "Promotion", "Distribution"]
        },
        {
            number: "5",
            title: "Forecasts",
            items: ["Quality", "Quantity", "Market share", "Profitability"]
        },
        {
            number: "6",
            title: "Control",
            items: ["Evaluate results", "Make adjustments", "Measure success", "Track progress"]
        }
    ];

    const focusAreas = [
        {
            icon: <Target className="w-8 h-8" />,
            title: "Growth Strategy Design",
            description: "Building scalable growth roadmaps aligned with real business goals, not vanity metrics."
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Performance Marketing Systems",
            description: "Designing ROI-focused ad systems with clear attribution, control, and scale."
        },
        {
            icon: <Cpu className="w-8 h-8" />,
            title: "AI Automation Frameworks",
            description: "Smarter funnels, predictive targeting, automated follow-ups, and conversion systems."
        }
    ];

    const industries = [
        { name: "Healthcare", description: "Lead generation & patient acquisition systems" },
        { name: "SaaS & IT Services", description: "Subscription growth, funnels & retention strategies" },
        { name: "Real Estate", description: "High-net lead systems & CRM automation" },
        { name: "Enterprises", description: "Large-scale performance and growth optimization" }
    ];

    const stats = [
        { label: "Years of Experience", value: "5.8+" },
        { label: "Ad Budgets Managed", value: "1.5-2 Career" },
        { label: "Projects Delivered", value: "1600+" },
        { label: "ROAS & CPL Improvements", value: "Proven" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <WhatsAppModal isOpen={isWhatsAppModalOpen} onClose={() => setIsWhatsAppModalOpen(false)} />

            {/* Main Content with proper spacing */}
            <main className="container mx-auto px-4 py-8" ref={heroRef}>
                {/* Hero Section */}
                <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="lg:w-1/3">
                            <div className="relative">
                                <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-200 rounded-full mx-auto overflow-hidden border-8 border-white shadow-2xl">
                                    <img
                                        src={founderProfile}
                                        alt="Priyanshu Srivastava"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-4 -right-4 bg-primary text-white px-6 py-2 rounded-lg shadow-lg animate-pulse-slow">
                                    <Briefcase className="w-5 h-5 inline mr-2" />
                                    Founder
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-2/3">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Priyanshu Srivastava
                            </h1>
                            <p className="text-xl text-gray-600 mb-6 italic border-l-4 border-primary pl-4">
                                "Behind every scalable brand is a growth mind that understands both numbers and people."
                            </p>
                            <p className="text-lg text-gray-700 mb-6">
                                Priyanshu Srivastava is a growth-focused strategist and AI marketing architect who believes marketing should not just look good — it should perform, convert, and scale.
                            </p>
                            <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                                <p className="text-lg font-semibold text-gray-800 mb-2">
                                    He founded AI Growth Exa with one clear vision:
                                </p>
                                <p className="text-gray-700">
                                    To replace guesswork marketing with intelligent, data-backed growth systems.
                                </p>
                                <p className="text-gray-600 mt-3">
                                    In a market full of noise, trends, and shortcuts, Priyanshu focuses on clarity, systems, and results.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                            <div className="text-gray-600 text-sm">{stat.label}</div>
                            {stat.label === "ROAS & CPL Improvements" && (
                                <div className="mt-2">
                                    <span className="text-green-600 text-sm font-semibold">✓ Verified Results</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Core Focus Areas */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Core Focus Areas</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {focusAreas.map((area, index) => (
                            <div
                                key={index}
                                className={`bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
                            >
                                <div className="text-primary mb-4">{area.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                                <p className="text-gray-600">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6-Step Marketing Plan */}
                <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">The 6-Step Marketing Plan</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {marketingPlanSteps.map((step, index) => (
                            <div
                                key={index}
                                className={`border border-gray-200 rounded-xl p-6 hover:border-primary/50 hover:shadow-md transition-all duration-300`}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 ml-4">{step.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {step.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-center text-gray-600">
                                            <ChevronRight className="w-4 h-4 text-primary mr-2" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Industries & Experience */}
                <div className="flex flex-col lg:flex-row gap-12 mb-16">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Industry Experience</h2>

                        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900">Indian Home Healthcare Market</h3>
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                                    CAGR 19.3%
                                </span>
                            </div>
                            <div className="h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="flex items-end justify-center space-x-4 mb-4">
                                        <div className="text-center">
                                            <div className="h-24 w-12 bg-primary rounded-t"></div>
                                            <div className="mt-2 font-semibold">2022</div>
                                            <div className="text-sm">USD 8.8B</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="h-40 w-12 bg-red-500 rounded-t"></div>
                                            <div className="mt-2 font-semibold">2030</div>
                                            <div className="text-sm">Market Forecast</div>
                                        </div>
                                    </div>
                                    <span className="text-gray-600">Market Growth Chart</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Industries Served</h3>
                            {industries.map((industry, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="font-bold text-gray-900 mb-1">{industry.name}</h4>
                                    <p className="text-gray-600 text-sm">{industry.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Professional Journey</h2>

                        <div className="relative">
                            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20"></div>

                            {[
                                { role: "Intern", period: "Started from ground up", icon: <BookOpen /> },
                                { role: "Digital Marketing Specialist", period: "Hands-on execution", icon: <Target /> },
                                { role: "Digital Marketing Manager", period: "Team leadership", icon: <Users /> },
                                { role: "Chief Marketing Officer", period: "Strategic oversight", icon: <TrendingUp /> },
                                { role: "Founder & Growth Architect", period: "AI Growth Exa", icon: <Briefcase /> }
                            ].map((item, index) => (
                                <div key={index} className="relative mb-8 pl-16">
                                    <div className="absolute left-4 w-4 h-4 bg-primary rounded-full border-4 border-white"></div>
                                    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
                                        <div className="flex items-center mb-2">
                                            <div className="text-primary mr-3">{item.icon}</div>
                                            <h3 className="text-xl font-bold text-gray-900">{item.role}</h3>
                                        </div>
                                        <p className="text-gray-600">{item.period}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Philosophy Section */}
                <section className="mb-16 bg-gradient-to-r from-primary/5 to-gray-50 rounded-2xl p-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            "Anyone can run ads. Very few can build growth that lasts."
                        </h2>
                        <p className="text-lg text-gray-700 mb-8">
                            Priyanshu believes in long-term partnerships, transparent communication, data-driven decision-making, and empowering teams with clarity and systems.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {["Long-term partnerships", "Transparent communication", "Data-driven decisions", "Team empowerment"].map((item, index) => (
                                <div key={index} className="bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Connect Section */}
                <section className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Connect With the Founder</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Want to Talk Growth, Strategy, or AI? Connect directly with the mind behind AI Growth Exa.
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                            {/* Buttons Column */}
                            <div className="flex flex-col gap-4 w-full md:w-auto">
                                <a
                                    href="mailto:contact@aigrowthexa.com"
                                    className="bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 text-lg font-semibold w-full md:w-64"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>Email Founder</span>
                                </a>
                                <a
                                    href="https://linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-primary px-8 py-4 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-3 text-lg font-semibold border-2 border-primary w-full md:w-64"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    <span>LinkedIn Profile</span>
                                </a>
                            </div>

                            {/* Divider */}
                            <div className="hidden md:block w-px h-32 bg-gray-200"></div>

                            {/* WhatsApp QR Column */}
                             <div className="flex flex-col items-center group cursor-pointer" onClick={() => setIsWhatsAppModalOpen(true)}>
                                <div className="relative bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-3 group-hover:border-primary/50 group-hover:shadow-md transition-all">
                                    <img
                                        src="/assets/whatsapp-qr.png"
                                        alt="WhatsApp QR Code"
                                        className="w-48 h-auto object-contain blur-[2px] group-hover:blur-0 transition-all duration-300"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">Click to Expand</div>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 text-green-600 font-semibold group-hover:text-green-700 transition-colors">
                                    <Phone className="w-4 h-4" />
                                    <span>Connect on WhatsApp</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default FounderIntroduction;
