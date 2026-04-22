import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqData = [
    {
        question: "What industries do you work with?",
        answer: "We work across startups, e-commerce, SaaS, real estate, education, healthcare, service businesses, and B2B brands. Our systems are flexible, making us a trusted choice among the best marketing and IT companies in India."
    },
    {
        question: "How does AI actually help in marketing?",
        answer: "AI allows us to predict user behavior, optimize targeting, reduce ad waste, improve conversions, and automate follow-ups — delivering higher ROI with smarter decisions."
    },
    {
        question: "Do you replace human marketers with AI?",
        answer: "Never. AI enhances human strategy. We combine human creativity + machine intelligence to build scalable growth systems."
    },
    {
        question: "Is AI marketing expensive?",
        answer: "Not when done right. AI reduces costs by improving efficiency, accuracy, and long-term performance."
    },
    {
        question: "What is your pricing model?",
        answer: "We offer custom pricing based on your goals, scope, and budget. No rigid packages — only strategies that fit your business."
    },
    {
        question: "How long before we see results?",
        answer: "Most clients see initial traction in 30 days, and strong optimization in 60-90 days."
    }
];

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const iconRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(contentRef.current, {
                height: "auto",
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });
            gsap.to(iconRef.current, {
                rotate: 180,
                duration: 0.3
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            });
            gsap.to(iconRef.current, {
                rotate: 0,
                duration: 0.3
            });
        }
    }, [isOpen]);

    return (
        <div className={`mb-2 rounded-xl border transition-all duration-300 ${isOpen ? 'bg-primary/5 border-primary/20 shadow-sm' : 'bg-white border-slate-200 hover:border-primary/30'}`}>
            <button
                onClick={onClick}
                className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left group transition-all duration-300"
            >
                <span className={`text-base sm:text-lg font-semibold transition-colors duration-300 pr-3 ${isOpen ? 'text-primary' : 'text-slate-800 group-hover:text-primary'}`}>
                    {question}
                </span>
                <div
                    ref={iconRef}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'bg-primary border-primary text-white' : 'bg-white border-slate-200 text-slate-500 group-hover:text-primary group-hover:border-primary/30'}`}
                >
                    <span className="text-lg">▼</span>
                </div>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden h-0 opacity-0"
            >
                <div className="px-4 sm:px-6 pb-4 text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-slate-200 pt-3 mx-4 sm:mx-6">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FaqSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top bottom", // When top of section hits bottom of viewport
                end: "bottom top", // When bottom of section hits top of viewport
                onLeave: () => {
                    // Close all FAQs and reset count when moving to NEXT section
                    setOpenIndex(null);
                },
                onLeaveBack: () => {
                    // Close all FAQs and reset count when moving to PREVIOUS section
                    setOpenIndex(null);
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section ref={sectionRef} className="relative py-14 md:py-16 bg-white overflow-hidden border-t border-slate-200">
            {/* Background Accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 blur-[120px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl relative z-10">
                <div className="text-center mb-8 md:mb-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
                        FAQ - <span className="text-primary">Real Questions.</span>
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 font-medium">
                        Clear answers for quick decisions.
                    </p>
                </div>

                <div className="space-y-3">
                    {faqData.map((faq, index) => (
                        <FaqItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleFaq(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
