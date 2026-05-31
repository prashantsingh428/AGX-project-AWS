import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar, User, MessageCircle, ChevronRight, Search,
    Facebook, Twitter, Linkedin, Instagram, Play, CornerDownRight
} from 'lucide-react';
import api from '../api/api';

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch single blog
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/blogs/${id}`);
                setBlog(response.data);
            } catch (error) {
                console.error("Failed to fetch blog:", error);

                // Fallback to beautiful dummy content
                const dummyBlogs = {
                    "1": {
                        _id: "1",
                        title: "Statute of Limitations in Personal Injury Lawsuits",
                        content: "Our practice encompasses an extensive array of criminal charges, ranging from misdemeanors to serious felonies. Whether it's DUI offenses, drug-related charges, assault, white-collar crimes, or more complex cases. <br/><br/> We prioritize open communication, ensuring that our clients are fully informed about their legal options, potential consequences, and the strategic pathways we chart for their defense.",
                        author: "Alex Robertson",
                        createdAt: new Date().toISOString(),
                        category: "Marketing Trends",
                        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=1200&q=80"
                    },
                    "2": {
                        _id: "2",
                        title: "Navigating the complexities of divorce law",
                        content: "Requires a legal compassionate advocate who understands your unique situation to best service your dedicated lawyers...",
                        author: "Alexander Arnold",
                        createdAt: new Date(Date.now() - 86400000).toISOString(),
                        category: "Growth Hacks",
                        image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=1200&q=80"
                    },
                    "3": {
                        _id: "3",
                        title: "Building Robust Defenses: Advocates for Justice",
                        content: "In the realm of defense, our proficiency transcends the mere understanding of statutes; it delves into the nuanced artistry of legal advocacy...",
                        author: "Matthew Larson",
                        createdAt: new Date(Date.now() - 172800000).toISOString(),
                        category: "Performance",
                        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80"
                    },
                    "4": {
                        _id: "4",
                        title: "Exploring Negligence in Personal Injury Claims",
                        content: "Personal injury law encompasses a wide spectrum of cases where individuals have suffered harm due to the negligence, recklessness...",
                        author: "Ben Ducket",
                        createdAt: new Date(Date.now() - 259200000).toISOString(),
                        category: "Strategy",
                        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
                    }
                };

                if (dummyBlogs[id]) {
                    setBlog(dummyBlogs[id]);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
        window.scrollTo(0, 0);
    }, [id]);

    // Fetch recent blogs for sidebar
    useEffect(() => {
        const fetchRecent = async () => {
            try {
                const response = await api.get('/blogs');
                const data = Array.isArray(response.data)
                    ? response.data
                    : (response.data?.blogs || response.data?.data || []);
                setRecentBlogs(data.slice(0, 4));
            } catch (error) {
                console.error("Failed to fetch recent blogs:", error);
            }
        };
        fetchRecent();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "Recently";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Article Not Found</h2>
                <p className="text-slate-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
                <Link to="/blog" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90">
                    Back to Blog
                </Link>
            </div>
        );
    }

    const featuredImage = blog.image
        ? (blog.image.startsWith('http') ? blog.image : `${import.meta.env.VITE_SERVER_URL}${blog.image}`)
        : "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=1200&q=80";

    const categories = [
        "Marketing Trends", "Personal Injury Law", "Education Law",
        "Law Master Support", "Injury Rights Partners", "Reclaim Legal Service"
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-primary selection:text-white pb-20">
            {/* HERO BANNER */}
            <div className="bg-[#0B1220] pt-32 pb-20 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-serif font-bold max-w-4xl mx-auto px-4 leading-tight">
                    {blog.title}
                </h1>
                <div className="mt-6 flex justify-center items-center gap-2 text-sm text-gray-400 font-medium tracking-wide">
                    <Link to="/" className="hover:text-white transition">Home</Link>
                    <ChevronRight size={14} />
                    <Link to="/blog" className="hover:text-white transition">Our Blog</Link>
                    <ChevronRight size={14} />
                    <span className="text-white truncate max-w-[200px] md:max-w-md">{blog.title}</span>
                </div>
            </div>

            {/* MAIN LAYOUT */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 flex flex-col lg:flex-row gap-12">

                {/* LEFT: CONTENT AREA */}
                <div className="lg:w-2/3">
                    {/* Featured Image */}
                    <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 relative">
                        {/* Decorative striped circle top right */}
                        <div className="absolute -top-16 -right-16 w-64 h-64 border-[40px] border-gray-100 rounded-full opacity-50 z-0"></div>
                        <img src={featuredImage} alt={blog.title} className="w-full h-full object-cover relative z-10" />
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium mb-8 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                <img src={`https://ui-avatars.com/api/?name=${blog.author || 'Admin'}&background=random`} alt="Author" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-gray-900 font-semibold">{blog.author || "Alex Robertson"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-primary" />
                            {formatDate(blog.createdAt)}
                        </div>
                        <div className="flex items-center gap-2">
                            <User size={16} className="text-primary" />
                            Legal Defense Expert
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageCircle size={16} className="text-primary" />
                            2 Comments
                        </div>
                    </div>

                    {/* Blog Content */}
                    <div className="prose prose-lg max-w-none text-gray-600 mb-10">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">{blog.title}</h2>

                        {/* Render rich text or basic text */}
                        <div dangerouslySetInnerHTML={{ __html: blog.content?.replace(/\n/g, '<br/>') || "<p>Detailed content goes here. The strategy emphasizes open communication, ensuring clients are fully informed about their options.</p>" }} />

                        {/* Visual blockquote (From screenshot) */}
                        <div className="my-10 p-8 bg-primary/5 rounded-xl border-l-4 border-primary relative">
                            <div className="absolute top-4 left-4 text-primary opacity-20 text-6xl font-serif">"</div>
                            <p className="text-xl font-medium text-gray-800 leading-relaxed relative z-10 italic pl-6 mb-6">
                                Navigating the complexities of law require a legal compassionate advocate who understands your unique situation to best service your dedicated lawyers.
                            </p>
                            <div className="flex items-center gap-4 pl-6">
                                <img src="https://ui-avatars.com/api/?name=Alexander+Arnold&background=0D8ABC&color=fff" alt="Alexander" className="w-12 h-12 rounded-full" />
                                <div>
                                    <h4 className="font-bold text-gray-900">Alexander Arnold</h4>
                                    <p className="text-sm text-gray-500">Owner Lawny Lawyer</p>
                                </div>
                            </div>
                        </div>

                        {/* Extra sections mimicking screenshot details */}
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 mt-8">Exploring Excellence in Our Claims</h3>
                        <p className="mb-8">
                            Personal injury law encompasses a wide spectrum of cases where individuals have suffered harm due to the negligence, recklessness, or intentional actions of others. From car accidents and slip-and-fall incidents to medical malpractice and product liability claims, these cases require expert guidance.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="rounded-xl overflow-hidden h-64">
                                <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=600&q=80" alt="Meeting" className="w-full h-full object-cover" />
                            </div>
                            <div className="rounded-xl overflow-hidden h-64 relative group cursor-pointer">
                                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80" alt="Team" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                <div className="absolute inset-0 bg-black/30 flex justify-center items-center">
                                    <div className="w-14 h-14 bg-primary rounded-full flex justify-center items-center text-white pl-1 shadow-lg">
                                        <Play fill="white" size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tags & Share */}
                    <div className="flex flex-col sm:flex-row justify-between items-center py-6 border-t border-b border-gray-100 mb-12">
                        <div className="flex items-center gap-3 mb-4 sm:mb-0">
                            <span className="font-bold text-gray-900">Our Tags:</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md">#Legal Warriors</span>
                            <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-md">#Legal Defense Expert</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-900">Share:</span>
                            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex justify-center items-center text-gray-400 hover:text-primary hover:border-primary transition"><Facebook size={14} /></a>
                            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex justify-center items-center text-gray-400 hover:text-primary hover:border-primary transition"><Twitter size={14} /></a>
                            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex justify-center items-center text-gray-400 hover:text-primary hover:border-primary transition"><Linkedin size={14} /></a>
                            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex justify-center items-center text-gray-400 hover:text-primary hover:border-primary transition"><Instagram size={14} /></a>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">Comments (2)</h3>

                        <div className="space-y-6">
                            {/* Comment 1 */}
                            <div className="bg-gray-50 p-6 rounded-xl flex gap-4">
                                <img src="https://ui-avatars.com/api/?name=Matthew+Larson&background=e0f2fe" alt="Matthew" className="w-12 h-12 rounded-full mt-1" />
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-gray-900">Matthew Larson</h4>
                                            <span className="text-xs text-gray-400">15 March, 2025</span>
                                        </div>
                                        <button className="text-sm font-semibold text-gray-500 hover:text-primary flex items-center gap-1">
                                            <CornerDownRight size={14} /> Reply
                                        </button>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        In the realm of defense, our proficiency transcends the mere understanding of statutes; it delves into the nuanced artistry of legal advocacy. We are architects of defense, sculpting compelling narratives.
                                    </p>
                                </div>
                            </div>

                            {/* Comment 2 */}
                            <div className="bg-gray-50 p-6 rounded-xl flex gap-4">
                                <img src="https://ui-avatars.com/api/?name=Ben+Ducket&background=ffedd5" alt="Ben" className="w-12 h-12 rounded-full mt-1" />
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-gray-900">Ben Ducket</h4>
                                            <span className="text-xs text-gray-400">16 March, 2025</span>
                                        </div>
                                        <button className="text-sm font-semibold text-gray-500 hover:text-primary flex items-center gap-1">
                                            <CornerDownRight size={14} /> Reply
                                        </button>
                                    </div>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        In our pursuit of justice, we stand resolute, honoring the trust placed in us by those seeking guidance through the labyrinth of legal intricacies. We are more than legal practitioners; we are guardians of rights.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Leave a Comment */}
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Leave A Comment</h3>
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-2">Send us a message</h4>
                            <p className="text-sm text-gray-500 mb-6">Provide clear contact information, including phone number, email, and address.</p>

                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    <input type="tel" placeholder="Phone" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                                <textarea rows="4" placeholder="Your Message" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"></textarea>
                                <button type="button" className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition shadow-lg shadow-primary/20">
                                    Post Comment
                                </button>
                            </form>
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

                    {/* Our Author */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center">
                        <h4 className="font-serif font-bold text-gray-900 mb-4 text-lg text-left">Our Author</h4>
                        <img src={`https://ui-avatars.com/api/?name=${blog.author || 'Author'}&background=random&size=200`} alt="Author" className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg border-4 border-white" />
                        <h5 className="font-bold text-gray-900 text-lg">{blog.author || "Alex Robertson"}</h5>
                        <p className="text-xs text-primary font-bold uppercase tracking-wider mb-4">Senior Analyst</p>
                        <p className="text-sm text-gray-600 mb-4">Sharing insights and strategies on growth, performance, and legal frameworks.</p>
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
                            <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded hover:border-primary hover:text-primary cursor-pointer transition">#Legal Warriors</span>
                            <span className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded shadow-md cursor-pointer transition">#Legal Defense Expert</span>
                            <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded hover:border-primary hover:text-primary cursor-pointer transition">#Your Legal Guardians</span>
                            <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded hover:border-primary hover:text-primary cursor-pointer transition">Legal Shield</span>
                            <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded hover:border-primary hover:text-primary cursor-pointer transition">#Strong Legal Defense</span>
                            <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded hover:border-primary hover:text-primary cursor-pointer transition">Legal Lawyers</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
