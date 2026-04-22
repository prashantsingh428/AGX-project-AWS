import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StrategyCallModal from '../components/Modals/StrategyCallModal';
import PlansModal from '../components/Modals/PlansModal';

const steps = [
    {
        title: "Defining Process",
        desc: "Establishing the framework and objectives",
        color: "text-gray-700",
        bg: "bg-white border-2 border-primary",
        iconColor: "text-primary",
        glow: "shadow-primary/20"
    },
    {
        title: "Meeting Preparation",
        desc: "Organizing and gathering necessary material",
        color: "text-gray-700",
        bg: "bg-white border-2 border-primary",
        iconColor: "text-primary",
        glow: "shadow-primary/20"
    },
    {
        title: "Holding the Meeting",
        desc: "Conducting the meeting to discuss and strategize",
        color: "text-gray-700",
        bg: "bg-white border-2 border-primary",
        iconColor: "text-primary",
        glow: "shadow-primary/20"
    },
    {
        title: "The Follow Up",
        desc: "Reviewing outcomes and ensuring actions are taken",
        color: "text-gray-700",
        bg: "bg-white border-2 border-primary",
        iconColor: "text-primary",
        glow: "shadow-primary/20"
    },
    {
        title: "Maintaining Momentum",
        desc: "Continuously driving progress and engagement",
        color: "text-gray-700",
        bg: "bg-white border-2 border-primary",
        iconColor: "text-primary",
        glow: "shadow-primary/20"
    }
];

const FinalCtaSection = () => {
    const location = useLocation();
    const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
    const [isStrategyCallOpen, setIsStrategyCallOpen] = useState(false);
    const [isPlansOpen, setIsPlansOpen] = useState(false);

    const toggleWhatsApp = (e) => {
        e.preventDefault();
        setIsWhatsAppOpen(!isWhatsAppOpen);
    };

    return (
        <section className="relative py-20 bg-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-10 sm:mb-12 px-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-5 md:mb-6 tracking-tight leading-tight">
                        Ready to Build a <span className="text-primary">Smarter Growth System?</span>
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-medium">
                        Stop guessing. <span className="text-primary">Start scaling</span> with AI-powered strategies.
                    </p>
                </div>

                {/* Stable Process Cards (always visible) */}
                <div className="relative mb-14 sm:mb-16 py-6 sm:py-8 px-4 sm:px-6 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className="rounded-xl bg-white border border-primary/10 p-4 text-center"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/20 mx-auto mb-3 flex items-center justify-center">
                                    <span className="text-primary font-bold">{i + 1}</span>
                                </div>
                                <h4 className={`text-sm md:text-base font-bold mb-1 ${step.color}`}>{step.title}</h4>
                                <p className="text-xs text-gray-500 font-medium">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                    <Link
                        to="/contact"
                        state={{ background: location }}
                        className="px-8 md:px-10 py-4 bg-primary hover:bg-primary/90 text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1 flex items-center justify-center gap-3 whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Book Strategy Call</span>
                    </Link>

                    <button
                        onClick={toggleWhatsApp}
                        className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 bg-primary/5 text-primary font-bold text-base md:text-lg rounded-full hover:bg-primary/10 transition-colors border border-primary/20 whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                        <span>WhatsApp</span>
                    </button>

                    <button
                        onClick={() => setIsStrategyCallOpen(true)}
                        className="flex items-center justify-center gap-3 px-8 md:px-10 py-4 bg-primary/5 text-primary font-bold text-base md:text-lg rounded-full hover:bg-primary/10 transition-colors border border-primary/20 whitespace-nowrap"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Calendly</span>
                    </button>
                </div>
            </div>

            {/* WhatsApp Popup */}
            {isWhatsAppOpen && (
                <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={toggleWhatsApp}>
                    <div className="bg-white p-6 rounded-2xl relative max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={toggleWhatsApp}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center">
                            <div className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4 border border-gray-100">
                                <img
                                    src="/assets/whatsapp-qr.png"
                                    alt="WhatsApp QR Code"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p className="text-gray-900 font-bold mb-1">Add me as a contact on WhatsApp.</p>
                            <p className="text-sm text-gray-500 mb-4">Scan this code using the WhatsApp camera to get my number</p>

                            <a
                                href="https://wa.me/message/OUMPIAT35KYIC1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/90 font-semibold hover:underline bg-primary/5 px-4 py-2 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                                Connect on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            )}
            {/* Strategy Call Modal */}
            <StrategyCallModal isOpen={isStrategyCallOpen} onClose={() => setIsStrategyCallOpen(false)} />

            {/* Plans & Helpline Modal */}
            <PlansModal isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} />
        </section>
    );
};

export default FinalCtaSection;
