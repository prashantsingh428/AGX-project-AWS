import React from 'react';

const StrategyCallModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>

                {/* Left Side: Host Info */}
                <div className="w-full md:w-1/3 bg-gray-50 p-8 border-r border-gray-100 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/10 mb-4 flex items-center justify-center text-primary font-bold text-3xl shadow-inner">
                        PS
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Prashant Singh</h3>
                    <p className="text-sm text-primary font-medium mb-4">Founder, Ai Growth Exa</p>

                    <div className="text-sm text-gray-600 space-y-3 w-full text-left bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <p className="font-semibold text-gray-900 mb-2">What we'll cover:</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Your current bottlenecks</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>AI scaling opportunities</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>Custom growth roadmap</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Side: Client Info */}
                <div className="w-full md:w-2/3 p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Book Your Strategy Session</h2>
                                <p className="text-gray-500 mt-1">Let's verify if we're a good match.</p>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="bg-primary/5 p-5 rounded-xl border border-primary/20">
                                <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Who this is for:
                                </h4>
                                <ul className="space-y-2 text-primary/80 text-sm">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        Founders & Decision Makers looking to scale efficiently.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        Brands ready to implement AI-driven automation.
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                        Companies spending $5k+ on marketing looking for better ROI.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <a
                        href="https://calendly.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        <span>Select a Time on Calendly</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StrategyCallModal;
