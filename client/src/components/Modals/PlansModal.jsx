import React from 'react';

const PlansModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-md" onClick={onClose}>
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 p-8 border border-gray-100/50" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Choose Your Growth Path</h2>
                        <p className="text-gray-500 mt-1.5 text-sm md:text-base">Direct access to expert strategy and support.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-50 rounded-full">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Helpline Section */}
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/20 text-primary rounded-xl shrink-0">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-bold text-primary text-lg mb-1">Priority Helpline</h4>
                                <p className="text-sm text-primary/80 leading-relaxed">Direct line for urgent queries and immediate consultations.</p>
                            </div>
                        </div>
                        <a
                            href="tel:+918979779337"
                            className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 whitespace-nowrap w-full sm:w-auto text-center"
                        >
                            +91 89797 79337
                        </a>
                    </div>

                    {/* Plans Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Plan 1 */}
                        <div className="group border border-gray-200 rounded-2xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 bg-white">
                            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors">Growth Audit</h3>
                            <p className="text-sm text-gray-500 mb-4 leading-relaxed">Comprehensive analysis of your current marketing performance and AI scaling opportunities.</p>
                            <span className="inline-flex items-center text-sm font-semibold text-primary transition-colors group-hover:translate-x-1">
                                View Details
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>

                        {/* Plan 2 */}
                        <div className="group border border-gray-200 rounded-2xl p-6 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 bg-white">
                            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors">Full Strategy</h3>
                            <p className="text-sm text-gray-500 mb-4 leading-relaxed">End-to-end implementation roadmap for AI-driven growth systems and automation.</p>
                            <span className="inline-flex items-center text-sm font-semibold text-primary transition-colors group-hover:translate-x-1">
                                View Details
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlansModal;
