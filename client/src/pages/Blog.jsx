import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";
import api from "../api/api";
import {
    CalendarDays,
    Clock,
    User,
    ArrowRight,
    BookOpen,
    Eye,
    Heart,
    Share2,
    Bookmark,
    Target,
    Rocket,
    Search,
    ChevronRight,
    Facebook,
    Twitter,
    Linkedin,
    Calendar,
    Play,
    CornerDownRight
} from "lucide-react";

const cardHoverVariants = {
    rest: { scale: 1, y: 0, rotateX: 0, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)" },
    hover: { scale: 1.03, y: -12, rotateX: 5, boxShadow: "0px 25px 50px rgba(29, 52, 97, 0.3)", transition: { type: "spring", stiffness: 300, damping: 15 } }
};

export default function BlogInsights() {
    const location = useLocation();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch blogs
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get('/blogs');
                let blogData = Array.isArray(response.data) 
                    ? response.data 
                    : (response.data?.blogs || response.data?.data || []);
                
                // Fallback to beautiful dummy content if backend has no blogs yet
                if (blogData.length === 0) {
                    blogData = [
                        {
                            _id: "1",
                            title: "Statute of Limitations in Personal Injury Lawsuits",
                            content: "Our practice encompasses an extensive array of criminal charges, ranging from misdemeanors to serious felonies. Whether it's DUI offenses, drug-related charges, assault, white-collar crimes, or more complex cases...",
                            author: "Alex Robertson",
                            createdAt: new Date().toISOString(),
                            category: "Marketing Trends",
                            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=800&q=80"
                        },
                        {
                            _id: "2",
                            title: "Navigating the complexities of divorce law",
                            content: "Requires a legal compassionate advocate who understands your unique situation to best service your dedicated lawyers...",
                            author: "Alexander Arnold",
                            createdAt: new Date(Date.now() - 86400000).toISOString(),
                            category: "Growth Hacks",
                            image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=800&q=80"
                        },
                        {
                            _id: "3",
                            title: "Building Robust Defenses: Advocates for Justice",
                            content: "In the realm of defense, our proficiency transcends the mere understanding of statutes; it delves into the nuanced artistry of legal advocacy...",
                            author: "Matthew Larson",
                            createdAt: new Date(Date.now() - 172800000).toISOString(),
                            category: "Performance",
                            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
                        },
                        {
                            _id: "4",
                            title: "Exploring Negligence in Personal Injury Claims",
                            content: "Personal injury law encompasses a wide spectrum of cases where individuals have suffered harm due to the negligence, recklessness...",
                            author: "Ben Ducket",
                            createdAt: new Date(Date.now() - 259200000).toISOString(),
                            category: "Strategy",
                            image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"
                        }
                    ];
                }
                setBlogs(blogData);
                setLoading(false);
            } catch (error) {
                console.error("Fetch Blogs Error:", error);
                // Fallback on error too
                setBlogs([
                    {
                        _id: "1",
                        title: "Statute of Limitations in Personal Injury Lawsuits",
                        content: "Our practice encompasses an extensive array of criminal charges...",
                        author: "Alex Robertson",
                        createdAt: new Date().toISOString(),
                        category: "Marketing Trends",
                        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=800&q=80"
                    }
                ]);
                setLoading(false);
            }
        };
        fetchBlogs();
        window.scrollTo(0, 0);
    }, []);

    const categories = [
        "Marketing Trends", "Growth Hacks", "Performance Strategies", 
        "Automation Guides", "Business Strategy", "Case Studies"
    ];

    const recentBlogs = blogs.slice(0, 4);

    const formatDate = (dateString) => {
        if (!dateString) return "Recently";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white pb-20">
            {/* HERO BANNER */}
            <div className="bg-[#0B1220] pt-32 pb-20 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-serif font-bold max-w-4xl mx-auto px-4 leading-tight">
                    Our Blog & Insights
                </h1>
                <div className="mt-6 flex justify-center items-center gap-2 text-sm text-gray-400 font-medium tracking-wide">
                    <Link to="/" className="hover:text-white transition">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-white">Our Blog</span>
                </div>
            </div>

            {/* MAIN LAYOUT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 flex flex-col lg:flex-row gap-12">
                
                {/* LEFT: CONTENT AREA */}
                <div className="lg:w-2/3">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-3xl font-serif font-bold text-slate-900">
                            Latest <span className="text-primary">Articles</span>
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {loading ? (
                            <div className="col-span-2 flex justify-center py-20">
                                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : blogs.length > 0 ? (
                            blogs.map((blog, i) => (
                                <EnhancedBlogCard key={blog._id || i} index={i} blog={blog} />
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-20 text-gray-500">No insights found.</div>
                        )}
                    </div>

                    {/* Pagination */}
                    {blogs.length > 0 && (
                        <div className="flex justify-center mt-12 gap-2">
                            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition disabled:opacity-50" disabled>
                                <ChevronRight size={18} className="rotate-180" />
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold shadow-md shadow-primary/20 flex items-center justify-center">1</button>
                            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition">2</button>
                            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition">3</button>
                            <button className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* Featured Insight Block (As requested) */}
                    <div className="mt-16 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">Exploring Negligence in Personal Injury Claims</h3>
                        <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                            Personal injury law encompasses a wide spectrum of cases where individuals have suffered harm due to the negligence, recklessness, or intentional actions of others. From car accidents and slip-and-fall incidents to medical malpractice and product liability claims, these cases require expert guidance.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="rounded-xl overflow-hidden h-48 md:h-64">
                                <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=600&q=80" alt="Meeting" className="w-full h-full object-cover" />
                            </div>
                            <div className="rounded-xl overflow-hidden h-48 md:h-64 relative group cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Team" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                <div className="absolute inset-0 bg-black/30 flex justify-center items-center">
                                    <div className="w-12 h-12 bg-primary rounded-full flex justify-center items-center text-white pl-1 shadow-lg">
                                        <Play fill="white" size={18} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tags & Share */}
                        <div className="flex flex-col sm:flex-row justify-between items-center py-6 border-t border-b border-gray-100 mb-8">
                            <div className="flex items-center gap-3 mb-4 sm:mb-0">
                                <span className="font-bold text-gray-900">Our Tags:</span>
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md">#Legal Warriors</span>
                                <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-md shadow-sm">#Legal Defense Expert</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-gray-900 text-sm">Share:</span>
                                <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex justify-center items-center text-gray-400 hover:text-primary hover:border-primary transition"><Facebook size={12} /></a>
                                <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex justify-center items-center text-gray-400 hover:text-primary hover:border-primary transition"><Twitter size={12} /></a>
                                <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex justify-center items-center text-gray-400 hover:text-primary hover:border-primary transition"><Linkedin size={12} /></a>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="mb-4">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Comments (2)</h3>
                            
                            <div className="space-y-4">
                                {/* Comment 1 */}
                                <div className="bg-gray-50 p-6 rounded-xl flex gap-4 border border-gray-100">
                                    <img src="https://ui-avatars.com/api/?name=Matthew+Larson&background=e0f2fe" alt="Matthew" className="w-10 h-10 rounded-full mt-1" />
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">Matthew Larson</h4>
                                                <span className="text-xs text-gray-400">15 March, 2025</span>
                                            </div>
                                            <button className="text-xs font-semibold text-gray-500 hover:text-primary flex items-center gap-1">
                                                <CornerDownRight size={12} /> Reply
                                            </button>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            In the realm of defense, our proficiency transcends the mere understanding of statutes; it delves into the nuanced artistry of legal advocacy. We are architects of defense.
                                        </p>
                                    </div>
                                </div>

                                {/* Comment 2 */}
                                <div className="bg-gray-50 p-6 rounded-xl flex gap-4 border border-gray-100">
                                    <img src="https://ui-avatars.com/api/?name=Ben+Ducket&background=ffedd5" alt="Ben" className="w-10 h-10 rounded-full mt-1" />
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">Ben Ducket</h4>
                                                <span className="text-xs text-gray-400">16 March, 2025</span>
                                            </div>
                                            <button className="text-xs font-semibold text-gray-500 hover:text-primary flex items-center gap-1">
                                                <CornerDownRight size={12} /> Reply
                                            </button>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            In our pursuit of justice, we stand resolute, honoring the trust placed in us by those seeking guidance through the labyrinth of legal intricacies.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Banner */}
                    <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
                        <div className="flex-1 relative z-10">
                            <h4 className="text-2xl font-serif font-bold text-slate-900 mb-2">Subscribe to our Newsletter</h4>
                            <p className="text-slate-600 text-sm mb-6">Stay updated with the latest insights, expert advice, and growth strategies delivered directly to your inbox.</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input type="email" placeholder="Your work email" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[currentColor]/50 shadow-sm" />
                                <button className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition whitespace-nowrap shadow-md shadow-primary/20">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: SIDEBAR */}
                <div className="lg:w-1/3 space-y-8">
                    {/* Search */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h4 className="font-serif font-bold text-gray-900 mb-4 text-lg">Search</h4>
                        <div className="flex">
                            <input 
                                type="text" 
                                placeholder="Search...." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-l-lg focus:outline-none"
                            />
                            <button className="bg-primary px-4 text-white rounded-r-lg hover:bg-primary/90 transition">
                                <Search size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Blog Category */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h4 className="font-serif font-bold text-gray-900 mb-4 text-lg">Blog Category</h4>
                        <div className="space-y-2">
                            {categories.map((cat, idx) => (
                                <button 
                                    key={idx}
                                    className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm font-semibold transition
                                        ${idx === 0 
                                            ? 'bg-primary text-white shadow-md shadow-primary/20' 
                                            : 'bg-white text-gray-600 hover:bg-primary/10 border border-gray-100 hover:text-primary'
                                        }`}
                                >
                                    {cat}
                                    <ChevronRight size={16} className={idx === 0 ? "text-white" : "text-gray-400"} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Our Recent Blog */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h4 className="font-serif font-bold text-gray-900 mb-4 text-lg">Our Recent Blog</h4>
                        <div className="space-y-4">
                            {recentBlogs.length > 0 ? recentBlogs.map((b, i) => (
                                <Link to={`/blog/${b._id}`} key={i} className="flex gap-4 group">
                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                        <img 
                                            src={b.image ? (b.image.startsWith('http') ? b.image : `${import.meta.env.VITE_SERVER_URL}${b.image}`) : "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=200&q=80"} 
                                            alt="Thumbnail" 
                                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300" 
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                                            <Calendar size={12} /> {formatDate(b.createdAt)}
                                        </div>
                                        <h5 className="text-sm font-bold text-gray-900 group-hover:text-primary transition line-clamp-2 leading-tight">
                                            {b.title}
                                        </h5>
                                    </div>
                                </Link>
                            )) : (
                                <div className="text-gray-500 text-sm">No recent blogs found.</div>
                            )}
                        </div>
                    </div>

                    {/* Our Author Spotlight */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                        <h4 className="font-serif font-bold text-gray-900 mb-4 text-lg text-left">Our Editor</h4>
                        <img src={`https://ui-avatars.com/api/?name=Admin&background=random&size=200`} alt="Admin" className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg border-4 border-white" />
                        <h5 className="font-bold text-gray-900 text-lg">AI Growth Era</h5>
                        <p className="text-xs text-primary font-bold uppercase tracking-wider mb-4">Growth Team</p>
                        <p className="text-sm text-gray-600 mb-4">Curating insights and strategies on growth, performance, and business transformation.</p>
                        <div className="flex justify-center items-center gap-3">
                            <a href="#" className="text-gray-400 hover:text-primary transition"><Facebook size={16} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition"><Twitter size={16} /></a>
                            <a href="#" className="text-gray-400 hover:text-primary transition"><Linkedin size={16} /></a>
                        </div>
                    </div>

                    {/* Our Popular Tags */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h4 className="font-serif font-bold text-gray-900 mb-4 text-lg">Our Popular Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded hover:border-primary hover:text-primary cursor-pointer transition">#GrowthHacks</span>
                            <span className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded shadow-md cursor-pointer transition">#AI Marketing</span>
                            <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded hover:border-primary hover:text-primary cursor-pointer transition">#Performance</span>
                            <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded hover:border-primary hover:text-primary cursor-pointer transition">#Strategy</span>
                            <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded hover:border-primary hover:text-primary cursor-pointer transition">#Automation</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

// Retaining the EnhancedBlogCard component
function EnhancedBlogCard({ index, blog }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, margin: "-50px" });
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
                hidden: { opacity: 0, y: 40, rotateX: 5 },
                visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: {
                        duration: 0.6,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                    }
                }
            }}
            className="relative h-full"
        >
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary to-primary/40 opacity-20 blur-sm"></div>
            
            <motion.div
                variants={cardHoverVariants}
                className="relative h-full rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-sm flex flex-col"
            >
                <div className="relative h-48 overflow-hidden">
                    <Link to={`/blog/${blog?._id || index}`}>
                        <img
                            src={data.image}
                            alt={data.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                        />
                    </Link>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary rounded-full shadow-sm">
                            {data.category}
                        </span>
                    </div>

                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-primary to-blue-500 text-white text-xs font-bold rounded-full shadow-sm">
                            {data.tag}
                        </span>
                    </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
                        <div className="flex items-center gap-1">
                            <User size={14} className="text-primary" />
                            <span>{data.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CalendarDays size={14} className="text-primary" />
                            <span>{data.date}</span>
                        </div>
                    </div>

                    <Link to={`/blog/${blog?._id || index}`}>
                        <h3 className="text-xl font-serif font-bold text-gray-900 mb-3 leading-tight hover:text-primary transition">
                            {data.title}
                        </h3>
                    </Link>

                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                        {data.desc}
                    </p>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                        <Link to={`/blog/${blog?._id || index}`}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-1 text-sm text-slate-800 font-bold group cursor-pointer hover:text-primary transition"
                            >
                                Read Article
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                        </Link>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
                                <Heart size={16} />
                                <span className="text-xs">{data.likes}</span>
                            </button>
                            <button className="text-gray-400 hover:text-blue-500 transition-colors">
                                <Bookmark size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}