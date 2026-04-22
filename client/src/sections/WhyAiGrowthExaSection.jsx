import React, { useState, useEffect, useRef } from 'react';

const FeatureCard = ({ icon, title, description, delay }) => {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`group relative bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 ${isVisible ? 'fade-in-up' : 'opacity-0'
                }`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-gray-800 text-base leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                    {description}
                </p>
            </div>
        </div>
    );
};

const WhyAiGrowthExaSection = () => {
    const [titleVisible, setTitleVisible] = useState(false);
    const titleRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setTitleVisible(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (titleRef.current) {
            observer.observe(titleRef.current);
        }

        return () => {
            if (titleRef.current) {
                observer.unobserve(titleRef.current);
            }
        };
    }, []);

    const features = [
        {
            icon: '',
            title: 'AI-First Approach',
            description: 'Decisions powered by data, not assumptions. We leverage machine learning and predictive analytics to optimize every campaign.'
        },
        {
            icon: '',
            title: '1600+ Projects Delivered',
            description: 'Across multiple industries and markets. From startups to Fortune 500 companies, we\'ve driven measurable growth.'
        },
        {
            icon: '',
            title: 'Deep Industry Expertise',
            description: 'We understand how different businesses grow. Our team brings decades of combined experience in tech, SaaS, e-commerce, and B2B.'
        },
        {
            icon: '',
            title: 'ROI-Focused Systems',
            description: 'Every strategy is tied to revenue impact. We build sustainable systems that scale with your business goals.'
        },
        {
            icon: '',
            title: 'End-to-End Automation',
            description: 'From lead capture to conversion, we automate your entire growth funnel so you can focus on what matters most.'
        },
        {
            icon: '',
            title: 'Transparent Reporting',
            description: 'Real-time dashboards and weekly insights. You\'ll always know exactly where your marketing dollars are going and what they\'re returning.'
        }
    ];

    return (
        <section className="relative py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
            <style>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(60px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                
                @keyframes fadeInDownBig {
                    0% {
                        opacity: 0;
                        transform: translate3d(0, -100px, 0);
                    }
                    100% {
                        opacity: 1;
                        transform: translate3d(0, 0, 0);
                    }
                }
                
                .fade-in-down-title {
                    animation: fadeInDownBig 1s ease-out;
                }
            `}</style>

            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-primary/20 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-purple-300 rounded-full blur-[128px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div ref={titleRef} className="text-center mb-12">
                    <h2 className={`text-4xl md:text-6xl font-light text-gray-900 mb-4 tracking-wide ${titleVisible ? 'fade-in-down-title' : 'opacity-0'}`}>
                        WHY <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-indigo-600">AI Growth Exa</span>
                    </h2>
                    <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full mb-6 opacity-60"></div>

                    <p className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 leading-tight">
                        Because Growth Needs <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">Systems</span>, Not Guesswork
                    </p>

                    <div className="max-w-3xl mx-auto space-y-2 mb-8">
                        <p className="text-lg text-gray-900 font-light">
                            Anyone can run ads.
                        </p>
                        <p className="text-lg text-gray-900 font-light mb-4">
                            Very few can build scalable growth machines.
                        </p>
                        <p className="text-xl text-gray-900 font-medium">
                            Here's why brands trust us:
                        </p>
                    </div>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            delay={index * 100}
                        />
                    ))}
                </div>

                {/* Bottom Statement */}
                <div className="text-center mt-12">
                    <div className="inline-block">
                        <p className="text-xl md:text-2xl text-gray-900 font-light mb-2">
                            We don't chase vanity metrics.
                        </p>
                        <p className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-indigo-600">
                            We build profit-driven growth.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyAiGrowthExaSection;
