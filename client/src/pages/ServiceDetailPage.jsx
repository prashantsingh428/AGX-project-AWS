import React, { useEffect } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaChartLine, FaBrain, FaDatabase, FaCloud, FaShieldAlt, FaRocket, FaPaintBrush } from 'react-icons/fa';

const SERVICE_CONTENT = {
    'ai-marketing': {
        title: 'AI Marketing',
        subtitle: 'LLM-powered performance systems for measurable growth.',
        overview: 'We design and run AI-assisted growth campaigns across paid media, creative, and funnel optimization so your team can scale acquisition with clarity and speed. Our proprietary models analyze millions of data points to ensure your marketing spend delivers maximum ROI.',
        heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
        icon: <FaChartLine className="w-8 h-8 text-primary" />,
        highlights: [
            { title: 'Full-funnel strategy', desc: 'Comprehensive campaign planning and execution from awareness to conversion.', icon: <FaChartLine /> },
            { title: 'Predictive targeting', desc: 'AI-driven audience segmentation and budget optimization.', icon: <FaBrain /> },
            { title: 'Rapid iteration', desc: 'Creative testing with automated variation generation.', icon: <FaRocket /> },
            { title: 'Actionable insights', desc: 'Weekly KPI reviews with machine-learning backed recommendations.', icon: <FaCheckCircle /> }
        ]
    },
    'data-strategy': {
        title: 'Data Strategy',
        subtitle: 'Decision-ready analytics that drive confident execution.',
        overview: 'We transform fragmented data into a single source of truth with practical reporting frameworks and forecasting models aligned to your business goals. Stop guessing and start scaling with predictive analytics designed for modern enterprises.',
        heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=80',
        icon: <FaDatabase className="w-8 h-8 text-primary" />,
        highlights: [
            { title: 'Pipeline architecture', desc: 'Robust data ingestion and storage solutions built for scale.', icon: <FaDatabase /> },
            { title: 'Executive dashboards', desc: 'Real-time performance scorecards for leadership teams.', icon: <FaChartLine /> },
            { title: 'Funnel diagnostics', desc: 'Advanced attribution modeling to understand user journeys.', icon: <FaBrain /> },
            { title: 'Growth forecasting', desc: 'Predictive models for accurate revenue and demand planning.', icon: <FaRocket /> }
        ]
    },
    'brand-identity': {
        title: 'Brand Identity',
        subtitle: 'A modern brand system built for trust and conversion.',
        overview: 'We align positioning, messaging, and visual language so your brand feels premium, consistent, and conversion-focused across every channel. Stand out in an AI-first world with a cohesive identity that resonates deeply with your target audience.',
        heroImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80',
        icon: <FaPaintBrush className="w-8 h-8 text-primary" />,
        highlights: [
            { title: 'Market positioning', desc: 'Strategic narrative development to own your category.', icon: <FaBrain /> },
            { title: 'Visual direction', desc: 'Premium identity refinement and design systems.', icon: <FaPaintBrush /> },
            { title: 'Messaging architecture', desc: 'Conversion-focused copywriting frameworks for campaigns.', icon: <FaCheckCircle /> },
            { title: 'Consistency playbook', desc: 'Cross-channel brand guidelines for scaling teams.', icon: <FaRocket /> }
        ]
    },
    'cloud-infrastructure': {
        title: 'Cloud Infrastructure',
        subtitle: 'Scalable, secure foundations for AI-first operations.',
        overview: 'We help teams modernize cloud architecture for reliability, scalability, and fast iteration while maintaining governance and operational discipline. Build the backbone of your digital future with resilient, high-performance environments.',
        heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
        icon: <FaCloud className="w-8 h-8 text-primary" />,
        highlights: [
            { title: 'Architecture planning', desc: 'Designing for ultimate scale, high availability, and resilience.', icon: <FaCloud /> },
            { title: 'Environment hardening', desc: 'Enterprise-grade security and compliance best practices.', icon: <FaShieldAlt /> },
            { title: 'Workflow optimization', desc: 'CI/CD pipeline automation for rapid deployment.', icon: <FaRocket /> },
            { title: 'Incident readiness', desc: 'Comprehensive monitoring, logging, and disaster recovery.', icon: <FaCheckCircle /> }
        ]
    }
};

const ServiceDetailPage = () => {
    const { slug } = useParams();
    const location = useLocation();
    const content = SERVICE_CONTENT[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!content) {
        return <Navigate to="/services" replace />;
    }

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white pb-0">
            {/* 1. HERO SECTION */}
            <div className="relative w-full h-[60vh] min-h-[500px] flex items-center pt-20">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img src={content.heroImage} alt={content.title} className="w-full h-full object-cover" />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220]/95 via-[#0B1220]/80 to-[#0B1220]/40" />
                </div>

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-6">
                            <span className="w-2 h-2 rounded-full bg-primary" /> Future-Ready Ecosystem
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
                            {content.title}
                        </h1>
                        <p className="text-gray-300 text-xl mb-10 leading-relaxed max-w-2xl font-light">
                            {content.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/contact"
                                state={{ background: location }}
                                className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full transition shadow-lg flex items-center gap-2"
                            >
                                Book Strategy Call <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. OVERVIEW SECTION */}
            <div className="container mx-auto px-6 md:px-12 py-24">
                <div className="flex flex-col lg:flex-row items-start gap-16">
                    <div className="lg:w-5/12 sticky top-32">
                        <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary" /> The Challenge
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6">
                            Transforming complexity into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">measurable growth.</span>
                        </h2>
                        <div className="w-20 h-1 bg-primary mb-8"></div>
                    </div>
                    <div className="lg:w-7/12">
                        <div className="bg-slate-50 p-10 md:p-14 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            
                            <div className="mb-8">
                                {content.icon}
                            </div>
                            <p className="text-xl text-gray-600 leading-relaxed font-light">
                                {content.overview}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. CAPABILITIES GRID (BENTO BOX) */}
            <div className="bg-[#0B1220] py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-4">
                            <span className="w-2 h-2 rounded-full bg-primary" /> Key Capabilities
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                            Delivery Focus
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            We deploy cutting-edge methodologies to ensure your operational infrastructure is built for scale, resilience, and unparalleled performance.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {content.highlights.map((highlight, index) => (
                            <div 
                                key={index} 
                                className="bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 rounded-[2rem] p-10 group"
                            >
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex justify-center items-center text-2xl text-primary mb-8 group-hover:scale-110 transition-transform">
                                    {highlight.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{highlight.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {highlight.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. BOTTOM CTA */}
            <div className="container mx-auto px-6 md:px-12 py-24">
                <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-[3rem] p-12 md:p-20 text-center border border-gray-200 shadow-xl relative overflow-hidden">
                    {/* Decorative blurred shapes */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
                            Ready to transform your {content.title}?
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 font-light">
                            Let's build a perpetually adaptive solution that evolves as fast as the market moves.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/contact"
                                state={{ background: location }}
                                className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-full transition shadow-lg text-lg flex items-center justify-center gap-2"
                            >
                                Schedule a Consultation <FaArrowRight />
                            </Link>
                            <Link
                                to="/services"
                                className="bg-white border-2 border-gray-200 hover:border-primary text-gray-800 hover:text-primary font-bold py-4 px-10 rounded-full transition text-lg flex items-center justify-center"
                            >
                                Back to Services
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailPage;
