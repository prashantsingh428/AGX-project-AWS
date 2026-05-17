import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const SuccessStoriesSection = () => {
    const stories = [
        {
            id: 1,
            title: "From Infrastructure to Intelligence: How Google Cloud is Driving the Future of Enterprise AI",
            name: "Francis deSouza",
            role: "COO and President, Security Products, Google Cloud",
            image: "/src/assets/images/success/story1.png",
            badge: "CASE STUDY",
            isVideo: false
        },
        {
            id: 2,
            title: "Minds that Move Networks: How a sweeping reinvention is underway at AT&T",
            name: "Jeremy Legg",
            role: "Chief Technology Officer, AT&T",
            image: "/src/assets/images/success/story2.png",
            badge: "VIDEO",
            isVideo: true
        },
        {
            id: 3,
            title: "How Gen AI and predictive models created a proactive fraud control ecosystem",
            name: "Ajay Punia & Vinod Yadav",
            role: "SVP & Head of Core Banking, Citizens Bank",
            image: "/src/assets/images/success/story3.png",
            badge: "VIDEO",
            isVideo: true
        },
        {
            id: 4,
            title: "Purpose in Practice: How a leader's commitment to care drives data-driven success",
            name: "Helen Mets",
            role: "President & CEO, Ahlstrom",
            image: "/src/assets/images/success/story4.png",
            badge: "VIDEO",
            isVideo: true
        }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header with Navigation */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
                    <div className="max-w-3xl space-y-3">
                        <h2 className="text-4xl md:text-5xl font-black text-[#000048] tracking-tight">
                            Success Stories
                        </h2>
                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed max-w-2xl">
                            See how we partner with global enterprises to solve challenges, accelerate transformation, and deliver measurable outcomes.
                        </p>
                    </div>
                    
                    {/* Fake Navigation Buttons (Matches Reference Image) */}
                    <div className="hidden md:flex gap-3">
                        <Link to="/case-studies" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <Link to="/case-studies" className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-black transition-colors">
                            <ArrowRight className="w-5 h-5 text-white" />
                        </Link>
                    </div>
                </div>

                {/* Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer bg-slate-100"
                        >
                            {/* Background Image */}
                            <motion.img
                                src={index === 0 ? "/src/assets/images/success/story_new.png" : story.image}
                                alt={story.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Gradient Overlay - Subtle by default, dark on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Content Overlays */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                                {/* Top Badge - Always visible */}
                                <div className="self-start">
                                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                                        {story.badge}
                                    </span>
                                </div>

                                {/* Content Block */}
                                <div className="space-y-4">
                                    {/* Title - Always visible but shifts on hover */}
                                    <h3 className="text-lg font-bold leading-tight line-clamp-2 transition-all duration-500 group-hover:mb-2">
                                        {story.title}
                                    </h3>

                                    {/* Hidden Details - Revealing on hover */}
                                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 space-y-4 pointer-events-none group-hover:pointer-events-auto">
                                        <div className="space-y-0.5">
                                            <p className="font-bold text-base">{story.name}</p>
                                            <p className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">
                                                {story.role}
                                            </p>
                                        </div>

                                        {/* Interaction Indicator */}
                                        <div className="flex items-center gap-3 text-sm font-bold">
                                            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 hover:scale-110">
                                                {story.isVideo ? <Play size={16} className="fill-black" /> : <ExternalLink size={16} />}
                                            </div>
                                            <span className="text-[11px] uppercase tracking-widest">{story.isVideo ? "Watch Video" : "Read Story"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStoriesSection;
