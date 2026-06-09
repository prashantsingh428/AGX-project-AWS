import React, { useState, useEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    Play,
    ArrowRight,
    CheckCircle2,
    Target,
    Users,
    ShieldCheck,
    TrendingUp,
    Zap,
    BarChart3,
    Briefcase,
    Award,
    ChevronRight,
    Settings,
    Rocket,
    Plus
} from 'lucide-react';
import api from "../api/api";
import { useNotification } from '../context/NotificationContext';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, IconButton, Typography, Box, Grid, Stack,
    TextField, MenuItem, Select, InputLabel, FormControl,
    FormHelperText, List, ListItem, ListItemIcon, ListItemText,
    Divider, Paper, alpha
} from '@mui/material';
import { Close as CloseIcon, Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon, Business as BusinessIcon, Send as SendIcon } from '@mui/icons-material';

// Assets
import heroBg from '../assets/images/services_hero_consulting_1778839447544.png';
import aboutImg from '../assets/images/services_about_meeting_1778839409989.png';

const Services = () => {
    const { showNotification } = useNotification();
    const [selectedService, setSelectedService] = useState(null);
    const [serviceModalOpen, setServiceModalOpen] = useState(false);
    const [contactFormOpen, setContactFormOpen] = useState(false);
    const [selectedServiceName, setSelectedServiceName] = useState('');

    // --- Original Data ---
    const allServices = [
        { id: 1, title: "AI Marketing Solutions", category: "AI-POWERED MARKETING", desc: "Predict customer behavior and automate decisions with LLM-powered growth frameworks.", icon: <Zap />, featured: false },
        { id: 2, title: "Performance Marketing", category: "PAID ADVERTISING", desc: "ROI-driven campaigns across Google, Meta, and LinkedIn optimized by AI models.", icon: <TrendingUp />, featured: false },
        { id: 3, title: "SEO & Growth Strategy", category: "SEO & GROWTH", desc: "Build search ecosystems that align visibility with business goals for sustainable traffic.", icon: <Target />, featured: false },
        { id: 4, title: "Podcast & Social Media", category: "CONTENT MARKETING", desc: "Build authority and trust at scale through audio and high-impact social content.", icon: <Users />, featured: false },
        { id: 5, title: "GMB Local Growth", category: "LOCAL SEO", desc: "Dominate local search and maps with AI-powered visibility and review systems.", icon: <ShieldCheck />, featured: false },
        { id: 6, title: "Funnel & Automation", category: "AUTOMATION", desc: "Turn traffic into revenue automatically with high-converting lead nurture systems.", icon: <Settings />, featured: false },
        { id: 7, title: "Branding & Creative", category: "BRANDING", desc: "Cohesive visual identity systems that build recall and drive consistent conversions.", icon: <Briefcase />, featured: false },
        { id: 8, title: "Web & App Development", category: "DEVELOPMENT", desc: "High-performance digital products built for speed, UX, and conversion optimization.", icon: <BarChart3 />, featured: false },
        { id: 9, title: "Content Strategy", category: "CONTENT", desc: "Human-written, emotion-driven content that builds trust and ranks naturally.", icon: <Award />, featured: false },
    ];

    const stats = [
        { label: "Years of Experience", value: "25", icon: <Award /> },
        { label: "Completed Projects", value: "350", icon: <TrendingUp /> }
    ];

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q') || '';

    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 6;

    const handleStartService = (name) => {
        setSelectedServiceName(name);
        setContactFormOpen(true);
        setServiceModalOpen(false);
    };

    // Filter services based on search query
    const filteredServices = useMemo(() => {
        if (!query.trim()) return allServices;
        const lowerQuery = query.toLowerCase();
        return allServices.filter(service => 
            service.title.toLowerCase().includes(lowerQuery) ||
            service.category.toLowerCase().includes(lowerQuery) ||
            service.desc.toLowerCase().includes(lowerQuery)
        );
    }, [query, allServices]);

    // Adjust page if current filter reduces result pages
    const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [filteredServices, totalPages, currentPage]);

    // Handle exact title match to open contact form automatically
    useEffect(() => {
        if (query) {
            const exactMatch = allServices.find(
                s => s.title.toLowerCase() === query.toLowerCase()
            );
            if (exactMatch) {
                setSelectedServiceName(exactMatch.title);
                setContactFormOpen(true);
            }
        }
    }, [query, allServices]);

    // Pagination Logic
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* 1. HERO SECTION */}
            <section className="relative h-[90vh] min-h-[750px] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={heroBg} alt="Hero Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-900/40" />
                </div>

                <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-end pb-24 md:pb-28">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl bg-white/20 backdrop-blur-xl p-8 md:p-12 rounded-sm shadow-2xl border border-white/30 mb-0"
                    >
                        <h1 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-[#000048] uppercase">
                            Financial And <br /> Marketing Advisory
                        </h1>
                        <p className="text-white/90 text-base mb-8 leading-relaxed max-w-md">
                            At AI Growth Era, we build complete growth ecosystems where AI, performance marketing, automation, and creativity work together to scale your business.
                        </p>
                        <button
                            onClick={() => handleStartService('General Consultation')}
                            className="bg-[#000048] hover:bg-[#000066] text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#000048]/20"
                        >
                            Contact Us
                        </button>
                    </motion.div>
                </div>

                {/* Core Capabilities Bar (Minimalist Style) */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <div className="container mx-auto px-6">
                        <div className="bg-white/80 backdrop-blur-md border-t border-slate-100 py-6 px-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="px-5 py-2 border border-slate-100 bg-slate-50/50">
                                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500">
                                    CORE CAPABILITIES
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-10 md:gap-16">
                                {[
                                    { title: "Innovative Solutions", icon: <Settings className="w-4 h-4" /> },
                                    { title: "Professional Team", icon: <Users className="w-4 h-4" /> },
                                    { title: "24/7 AI Support", icon: <ShieldCheck className="w-4 h-4" /> }
                                ].map((s, i) => (
                                    <div key={i} className="flex items-center gap-3 group cursor-pointer">
                                        <div className="text-[#000048] opacity-50 group-hover:opacity-100 transition-opacity">
                                            {s.icon}
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 group-hover:text-[#000048] transition-colors">
                                            {s.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Spacer for bar */}
            <div className="h-4" />

            {/* 2. ABOUT BRIEF SECTION */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Image side */}
                        <div className="w-full lg:w-1/2 relative group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative rounded-sm overflow-hidden shadow-2xl"
                            >
                                <img src={aboutImg} alt="About Meeting" className="w-full h-auto" />
                                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform duration-300 z-10 group/play">
                                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-[#000048] border-b-[10px] border-b-transparent ml-1" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Content side */}
                        <div className="w-full lg:w-1/2">
                            <span className="text-[#000048] text-xs font-black uppercase tracking-[0.3em] mb-4 block">About Us</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-slate-900">
                                Discover The World of <br /> Financial Excellence
                            </h2>
                            <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                                AI Growth Era transforms businesses by merging data intelligence with creative excellence. We bridge the gap between traditional advisory and modern AI implementation to ensure sustainable market dominance.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-8 mb-12">
                                {stats.map((stat, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="text-[#000048] p-3 bg-slate-50 rounded-full">
                                            {stat.icon}
                                        </div>
                                        <div>
                                            <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                                            <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{stat.label}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="bg-[#000048] hover:bg-[#000066] text-white px-10 py-4 text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#000048]/20">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. WHAT WE OFFER SECTION */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
                        {/* Title area */}
                        <div className="w-full lg:w-1/3">
                            <span className="text-[#000048] text-xs font-black uppercase tracking-[0.3em] mb-4 block">Our Services</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-slate-900">
                                What We Offer
                            </h2>
                            <p className="text-slate-500 mb-10 leading-relaxed">
                                Explore our comprehensive range of AI-driven services designed to optimize every touchpoint of your customer journey.
                            </p>
                            <div className="flex flex-col gap-4">
                                <button className="bg-[#000048] text-white px-10 py-4 text-xs font-black uppercase tracking-widest transition-all duration-300 w-fit">
                                    Our Methodology
                                </button>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                    Page {currentPage} of {totalPages}
                                </p>
                            </div>
                        </div>

                        {/* Grid area */}
                        <div className="w-full lg:w-2/3">
                            {filteredServices.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                        {currentServices.map((offer, i) => (
                                            <motion.div
                                                key={offer.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.05 }}
                                                onClick={() => handleStartService(offer.title)}
                                                className={`p-8 rounded-sm shadow-sm transition-all duration-300 group relative cursor-pointer ${offer.featured ? 'bg-[#000048] text-white' : 'bg-white text-slate-900 hover:shadow-xl hover:-translate-y-1'
                                                    }`}
                                            >
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${offer.featured ? 'bg-white/20 text-white' : 'bg-slate-50 text-[#000048] group-hover:bg-[#000048] group-hover:text-white'
                                                    }`}>
                                                    {offer.icon}
                                                </div>
                                                <h3 className="text-lg font-bold mb-4">{offer.title}</h3>
                                                <p className={`text-xs mb-0 leading-relaxed line-clamp-3 ${offer.featured ? 'text-white/80' : 'text-slate-400'}`}>
                                                    {offer.desc}
                                                </p>

                                                <div className="absolute top-4 right-4 flex gap-2">
                                                    <div className={`w-6 h-6 rounded-sm flex items-center justify-center ${offer.featured ? 'bg-white/20' : 'bg-slate-50 text-slate-300 group-hover:bg-[#000048]/10 group-hover:text-[#000048]'
                                                        }`}>
                                                        <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Pagination Controls */}
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-4">
                                            <button
                                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                                disabled={currentPage === 1}
                                                className="p-3 rounded-full border border-slate-200 disabled:opacity-30 hover:bg-slate-100 transition-colors"
                                            >
                                                <ChevronRight className="w-5 h-5 rotate-180" />
                                            </button>
                                            <div className="flex gap-2">
                                                {[...Array(totalPages)].map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setCurrentPage(i + 1)}
                                                        className={`w-10 h-10 rounded-full text-xs font-black transition-all ${currentPage === i + 1 ? 'bg-[#000048] text-white' : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'
                                                            }`}
                                                    >
                                                        {i + 1}
                                                    </button>
                                                ))}
                                            </div>
                                            <button
                                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                                disabled={currentPage === totalPages}
                                                className="p-3 rounded-full border border-slate-200 disabled:opacity-30 hover:bg-slate-100 transition-colors"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16 bg-white border border-slate-100 rounded-sm shadow-sm p-8 flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-[#000048]/40">
                                        <Target className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">No matching services</h3>
                                    <p className="text-slate-400 text-sm max-w-sm mb-8">We couldn't find any services matching "{query}". Try searching with different keywords.</p>
                                    <button
                                        onClick={() => navigate('/services')}
                                        className="bg-[#000048] hover:bg-[#000066] text-white px-8 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#000048]/20"
                                    >
                                        View All Services
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="bg-slate-900 py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00004820] via-transparent to-transparent opacity-50" />
                <div className="container mx-auto px-6 relative z-10">
                    <h3 className="text-white text-3xl md:text-5xl font-black mb-6">Ready to build intelligent growth?</h3>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
                        Join 350+ global brands that have transformed their digital presence with our AI-powered ecosystems. Let's start building your custom growth plan today.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={() => handleStartService('Full Growth Plan')}
                            className="bg-[#000048] hover:bg-[#000066] text-white px-10 py-5 text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-2xl shadow-[#000048]/20"
                        >
                            Start Your Growth Journey
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-5 text-xs font-black uppercase tracking-widest transition-all duration-300 backdrop-blur-sm">
                            View Case Studies
                        </button>
                    </div>
                </div>
            </section>

            {/* --- Modals --- */}
            <ContactFormModal open={contactFormOpen} onClose={() => setContactFormOpen(false)} serviceName={selectedServiceName} />
        </div>
    );
};

// --- Form Modal Component ---
const ContactFormModal = ({ open, onClose, serviceName }) => {
    const { showNotification } = useNotification();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/contact', { ...formData, subject: `Service Request: ${serviceName}`, message: formData.message || `Interest in ${serviceName}` });
            showNotification("Request sent! We will contact you soon.", "success");
            onClose();
        } catch (error) {
            showNotification("Failed to send. Please try again.", "error");
        } finally { setLoading(false); }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
            <DialogTitle className="flex justify-between items-center bg-slate-900 text-white">
                <div className="flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-white" />
                    <span className="font-black uppercase tracking-widest text-sm">Start with {serviceName}</span>
                </div>
                <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ p: 4 }}>
                    <Stack spacing={3}>
                        <TextField fullWidth label="Full Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        <TextField fullWidth label="Email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        <TextField fullWidth label="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                        <TextField fullWidth label="Briefly describe your goals" multiline rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 4, pt: 0 }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{ bgcolor: '#000048', py: 1.5, '&:hover': { bgcolor: '#000066' } }}
                    >
                        {loading ? 'Sending...' : 'Submit Application'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default Services;
