import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import backgroundImage from "../assets/chatgpt_banner.png";
import PlansModal from "../components/Modals/PlansModal";

const BannerSection = () => {
    const sectionRef = useRef(null);
    const [isPlansOpen, setIsPlansOpen] = useState(false);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[660px] md:min-h-[620px] overflow-hidden bg-transparent flex items-center py-12 md:py-16"
        >
            {/* Full Width Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={backgroundImage}
                    alt="AI Growth Infrastructure Background"
                    className="w-full h-full object-cover opacity-100"
                />
                {/* Horizontal gradient overlay to darken the left half for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Left Shifted Content Container (No container mx-auto constraint) */}
            <div className="relative z-10 w-full pl-6 md:pl-16 lg:pl-24 pr-6 flex flex-col justify-center">
                <div className="max-w-xl text-left">
                    {/* Professional Tagline Label */}
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-blue-500 font-bold uppercase tracking-[0.25em] text-xs md:text-sm block mb-4"
                    >
                        Enterprise AI Systems
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-8"
                    >
                        Smarter Solutions.<br />
                        <span className="text-blue-500">Better Tomorrow.</span>
                    </motion.h2>

                    {/* Horizontal Divider Line */}
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 64 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-1 bg-blue-500 mb-8"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-base md:text-lg text-gray-300 font-normal leading-relaxed max-w-xl mb-12"
                    >
                        AI-powered solutions that drive growth, efficiency and innovation. We design, deploy, and optimize custom AI agents and intelligent infrastructure to scale workflows and unlock predictive business growth.
                    </motion.p>

                    {/* CTA Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-4"
                    >
                        <button
                            onClick={() => setIsPlansOpen(true)}
                            className="group px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_10px_20px_rgba(59,130,246,0.3)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            Book a Free Strategy Call
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                        <Link
                            to="/services"
                            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/10 transition-all duration-300 backdrop-blur-sm"
                        >
                            Explore Services
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Minimalist Tech Status (Bottom Right Corner) - Open Type Layout (White) */}
            <div className="absolute z-20 bottom-12 right-12 hidden lg:flex items-center gap-5">
                {/* Thin Vertical Line Divider */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="h-12 w-[1px] bg-white/40 origin-top"
                />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                    className="space-y-0.5 text-left"
                >
                    <p className="text-[11px] font-bold text-white tracking-[0.2em] uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Infrastructure Active
                    </p>
                    <p className="text-xs text-white/75 tracking-wider font-light">
                        Decisions/sec: 85.4K+ • Accuracy: 99.4%
                    </p>
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
