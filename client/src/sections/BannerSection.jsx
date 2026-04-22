import React, { useRef, useState } from "react";
import { Zap, BarChart, Activity, ShieldCheck, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import contentVideo from "../assets/Video_Content_Generation_Complete.mp4";
import PlansModal from "../components/Modals/PlansModal";

const BannerSection = () => {
    const sectionRef = useRef(null);
    const [isPlansOpen, setIsPlansOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const insights = [
        {
            title: "The Scale Effect: AI Industrial Revolution",
            desc: "Leading experts share how AI is transforming every aspect of industry.",
        },
        {
            title: "Predictive Growth: The New Standard",
            desc: "How data-driven infrastructure is rewriting the rules of business scaling.",
        },
        {
            title: "Autonomous Systems: Future of Operations",
            desc: "Exploring the shift from manual monitoring to intelligent self-healing systems.",
        },
        {
            title: "Cloud Intelligence: Seamless Integration",
            desc: "Building the connective tissue between big data and actionable business insights.",
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % insights.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + insights.length) % insights.length);
    };

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[400px] md:min-h-[550px] overflow-hidden bg-transparent flex items-center justify-center py-12 md:py-16"
        >
            {/* Full Width Video Background (Original Clarity) */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-100"
                >
                    <source src={contentVideo} type="video/mp4" />
                </video>
            </div>

            {/* Main Centered Branding */}
            <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl space-y-6">
                <div className="space-y-2">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs block drop-shadow-md"
                    >
                        AI Infrastructure for Scalable Enterprises
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                    >
                        AI Growth Exa
                    </motion.h2>
                    <motion.h3 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-lg md:text-2xl font-light text-white/95 tracking-tight italic drop-shadow-lg"
                    >
                        Intelligent Growth Systems
                    </motion.h3>
                </div>

                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-sm md:text-base text-white font-medium max-w-xl mx-auto font-light leading-relaxed drop-shadow-lg"
                >
                    We design and deploy AI-driven systems that accelerate growth and enable data-driven transformation.
                </motion.p>

                <div className="pt-2">
                    <button
                        onClick={() => setIsPlansOpen(true)}
                        className="px-10 py-4 bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(29,52,97,0.3)] transition-all duration-300 transform hover:scale-105 border border-white/10"
                    >
                        Book a Free Strategy Call
                    </button>
                </div>
            </div>

            {/* Small Floating Insight Card (Right Corner) */}
            <div className="absolute z-20 bottom-8 right-8 hidden lg:block">
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="w-[380px] bg-slate-950/40 rounded-xl border border-white/20 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3"
                        >
                            <h4 className="text-xl font-bold text-white leading-tight drop-shadow-sm">
                                {insights[currentSlide].title}
                            </h4>
                            <p className="text-white/80 text-sm leading-relaxed drop-shadow-sm">
                                {insights[currentSlide].desc}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Compact Navigation Footer */}
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                        <div className="flex gap-2">
                            {insights.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`h-1.5 transition-all duration-500 rounded-sm ${
                                        currentSlide === i ? "bg-primary w-8" : "bg-white/20 w-4 hover:bg-white/40"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="flex gap-3">
                            <button 
                                onClick={prevSlide}
                                className="p-1.5 rounded-sm border border-white/20 bg-black/20 hover:bg-black/40 text-white/60 hover:text-white transition-all active:scale-95"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button 
                                onClick={nextSlide}
                                className="p-1.5 rounded-sm border border-white/20 bg-black/20 hover:bg-black/40 text-white/60 hover:text-white transition-all active:scale-95"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            <PlansModal
                isOpen={isPlansOpen}
                onClose={() => setIsPlansOpen(false)}
            />
        </section>
    );
};

export default BannerSection;
