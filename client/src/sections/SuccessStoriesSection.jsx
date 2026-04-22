import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, ExternalLink } from 'lucide-react';

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
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                    <div className="max-w-3xl space-y-4">
                        <h2 className="text-5xl md:text-6xl font-black text-[#000048] tracking-tight">
                            Success Stories
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
                            See how we partner with global enterprises to solve challenges, accelerate transformation, and deliver measurable outcomes.
                        </p>
                    </div>
                    
                    {/* Fake Navigation Buttons (Matches Reference Image) */}
                    <div className="hidden md:flex gap-3">
                        <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-black transition-colors">
                            <ArrowRight className="w-5 h-5 text-white" />
                        </button>
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
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer"
                        >
                            {/* Background Image */}
                            <motion.img
                                src={story.image}
                                alt={story.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Content Overlays */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                                {/* Top Badge */}
                                <div className="self-start">
                                    <span className="text-[10px] font-black tracking-widest uppercase bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded border border-white/20">
                                        {story.badge}
                                    </span>
                                </div>

                                {/* Bottom Content */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold leading-tight line-clamp-4 group-hover:text-primary transition-colors">
                                        {story.title}
                                    </h3>
                                    
                                    <div className="space-y-1">
                                        <p className="font-bold text-base">{story.name}</p>
                                        <p className="text-[11px] text-gray-300 leading-tight uppercase tracking-wide">
                                            {story.role}
                                        </p>
                                    </div>

                                    {/* Play / Link Icon */}
                                    <div className="flex justify-between items-center pt-2">
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                            {story.isVideo ? (
                                                <Play className="w-4 h-4 fill-white text-white" />
                                            ) : (
                                                <ExternalLink className="w-4 h-4 text-white" />
                                            )}
                                        </div>
                                        
                                        {/* Static Icon from screenshot */}
                                        {!story.isVideo ? (
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-70">
                                                <ExternalLink className="w-4 h-4" />
                                            </div>
                                        ) : (
                                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-70">
                                                <Play className="w-4 h-4 fill-white" />
                                            </div>
                                        )}
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
