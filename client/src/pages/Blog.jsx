import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import api from "../api/api"
import {
    CalendarDays,
    Clock,
    User,
    ArrowRight,
    BookOpen,
    Sparkles,
    TrendingUp,
    Zap,
    Globe,
    ChevronRight,
    Eye,
    Heart,
    Share2,
    Bookmark,
    Target,
    BarChart3,
    Rocket,
    Shield,
    Search,
    Mail,
    CheckCircle,
    DollarSign,
    Users,
    LineChart,
    Brain,
    Cpu,
    PieChart,
    Lightbulb,
    Award,
    Briefcase,
    FileText,
    Settings
} from "lucide-react";
import blogStats from "../assets/images/site/blog-growth-chart.png";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            type: "spring",
            stiffness: 120
        }
    },
};

const cardHoverVariants = {
    rest: {
        scale: 1,
        y: 0,
        rotateX: 0,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)"
    },
    hover: {
        scale: 1.03,
        y: -12,
        rotateX: 5,
        boxShadow: "0px 25px 50px rgba(29, 52, 97, 0.3)",
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 15
        }
    }
};

export default function BlogInsights() {
    const location = useLocation();
    const [showContent, setShowContent] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCategories, setFilteredCategories] = useState([]);
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [email, setEmail] = useState("");

    const handleSubscribe = async () => {
        if (!email) {
            alert("Please enter your work email");
            return;
        }

        try {
            await api.post("/subscribe", { email });
            alert("Subscribed successfully 🎉");
            setEmail("");
        } catch (err) {
            alert(err.response?.data?.message || "Subscription failed");
        }
    };

    // Page 
    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get('/blogs');
                // Ensure blogs is always an array, handling various response formats
                const blogData = Array.isArray(response.data) 
                    ? response.data 
                    : (response.data?.blogs || response.data?.data || []);
                setBlogs(blogData);
                setLoading(false);
            } catch (error) {
                console.error("Fetch Blogs Error:", error);
                setBlogs([]); // Fallback to empty array on error
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Blog categories data with detailed content
    const categoryDetails = [
        {
            id: "ai",
            label: "AI Marketing Trends",
            icon: <Brain size={20} />,
            count: 18,
            title: "AI Marketing Trends",
            description: "Future-Focused. Decision-Ready. AI is reshaping how brands attract, convert, and retain customers.",
            learnPoints: [
                "How AI is changing paid ads & targeting",
                "The rise of LLMs in content generation & personalization",
                "AI text classification, summarization, and analysis",
                "Future-proof strategies for modern brands"
            ],
            color: "primary",
            bgColor: "from-primary/5 to-cyan-50",
            borderColor: "border-primary/10",
            iconBg: "bg-primary/10",
            iconColor: "text-primary"
        },
        {
            id: "growth",
            label: "Growth Hacks",
            icon: <Rocket size={20} />,
            count: 12,
            title: "Growth Hacks",
            description: "Smart Moves. Real Impact. Growth isn't about doing more. It's about doing what actually works.",
            learnPoints: [
                "Proven growth experiments",
                "Future optimization tactics",
                "Conversion psychology insights",
                "Scaling hacks used by fast-growing brands"
            ],
            color: "emerald",
            bgColor: "from-emerald-50 to-green-50",
            borderColor: "border-emerald-100",
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600"
        },
        {
            id: "performance",
            label: "Performance Strategies",
            icon: <Target size={20} />,
            count: 8,
            title: "Performance Strategies",
            description: "ROI-Focused. Data-Backed. Performance Marketing is not about ads. It's about systems, signals, and cues.",
            learnPoints: [
                "How to reduce CPL without killing volume",
                "ROI & optimization framework",
                "Platform-neutral strategies (Google, Meta, LinkedIn, YouTube)",
                "Budget scaling without losses"
            ],
            color: "amber",
            bgColor: "from-amber-50 to-orange-50",
            borderColor: "border-amber-100",
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600"
        },
        {
            id: "automation",
            label: "Automation Guides",
            icon: <Cpu size={20} />,
            count: 10,
            title: "Automation Guides",
            description: "Build Once. Scale Forever. Discover how to automate repetitive tasks and create systems that work 24/7.",
            learnPoints: [
                "AI-Powered Workflow Automation",
                "Marketing Automation Funnels",
                "CRM Integration Strategies",
                "Chatbot Implementation Guides"
            ],
            color: "cyan",
            bgColor: "from-primary/5 to-blue-50",
            borderColor: "border-primary/10",
            iconBg: "bg-primary/10",
            iconColor: "text-primary"
        },
        {
            id: "strategy",
            label: "Business Strategy",
            icon: <Globe size={20} />,
            count: 14,
            title: "Business Strategy",
            description: "Long-term vision. Sustainable growth. Strategic frameworks for modern business challenges.",
            learnPoints: [
                "Market positioning strategies",
                "Competitive analysis frameworks",
                "Growth planning & forecasting",
                "Digital transformation roadmaps"
            ],
            color: "purple",
            bgColor: "from-purple-50 to-pink-50",
            borderColor: "border-purple-100",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600"
        }
    ];

    // Filter categories based on activeFilter
    useEffect(() => {
        if (activeFilter === "all") {
            setFilteredCategories(categoryDetails);
        } else {
            const filtered = categoryDetails.filter(cat => cat.id === activeFilter);
            setFilteredCategories(filtered);
        }
    }, [activeFilter]);

    // Categories for filter buttons
    const filterButtons = [
        { id: "all", label: "All Articles", icon: <BookOpen size={16} />, count: 42 },
        ...categoryDetails.map(({ id, label, icon, count }) => ({ id, label, icon, count }))
    ];

    // Navigation menu items
    const navItems = [
        "Home", "About us", "About the Founder", "Industries We Serve",
        "Case Studies", "Awards & Recognitions", "Contact Us", "Our Services",
        "AI SOLUTIONS", "Blog", "Careers", "Terms & Conditions",
        "Privacy Policy", "Cookie Policy", "Copyright Policy"
    ];

    return (
        <div className="bg-white text-slate-900 min-h-screen overflow-x-hidden">
            {/* Hero Section - Image Background Color */}
            <section
                ref={heroRef}
                className="relative overflow-hidden border-b border-slate-200/50"
                style={{
                    background: "linear-gradient(135deg, #0B1220 0%, #1a2e56 50%, #1d3461 100%)"
                }}
            >
                {/* Light blobs for texture */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-primary/20 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.7, type: "spring" }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6"
                    >
                        <Sparkles size={14} className="text-white" />
                        <span className="text-sm font-medium text-white">Latest Insights</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="text-3xl sm:text-4xl md:text-7xl font-extrabold tracking-tight mb-4"
                    >
                        <span className="text-white">
                            BLOG / INSIGHTS
                        </span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl md:text-3xl text-white/90 font-semibold mb-8"
                    >
                        Where Growth, AI & Strategy Come Together
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-10"
                    >
                        Future-Focused. Decision-Ready. Smart Moves. Real Impact.
                    </motion.p>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="max-w-2xl mx-auto relative mb-12"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                            <input
                                type="text"
                                placeholder="Search insights, trends, strategies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-transparent shadow-sm text-white placeholder-white/80"
                            />
                        </div>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
                    >
                        {[
                            { label: "Marketing Revenue", value: "$42M+", icon: <DollarSign size={20} />, color: "text-emerald-300" },
                            { label: "Net Promoter Score", value: "89 NPS", icon: <Users size={20} />, color: "text-primary-foreground/70" },
                            { label: "Articles", value: "420+", icon: <FileText size={20} />, color: "text-purple-300" },
                            { label: "Success Rate", value: "94%", icon: <CheckCircle size={20} />, color: "text-amber-300" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                                <div className="flex justify-center mb-2">
                                    <div className={`p-2 rounded-full bg-white/20`}>
                                        {React.cloneElement(stat.icon, { className: stat.color })}
                                    </div>
                                </div>
                                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                                <div className="text-sm text-white/80 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <AnimatePresence>
                {showContent && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="relative"
                    >
                        {/* Welcome Section */}
                        <motion.section
                            variants={itemVariants}
                            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"
                        >
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                    Welcome to the <span className="text-primary">Insights Hub</span> of AI Growth Era
                                </h2>
                                <div className="text-lg text-slate-600 max-w-4xl mx-auto leading-relaxed space-y-4">
                                    <p>
                                        <span className="font-bold text-slate-800">This is not a typical marketing blog.</span>
                                    </p>
                                    <p>
                                        This is where <span className="font-semibold text-primary">strategy meets execution</span>,
                                        and artificial intelligence meets real business growth.
                                    </p>
                                    <p>
                                        Here, we break down:
                                    </p>
                                </div>

                                {/* Key Features */}
                                <div className="mt-10 max-w-2xl mx-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {[
                                            {
                                                title: "What's working right now",
                                                desc: "Data-backed strategies currently delivering results",
                                                icon: <CheckCircle className="text-emerald-500" size={24} />
                                            },
                                            {
                                                title: "What's about to change next",
                                                desc: "Future trends and emerging opportunities",
                                                icon: <TrendingUp className="text-blue-500" size={24} />
                                            },
                                            {
                                                title: "What brands must do to stay ahead",
                                                desc: "Actionable steps for competitive advantage",
                                                icon: <Rocket className="text-purple-500" size={24} />
                                            }
                                        ].map((item, index) => (
                                            <motion.div
                                                key={index}
                                                whileHover={{ scale: 1.05 }}
                                                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 rounded-xl bg-slate-50">
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                                                        <p className="text-sm text-slate-600">{item.desc}</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Differentiation Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-100"
                                >
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Why Our Content Is Different</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold text-red-600 mb-3">Most blogs:</h4>
                                            <ul className="space-y-2 text-slate-600">
                                                <li className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                                                    Rewrite what's already online
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                                                    Chase keywords only
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                                                    Miss real-world execution
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-emerald-600 mb-3">AI Growth Era Insights:</h4>
                                            <ul className="space-y-2 text-slate-600">
                                                <li className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                                                    Based on live campaigns
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                                                    Backed by data & experience
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2"></div>
                                                    Written for decision-makers — not beginners
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-slate-700 italic">
                                        We don't write just to rank. We write to educate, influence, and build trust.
                                    </p>
                                </motion.div>
                            </div>

                            {/* Category Filters - NOW WORKING */}
                            <div className="mb-10">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Explore Categories</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {filterButtons.map((cat) => (
                                        <motion.button
                                            key={cat.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setActiveFilter(cat.id)}
                                            className={`
                                                flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300
                                                ${activeFilter === cat.id
                                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
                                                    : "bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:shadow-md"
                                                }
                                            `}
                                        >
                                            {React.cloneElement(cat.icon, {
                                                className: activeFilter === cat.id ? "text-white" : "text-slate-600"
                                            })}
                                            {cat.label}
                                            <span className={`
                                                ml-2 text-xs px-2 py-1 rounded-full 
                                                ${activeFilter === cat.id
                                                    ? "bg-white/30 text-white"
                                                    : "bg-slate-100 text-slate-700"
                                                }
                                            `}>
                                                {cat.count}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Active Filter Indicator */}
                                <div className="text-center mt-4 text-sm text-slate-500">
                                    {activeFilter === "all"
                                        ? "Showing all categories"
                                        : `Showing: ${categoryDetails.find(c => c.id === activeFilter)?.label}`
                                    }
                                </div>
                            </div>
                        </motion.section>

                        {/* FEATURED CATEGORIES DETAILS - NOW FILTERED */}
                        <motion.section
                            variants={itemVariants}
                            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredCategories.map((cat) => (
                                    <CategoryDetailCard key={cat.id} category={cat} />
                                ))}

                                {/* Show message when no categories match */}
                                {filteredCategories.length === 0 && activeFilter !== "all" && (
                                    <div className="col-span-3 text-center py-16">
                                        <div className="text-6xl mb-4">📚</div>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-2">No categories found</h3>
                                        <p className="text-slate-500">Try selecting a different filter</p>
                                        <button
                                            onClick={() => setActiveFilter("all")}
                                            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                        >
                                            View All Categories
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.section>

                        {/* BLOG CARDS SECTION */}
                        <motion.section
                            variants={itemVariants}
                            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <h3 className="text-3xl font-bold text-slate-900">
                                    Popular <span className="text-blue-600">Reads</span>
                                </h3>
                                <div className="flex items-center gap-2 text-blue-600 font-medium cursor-pointer hover:gap-3 transition-all duration-300">
                                    View All Articles <ChevronRight size={18} />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {loading ? (
                                    <div className="col-span-3 text-center py-10">Loading insights...</div>
                                ) : (Array.isArray(blogs) && blogs.length > 0) ? (
                                    blogs.map((blog, i) => (
                                        <EnhancedBlogCard key={blog._id || i} index={i} blog={blog} />
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-10">No insights found.</div>
                                )}
                            </div>
                        </motion.section>

                        {/* Newsletter & Navigation */}
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Newsletter Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="lg:col-span-2 relative rounded-3xl overflow-hidden"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)"
                                    }}
                                >
                                    <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                                    <div className="relative backdrop-blur-sm bg-white/70 p-10 lg:p-12">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mb-6">
                                            <Mail size={28} className="text-white" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 mb-4">
                                            Stay Ahead of the Curve
                                        </h3>
                                        <p className="text-slate-600 mb-6">
                                            Want Actionable Growth Insights — Not Noise? Stay updated with:
                                        </p>
                                        <div className="grid grid-cols-2 gap-4 mb-8">
                                            {[
                                                "AI marketing trends",
                                                "Growth strategies that work",
                                                "Automation frameworks",
                                                "Performance & scaling insights"
                                            ].map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <CheckCircle size={16} className="text-emerald-500" />
                                                    <span className="text-slate-700">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Your work email"
                                                className="flex-grow px-5 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                                            />
                                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300" onClick={handleSubscribe}>
                                                Subscribe for Insights
                                            </button>
                                        </div>

                                        {/* Stats Image */}
                                        <div className="w-full mt-8">
                                            <img
                                                src={blogStats}
                                                alt="Growth Chart"
                                                className="w-full h-auto object-contain rounded-2xl shadow-sm border border-slate-100"
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Navigation Sidebar */}
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
                                >
                                    <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Briefcase size={20} />
                                        Website Navigation
                                    </h4>
                                    <div className="space-y-1">
                                        {navItems.map((item, idx) => {
                                            const pathMap = {
                                                "Home": "/",
                                                "About us": "/about",
                                                "About the Founder": "/about",
                                                "Industries We Serve": "/services",
                                                "Case Studies": "/blog",
                                                "Contact Us": "/contact",
                                                "Our Services": "/services",
                                                "AI SOLUTIONS": "/services",
                                                "Blog": "/blog",
                                                "Careers": "/careers",
                                                "Terms & Conditions": "/terms-and-conditions",
                                                "Privacy Policy": "/privacy-policy",
                                                "Cookie Policy": "/cookie-policy",
                                                "Copyright Policy": "/copyright-policy",
                                                "Awards & Recognitions": "/awards"
                                            };
                                            const path = pathMap[item] || "#";
                                            return (
                                                <Link
                                                    key={idx}
                                                    to={path}
                                                    state={item === "Contact Us" ? { background: location } : undefined}
                                                    className="flex items-center gap-2 px-3 py-2.5 text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <ChevronRight size={14} className="text-slate-400" />
                                                    {item}
                                                </Link>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-200">
                                        <div className="flex items-center justify-between text-sm text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Settings size={16} />
                                                <span>Activate Windows</span>
                                            </div>
                                            <div className="text-xs bg-slate-100 px-2 py-1 rounded">
                                                Go to Settings
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"></div>
                                                <span>14°C Mostly clear</span>
                                            </div>
                                            <div className="text-xs text-slate-400">
                                                Search
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom Styles */}
            <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .bg-grid-slate-100 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(241 245 249 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
        </div>
    );
}

// Separate component for category detail cards
function CategoryDetailCard({ category }) {
    const getIcon = (id) => {
        switch (id) {
            case 'ai': return <Brain size={24} className={category.iconColor} />;
            case 'growth': return <Rocket size={24} className={category.iconColor} />;
            case 'performance': return <Target size={24} className={category.iconColor} />;
            case 'automation': return <Cpu size={24} className={category.iconColor} />;
            case 'strategy': return <Globe size={24} className={category.iconColor} />;
            default: return <BookOpen size={24} className={category.iconColor} />;
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={`bg-gradient-to-br ${category.bgColor} rounded-2xl p-6 border ${category.borderColor} shadow-sm hover:shadow-xl transition-all duration-300`}
        >
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${category.iconBg}`}>
                    {getIcon(category.id)}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
            </div>

            <p className="text-slate-700 mb-4">
                {category.description}
            </p>

            <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-1">
                <Sparkles size={16} className="text-blue-500" />
                What You'll Learn Here:
            </h4>

            <ul className="space-y-2 text-sm text-slate-600 mb-6">
                {category.learnPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                        <ArrowRight size={16} className={`text-${category.color}-500 mt-0.5 flex-shrink-0`} />
                        {point}
                    </li>
                ))}
            </ul>

            <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 italic">
                    {category.count} articles
                </span>
                <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-1 text-blue-600 text-sm font-medium"
                >
                    Explore {category.label.split(' ')[0]} <ChevronRight size={16} />
                </motion.button>
            </div>
        </motion.div>
    );
}

function EnhancedBlogCard({ index, blog }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        }
    }, [controls, isInView]);

    const data = {
        title: blog?.title || "Untitled",
        desc: blog?.content ? blog.content.substring(0, 100) + '...' : 'No description available.',
        category: "Insights",
        readTime: "5 min read",
        author: blog?.author || "Admin",
        date: blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Recently",
        likes: Math.floor(Math.random() * 100),
        views: "1.2k",
        tag: "New",
        image: blog?.image
            ? (blog.image.startsWith('http') ? blog.image : `${import.meta.env.VITE_SERVER_URL}${blog.image}`)
            : "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
    };

    return (
        <motion.div
            ref={cardRef}
            initial="rest"
            whileHover="hover"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 60, rotateX: 10 },
                visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: {
                        duration: 0.8,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                    }
                }
            }}
            custom={index}
            className="relative h-full"
        >
            {/* 3D Gradient Border Effect */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 opacity-70 blur-sm"></div>
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400"></div>

            {/* Main Card */}
            <motion.div
                variants={cardHoverVariants}
                className="relative h-full rounded-2xl bg-white overflow-hidden"
                style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px"
                }}
            >
                {/* Card Header with Image */}
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-blue-700 rounded-full">
                            {data.category}
                        </span>
                    </div>

                    {/* Tag Badge */}
                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full">
                            {data.tag}
                        </span>
                    </div>

                    {/* Floating stats */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-xs">
                            <Eye size={12} /> {data.views}
                        </div>
                    </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                            <User size={14} />
                            <span className="font-medium">{data.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CalendarDays size={14} />
                            <span>{data.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{data.readTime}</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
                        {data.title}
                    </h3>

                    <p className="text-slate-600 mb-6">
                        {data.desc}
                    </p>

                    {/* Interactive Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 text-blue-600 font-semibold group"
                        >
                            Read Full Article
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center gap-1 text-slate-500 hover:text-red-500 transition-colors"
                            >
                                <Heart size={18} />
                                <span className="text-sm">{data.likes}</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-slate-500 hover:text-blue-500 transition-colors"
                            >
                                <Bookmark size={18} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-slate-500 hover:text-emerald-500 transition-colors"
                            >
                                <Share2 size={18} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}