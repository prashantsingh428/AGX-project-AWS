import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    LayoutDashboard, Users, TrendingUp, Briefcase, MessageSquare, 
    Mail, FileText, Plus, Trash2, Eye, Search, Sparkles, LogOut, 
    Check, X, FileUp, ShieldAlert, Loader2, ArrowLeft, ExternalLink,
    Grid, PlusCircle, CheckCircle2, AlertCircle
} from 'lucide-react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';


const AdminPanel = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('stats');
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    
    // Data states
    const [stats, setStats] = useState({ users: 0, leads: 0, applications: 0, contacts: 0, blogs: 0, subscribers: 0 });
    const [usersList, setUsersList] = useState([]);
    const [leadsList, setLeadsList] = useState([]);
    const [appsList, setAppsList] = useState([]);
    const [contactsList, setContactsList] = useState([]);
    const [subsList, setSubsList] = useState([]);
    const [blogsList, setBlogsList] = useState([]);
    
    // UI utilities
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null); // For detail modals
    const [modalType, setModalType] = useState(''); // 'lead', 'app', 'contact', 'user', 'blog'
    
    // Blog Form states
    const [blogForm, setBlogForm] = useState({
        title: '',
        slug: '',
        content: '',
        author: '',
        tags: '',
        published: true,
        image: null
    });
    const [imagePreview, setImagePreview] = useState('');

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    // Client-side protection (guarded by ProtectedRoute, just load stats)
    useEffect(() => {
        fetchStats();
    }, []);

    // Fetch Stats
    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/stats');
            if (res.data.success) {
                setStats(res.data.data);
            }
        } catch (err) {
            console.error("Fetch Stats error:", err);
            showNotification("Failed to load dashboard metrics", "error");
        } finally {
            setLoading(false);
        }
    };

    // Fetch specific tab data
    useEffect(() => {
        if (activeTab === 'stats') {
            fetchStats();
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setSearchTerm('');
            try {
                if (activeTab === 'users') {
                    const res = await api.get('/admin/users');
                    setUsersList(res.data.data || []);
                } else if (activeTab === 'leads') {
                    const res = await api.get('/admin/leads');
                    setLeadsList(res.data.data || []);
                } else if (activeTab === 'applications') {
                    const res = await api.get('/admin/applications');
                    setAppsList(res.data.data || []);
                } else if (activeTab === 'contacts') {
                    const res = await api.get('/admin/contacts');
                    setContactsList(res.data.data || []);
                } else if (activeTab === 'subscribers') {
                    const res = await api.get('/admin/subscribers');
                    setSubsList(res.data.data || []);
                } else if (activeTab === 'blogs') {
                    // Fetch from public blogs listing, which returns list of blogs
                    const res = await api.get('/blogs');
                    setBlogsList(res.data || []);
                }
            } catch (err) {
                console.error(`Fetch ${activeTab} error:`, err);
                showNotification(`Failed to load ${activeTab} data`, "error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]);

    // Handle delete actions
    const handleDelete = async (id, endpoint, setter, list) => {
        if (!window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) return;
        
        setActionLoading(true);
        try {
            const res = await api.delete(endpoint);
            if (res.data.success) {
                showNotification("Record deleted successfully", "success");
                setter(list.filter(item => item._id !== id));
                // Recalculate stats counts
                setStats(prev => ({
                    ...prev,
                    [activeTab]: Math.max(0, prev[activeTab] - 1)
                }));
            } else {
                showNotification(res.data.message || "Failed to delete record", "error");
            }
        } catch (err) {
            console.error("Delete error:", err);
            showNotification("Delete operation failed", "error");
        } finally {
            setActionLoading(false);
            setSelectedItem(null);
        }
    };

    // Blog input helpers
    const handleBlogChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setBlogForm(prev => ({ ...prev, [name]: checked }));
        } else {
            setBlogForm(prev => {
                const updated = { ...prev, [name]: value };
                // Auto generate slug from title if modifying title
                if (name === 'title') {
                    updated.slug = value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)+/g, '');
                }
                return updated;
            });
        }
    };

    const handleBlogImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBlogForm(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleBlogSubmit = async (e) => {
        e.preventDefault();
        
        if (!blogForm.title || !blogForm.slug || !blogForm.content || !blogForm.author) {
            showNotification("Please fill in all required fields", "error");
            return;
        }

        setActionLoading(true);
        const data = new FormData();
        data.append('title', blogForm.title);
        data.append('slug', blogForm.slug);
        data.append('content', blogForm.content);
        data.append('author', blogForm.author);
        data.append('tags', blogForm.tags);
        data.append('published', blogForm.published);
        if (blogForm.image) {
            data.append('image', blogForm.image);
        }

        try {
            const res = await api.post('/blogs', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                showNotification("Blog created successfully!", "success");
                setBlogForm({
                    title: '',
                    slug: '',
                    content: '',
                    author: '',
                    tags: '',
                    published: true,
                    image: null
                });
                setImagePreview('');
                setActiveTab('blogs');
            } else {
                showNotification(res.data.message || "Failed to create blog", "error");
            }
        } catch (err) {
            console.error("Blog creation failed:", err);
            showNotification(err.response?.data?.error || "Failed to create blog post", "error");
        } finally {
            setActionLoading(false);
        }
    };



    // Filter helpers
    const getFilteredList = () => {
        if (activeTab === 'users') {
            return usersList.filter(u => 
                u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                u.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                u.role?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (activeTab === 'leads') {
            return leadsList.filter(l => 
                l.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                l.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                l.services?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (activeTab === 'applications') {
            return appsList.filter(a => 
                a.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                a.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                a.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (activeTab === 'contacts') {
            return contactsList.filter(c => 
                c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                c.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                c.service?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (activeTab === 'subscribers') {
            return subsList.filter(s => 
                s.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (activeTab === 'blogs') {
            return blogsList.filter(b => 
                b.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                b.author?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                b.slug?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return [];
    };

    const filteredData = getFilteredList();

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
            
            {/* Notification Toast */}
            {notification && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-[150] animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
                    <div className={`rounded-xl border bg-slate-900 border-white/10 shadow-[0_16px_36px_rgba(0,0,0,0.5)] p-3.5 ${
                        notification.type === 'success' ? 'border-emerald-500/30' : 'border-rose-500/30'
                    }`}>
                        <div className="flex items-start gap-3">
                            <div className={`mt-0.5 rounded-full p-1.5 ${
                                notification.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                            }`}>
                                {notification.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                    {notification.type === 'success' ? 'System Notification' : 'Operation Failed'}
                                </p>
                                <p className="text-sm text-slate-200 leading-relaxed font-medium mt-0.5">
                                    {notification.message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar Navigation */}
            <div className="w-full lg:w-80 bg-slate-900 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col shrink-0">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                            <h1 className="font-extrabold text-lg tracking-tight">AI Growth Exa</h1>
                            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Enterprise Admin</p>
                        </div>
                    </div>
                    <Link to="/" className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors" title="Back to site">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </div>

                <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
                    {[
                        { id: 'stats', label: 'Stats Overview', icon: LayoutDashboard },
                        { id: 'leads', label: 'Strategy Leads', count: stats.leads, icon: TrendingUp },
                        { id: 'applications', label: 'Job Applications', count: stats.applications, icon: Briefcase },
                        { id: 'users', label: 'Registered Users', count: stats.users, icon: Users },
                        { id: 'contacts', label: 'General Enquiries', count: stats.contacts, icon: MessageSquare },
                        { id: 'subscribers', label: 'Subscribers', count: stats.subscribers, icon: Mail },
                        { id: 'blogs', label: 'Manage Blogs', count: stats.blogs, icon: FileText }
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                                    activeTab === tab.id 
                                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-md shadow-blue-500/5' 
                                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </div>
                                {tab.count !== undefined && (
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                        activeTab === tab.id ? 'bg-blue-500/20 text-blue-300' : 'bg-slate-800 text-slate-400'
                                    }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}

                    <div className="pt-6 border-t border-white/5 mt-6 space-y-1">
                        <button
                            onClick={() => setActiveTab('create-blog')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
                                activeTab === 'create-blog'
                                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            <PlusCircle className="w-4 h-4" />
                            <span>Add New Blog</span>
                        </button>
                    </div>
                </div>

                <div className="p-4 border-t border-white/10 bg-slate-950/50 flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 border border-white/10 text-white">
                            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-200 truncate">{user?.name || 'Administrator'}</p>
                            <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@aigrowthexa.com'}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                        title="Log Out"
                    >
                        <LogOut className="w-4.5 h-4.5" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
                    <div>
                        <h2 className="text-2xl font-black capitalize tracking-tight">
                            {activeTab === 'create-blog' ? 'Create Blog Post' : `${activeTab} Management`}
                        </h2>
                        <p className="text-xs text-slate-400 mt-1 font-light">
                            {activeTab === 'stats' && "System statistics and platform health metrics."}
                            {activeTab === 'leads' && "View and process customer strategy planner consultations."}
                            {activeTab === 'applications' && "Process incoming applications for job vacancies."}
                            {activeTab === 'users' && "Platform registered member profiles."}
                            {activeTab === 'contacts' && "Customer support general enquiries."}
                            {activeTab === 'subscribers' && "Email newsletter subscriptions list."}
                            {activeTab === 'blogs' && "Manage and edit published articles."}
                            {activeTab === 'create-blog' && "Author a premium professional blog entry."}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link 
                            to="/" 
                            className="px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            Back to Website
                        </Link>
                        {activeTab !== 'stats' && activeTab !== 'create-blog' && (
                            <div className="relative">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder={`Search ${activeTab}...`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9 pr-4 py-2 bg-slate-950 border border-white/10 focus:border-blue-500/50 rounded-lg text-xs outline-none w-48 sm:w-64 text-white font-medium transition-all"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Body Content */}
                <div className="p-6 lg:p-8 flex-1 overflow-y-auto relative">
                    
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/50 z-20">
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                <span className="text-sm text-slate-400">Loading resources...</span>
                            </div>
                        </div>
                    ) : null}

                    {/* STATS VIEW */}
                    {activeTab === 'stats' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[
                                    { title: 'Registered Users', val: stats.users, desc: 'Total accounts registered', icon: Users, tab: 'users', color: 'from-blue-500/20 to-indigo-500/20 text-blue-400' },
                                    { title: 'Growth Planner Leads', val: stats.leads, desc: 'Free consultation inquiries', icon: TrendingUp, tab: 'leads', color: 'from-purple-500/20 to-pink-500/20 text-purple-400' },
                                    { title: 'Job Applicants', val: stats.applications, desc: 'Careers section candidates', icon: Briefcase, tab: 'applications', color: 'from-amber-500/20 to-orange-500/20 text-amber-400' },
                                    { title: 'General Inquiries', val: stats.contacts, desc: 'Contact page messages', icon: MessageSquare, tab: 'contacts', color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400' },
                                    { title: 'Newsletter Subscribers', val: stats.subscribers, desc: 'Active newsletter emails', icon: Mail, tab: 'subscribers', color: 'from-rose-500/20 to-red-500/20 text-rose-400' },
                                    { title: 'Articles Published', val: stats.blogs, desc: 'Insight section posts', icon: FileText, tab: 'blogs', color: 'from-cyan-500/20 to-sky-500/20 text-cyan-400' }
                                ].map((card, i) => {
                                    const Icon = card.icon;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => setActiveTab(card.tab)}
                                            className="bg-slate-900/50 border border-white/10 hover:border-blue-500/30 rounded-2xl p-6 shadow-xl text-left transition-all duration-300 hover:-translate-y-1 flex justify-between items-start group relative overflow-hidden"
                                        >
                                            <div className="space-y-4 relative z-10">
                                                <div className="space-y-1">
                                                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">{card.title}</p>
                                                    <p className="text-4xl font-black text-white">{card.val}</p>
                                                </div>
                                                <p className="text-xs text-slate-400 font-light">{card.desc}</p>
                                            </div>
                                            <div className={`p-4 rounded-xl bg-gradient-to-br ${card.color} border border-white/5`}>
                                                <Icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* System Status Widget */}
                            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                                <div className="absolute top-[-30%] right-[-10%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                                <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                                    <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                                    <h3 className="text-sm font-extrabold uppercase tracking-wider">System Architecture Status</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">Database Engine</p>
                                        <p className="font-bold text-green-400 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                                            MongoDB Connected
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">Server Node API</p>
                                        <p className="font-bold text-green-400 flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                            v1.0.0 Active (Port 5001)
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">Local Cache Sync</p>
                                        <p className="font-bold text-blue-400">Operational</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DYNAMIC LIST TABLES (For Users, Leads, Apps, Contacts, Subscribers, Blogs) */}
                    {activeTab !== 'stats' && activeTab !== 'create-blog' && (
                        <div className="bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                            
                            {filteredData.length === 0 ? (
                                <div className="p-16 text-center text-slate-400 space-y-2">
                                    <p className="text-lg font-bold">No records found</p>
                                    <p className="text-xs font-light text-slate-500">
                                        {searchTerm ? "Try adjusting your search query filter criteria." : `There are currently no records stored for ${activeTab}.`}
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-900 border-b border-white/10 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                                                
                                                {/* Header fields based on tab */}
                                                {activeTab === 'users' && (
                                                    <>
                                                        <th className="p-4 pl-6">Name</th>
                                                        <th className="p-4">Email</th>
                                                        <th className="p-4">Verification</th>
                                                        <th className="p-4">Role</th>
                                                        <th className="p-4 pr-6 text-right">Actions</th>
                                                    </>
                                                )}
                                                {activeTab === 'leads' && (
                                                    <>
                                                        <th className="p-4 pl-6">Company</th>
                                                        <th className="p-4">Services Requested</th>
                                                        <th className="p-4">Budget</th>
                                                        <th className="p-4">Created At</th>
                                                        <th className="p-4 pr-6 text-right">Actions</th>
                                                    </>
                                                )}
                                                {activeTab === 'applications' && (
                                                    <>
                                                        <th className="p-4 pl-6">Applicant</th>
                                                        <th className="p-4">Requested Job</th>
                                                        <th className="p-4">Experience</th>
                                                        <th className="p-4">CV File</th>
                                                        <th className="p-4 pr-6 text-right">Actions</th>
                                                    </>
                                                )}
                                                {activeTab === 'contacts' && (
                                                    <>
                                                        <th className="p-4 pl-6">Name</th>
                                                        <th className="p-4">Email</th>
                                                        <th className="p-4">Service</th>
                                                        <th className="p-4">Snippet</th>
                                                        <th className="p-4 pr-6 text-right">Actions</th>
                                                    </>
                                                )}
                                                {activeTab === 'subscribers' && (
                                                    <>
                                                        <th className="p-4 pl-6">Subscriber Email</th>
                                                        <th className="p-4">Joined Date</th>
                                                        <th className="p-4 pr-6 text-right">Actions</th>
                                                    </>
                                                )}
                                                {activeTab === 'blogs' && (
                                                    <>
                                                        <th className="p-4 pl-6">Title</th>
                                                        <th className="p-4">Author</th>
                                                        <th className="p-4">Status</th>
                                                        <th className="p-4">Tags</th>
                                                        <th className="p-4 pr-6 text-right">Actions</th>
                                                    </>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 text-sm font-medium">
                                            {filteredData.map((item, idx) => (
                                                <tr key={item._id || idx} className="hover:bg-white/5 transition-colors">
                                                    
                                                    {/* USERS ROW */}
                                                    {activeTab === 'users' && (
                                                        <>
                                                            <td className="p-4 pl-6 text-white font-bold">{item.name}</td>
                                                            <td className="p-4 text-slate-300">{item.email}</td>
                                                            <td className="p-4">
                                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                                                    item.isVerified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                                                }`}>
                                                                    {item.isVerified ? 'Verified' : 'Unverified'}
                                                                </span>
                                                            </td>
                                                            <td className="p-4">
                                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs uppercase tracking-wider font-extrabold ${
                                                                    item.role === 'admin' ? 'bg-blue-600/20 text-blue-300' : 'bg-slate-800 text-slate-400'
                                                                }`}>
                                                                    {item.role}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 pr-6 text-right">
                                                                <button 
                                                                    onClick={() => { setSelectedItem(item); setModalType('user'); }}
                                                                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors inline-flex mr-2"
                                                                    title="View Details"
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                </button>
                                                            </td>
                                                        </>
                                                    )}

                                                    {/* LEADS ROW */}
                                                    {activeTab === 'leads' && (
                                                        <>
                                                            <td className="p-4 pl-6">
                                                                <div>
                                                                    <p className="text-white font-bold">{item.name}</p>
                                                                    <p className="text-[11px] text-slate-500 font-light truncate max-w-[150px]">{item.email}</p>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 text-slate-300 truncate max-w-[200px]" title={item.services}>
                                                                {item.services}
                                                            </td>
                                                            <td className="p-4 text-slate-400 font-mono text-xs font-bold">{item.budget || 'N/A'}</td>
                                                            <td className="p-4 text-slate-500 font-light text-xs">
                                                                {new Date(item.createdAt).toLocaleDateString()}
                                                            </td>
                                                            <td className="p-4 pr-6 text-right">
                                                                <div className="inline-flex gap-1.5">
                                                                    <button 
                                                                        onClick={() => { setSelectedItem(item); setModalType('lead'); }}
                                                                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                                                                        title="View Request"
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                    <button 
                                                                        disabled={actionLoading}
                                                                        onClick={() => handleDelete(item._id, `/admin/leads/${item._id}`, setLeadsList, leadsList)}
                                                                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                                                                        title="Delete Lead"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </>
                                                    )}

                                                    {/* APPLICATIONS ROW */}
                                                    {activeTab === 'applications' && (
                                                        <>
                                                            <td className="p-4 pl-6">
                                                                <div>
                                                                    <p className="text-white font-bold">{item.name}</p>
                                                                    <p className="text-[11px] text-slate-500 font-light">{item.email} • {item.phone}</p>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 text-slate-300 font-bold">{item.jobTitle || 'General Application'}</td>
                                                            <td className="p-4 text-slate-400 capitalize text-xs">{item.experience}</td>
                                                            <td className="p-4">
                                                                {item.resume ? (
                                                                    <a 
                                                                        href={item.resume} 
                                                                        target="_blank" 
                                                                        rel="noreferrer" 
                                                                        className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 hover:underline font-bold"
                                                                    >
                                                                        View CV
                                                                        <ExternalLink className="w-3 h-3" />
                                                                    </a>
                                                                ) : (
                                                                    <span className="text-xs text-slate-500 font-light">None</span>
                                                                )}
                                                            </td>
                                                            <td className="p-4 pr-6 text-right">
                                                                <div className="inline-flex gap-1.5">
                                                                    <button 
                                                                        onClick={() => { setSelectedItem(item); setModalType('app'); }}
                                                                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                                                                        title="View Details"
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                    <button 
                                                                        disabled={actionLoading}
                                                                        onClick={() => handleDelete(item._id, `/admin/applications/${item._id}`, setAppsList, appsList)}
                                                                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                                                                        title="Delete Applicant"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </>
                                                    )}

                                                    {/* CONTACTS ROW */}
                                                    {activeTab === 'contacts' && (
                                                        <>
                                                            <td className="p-4 pl-6 text-white font-bold">{item.name}</td>
                                                            <td className="p-4 text-slate-300">{item.email}</td>
                                                            <td className="p-4 text-slate-400 text-xs font-bold">{item.service || 'General'}</td>
                                                            <td className="p-4 text-slate-400 truncate max-w-[200px] font-light text-xs" title={item.message}>
                                                                "{item.message}"
                                                            </td>
                                                            <td className="p-4 pr-6 text-right">
                                                                <div className="inline-flex gap-1.5">
                                                                    <button 
                                                                        onClick={() => { setSelectedItem(item); setModalType('contact'); }}
                                                                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                                                                        title="View message"
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                    <button 
                                                                        disabled={actionLoading}
                                                                        onClick={() => handleDelete(item._id, `/admin/contacts/${item._id}`, setContactsList, contactsList)}
                                                                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                                                                        title="Delete Inquiry"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </>
                                                    )}

                                                    {/* SUBSCRIBERS ROW */}
                                                    {activeTab === 'subscribers' && (
                                                        <>
                                                            <td className="p-4 pl-6 text-white font-mono text-sm">{item.email}</td>
                                                            <td className="p-4 text-slate-400 text-xs">
                                                                {new Date(item.createdAt).toLocaleDateString()}
                                                            </td>
                                                            <td className="p-4 pr-6 text-right">
                                                                <button 
                                                                    disabled={actionLoading}
                                                                    onClick={() => handleDelete(item._id, `/admin/subscribers/${item._id}`, setSubsList, subsList)}
                                                                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                                                                    title="Remove Subscriber"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </td>
                                                        </>
                                                    )}

                                                    {/* BLOGS ROW */}
                                                    {activeTab === 'blogs' && (
                                                        <>
                                                            <td className="p-4 pl-6 text-white font-bold truncate max-w-[250px]">{item.title}</td>
                                                            <td className="p-4 text-slate-300">{item.author}</td>
                                                            <td className="p-4">
                                                                <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                                                                    item.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                                                                }`}>
                                                                    {item.published ? 'Published' : 'Draft'}
                                                                </span>
                                                            </td>
                                                            <td className="p-4 text-slate-400 text-xs truncate max-w-[150px]">{item.tags || 'None'}</td>
                                                            <td className="p-4 pr-6 text-right">
                                                                <div className="inline-flex gap-1.5">
                                                                    <button 
                                                                        onClick={() => { setSelectedItem(item); setModalType('blog'); }}
                                                                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                                                                        title="View Details"
                                                                    >
                                                                        <Eye className="w-4 h-4" />
                                                                    </button>
                                                                    <button 
                                                                        disabled={actionLoading}
                                                                        onClick={() => handleDelete(item._id, `/blogs/${item._id}`, setBlogsList, blogsList)}
                                                                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-500/10 transition-colors"
                                                                        title="Delete Blog Post"
                                                                    >
                                                                        <Trash2 className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </>
                                                    )}

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* BLOG CREATION FORM */}
                    {activeTab === 'create-blog' && (
                        <form onSubmit={handleBlogSubmit} className="max-w-4xl bg-slate-900 border border-white/10 rounded-2xl p-6 lg:p-8 shadow-xl space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Blog Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={blogForm.title}
                                        onChange={handleBlogChange}
                                        placeholder="Deploying Custom AI Agents in Retail CRM"
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 focus:border-blue-500/50 rounded-xl outline-none text-sm font-medium text-white transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">URL Slug (Auto Generated) *</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={blogForm.slug}
                                        onChange={handleBlogChange}
                                        placeholder="deploying-custom-ai-agents-retail-crm"
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 focus:border-blue-500/50 rounded-xl outline-none text-sm font-medium text-white transition-all font-mono"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Author Name *</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={blogForm.author}
                                        onChange={handleBlogChange}
                                        placeholder="Sarah Jenkins"
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 focus:border-blue-500/50 rounded-xl outline-none text-sm font-medium text-white transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Tags (Comma Separated)</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={blogForm.tags}
                                        onChange={handleBlogChange}
                                        placeholder="AI, CRM, Automation, Retail"
                                        className="w-full px-4 py-3 bg-slate-950 border border-white/10 focus:border-blue-500/50 rounded-xl outline-none text-sm font-medium text-white transition-all"
                                    />
                                </div>
                            </div>

                            {/* Image Uploader */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-400 ml-1">Cover Header Image</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                                    <div className="md:col-span-2 border-2 border-dashed border-white/10 hover:border-blue-500/30 rounded-xl p-5 text-center transition-colors">
                                        <FileUp className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                        <label className="block cursor-pointer">
                                            <span className="text-xs text-blue-400 font-bold hover:text-blue-300">
                                                Select custom file
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleBlogImage}
                                                className="hidden"
                                            />
                                            <span className="text-slate-400 text-xs"> or drag and drop</span>
                                        </label>
                                        <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                                    </div>
                                    <div className="h-28 rounded-xl bg-slate-950 border border-white/10 overflow-hidden flex items-center justify-center relative">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Blog preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-xs text-slate-500 font-light">Image Preview</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase text-slate-400 ml-1">Article Content (Markdown Supported) *</label>
                                <textarea
                                    name="content"
                                    value={blogForm.content}
                                    onChange={handleBlogChange}
                                    placeholder="Write your article markdown contents here..."
                                    rows="12"
                                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 focus:border-blue-500/50 rounded-xl outline-none text-sm font-medium text-white transition-all font-mono leading-relaxed"
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-2 ml-1">
                                <input
                                    type="checkbox"
                                    id="published"
                                    name="published"
                                    checked={blogForm.published}
                                    onChange={handleBlogChange}
                                    className="rounded border-white/10 bg-slate-950 text-blue-500 focus:ring-0 focus:ring-offset-0"
                                />
                                <label htmlFor="published" className="text-xs font-bold uppercase text-slate-400 cursor-pointer">
                                    Publish Article Immediately (Visible on Website)
                                </label>
                            </div>

                            <div className="border-t border-white/5 pt-6 flex gap-4">
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 text-sm"
                                >
                                    {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Article Entry"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('blogs')}
                                    className="flex-1 py-3.5 border border-white/10 hover:bg-white/5 text-slate-300 font-bold rounded-xl transition-all text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </div>

            {/* DETAIL MODAL UTILITY */}
            {selectedItem && (
                <div 
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedItem(null)}
                >
                    <div 
                        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-slate-900 border-b border-white/10 p-6 flex justify-between items-center z-10">
                            <div>
                                <h3 className="text-lg font-extrabold uppercase tracking-wider text-white">Record Details</h3>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">{modalType} ID: {selectedItem._id}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            
                            {/* Lead detail */}
                            {modalType === 'lead' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Client Name</p>
                                            <p className="font-bold text-white">{selectedItem.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Email Address</p>
                                            <p className="text-slate-300">{selectedItem.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Budget Tier</p>
                                            <p className="font-mono text-amber-400 font-bold text-xs">{selectedItem.budget || 'Not provided'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Requested Date</p>
                                            <p className="text-slate-400 text-xs">{new Date(selectedItem.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 border-t border-white/5 pt-4 text-sm">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Requested AI Services</p>
                                        <p className="text-slate-200 font-medium leading-relaxed">{selectedItem.services}</p>
                                    </div>
                                    <div className="space-y-1 border-t border-white/5 pt-4 text-sm">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Goals Description</p>
                                        <p className="text-slate-300 font-light leading-relaxed">"{selectedItem.message || 'No additional project goals details specified.'}"</p>
                                    </div>
                                </div>
                            )}

                            {/* App detail */}
                            {modalType === 'app' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Applicant Name</p>
                                            <p className="font-bold text-white">{selectedItem.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Email / Phone</p>
                                            <p className="text-slate-300">{selectedItem.email} • {selectedItem.phone}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Applied Job Title</p>
                                            <p className="font-bold text-white">{selectedItem.jobTitle || 'General Application'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Experience Grade</p>
                                            <p className="text-slate-400 capitalize">{selectedItem.experience}</p>
                                        </div>
                                    </div>
                                    {selectedItem.resume && (
                                        <div className="space-y-1 border-t border-white/5 pt-4">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Attached Resume File</p>
                                            <a 
                                                href={selectedItem.resume} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 hover:underline font-bold"
                                            >
                                                Open Document in New Tab
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    )}
                                    <div className="space-y-1 border-t border-white/5 pt-4 text-sm">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Cover Letter Letter Statement</p>
                                        <p className="text-slate-300 font-light leading-relaxed whitespace-pre-wrap">"{selectedItem.coverLetter || 'No cover letter provided.'}"</p>
                                    </div>
                                </div>
                            )}

                            {/* Contact detail */}
                            {modalType === 'contact' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Contact Name</p>
                                            <p className="font-bold text-white">{selectedItem.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Email Address</p>
                                            <p className="text-slate-300">{selectedItem.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Selected Service Area</p>
                                            <p className="font-bold text-white">{selectedItem.service || 'General Inquiries'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Received Date</p>
                                            <p className="text-slate-400 text-xs">{new Date(selectedItem.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 border-t border-white/5 pt-4 text-sm">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Message Content</p>
                                        <p className="text-slate-300 font-light leading-relaxed whitespace-pre-wrap">"{selectedItem.message}"</p>
                                    </div>
                                </div>
                            )}

                            {/* User detail */}
                            {modalType === 'user' && (
                                <div className="space-y-4 text-sm">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">User Full Name</p>
                                            <p className="font-bold text-white">{selectedItem.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">User Email Address</p>
                                            <p className="text-slate-300">{selectedItem.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Access Permissions Role</p>
                                            <p className="font-bold text-white uppercase text-xs tracking-wider">{selectedItem.role}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Verified Account Status</p>
                                            <p className="text-slate-300 font-bold">{selectedItem.isVerified ? 'Verified' : 'Unverified'}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 border-t border-white/5 pt-4">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Account Registration Date</p>
                                        <p className="text-slate-400 text-xs">{new Date(selectedItem.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            )}

                            {/* Blog detail */}
                            {modalType === 'blog' && (
                                <div className="space-y-4 text-sm">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Article Title</p>
                                            <p className="font-bold text-white">{selectedItem.title}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Author Writer</p>
                                            <p className="text-slate-300 font-bold">{selectedItem.author}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">URL Permalink</p>
                                            <p className="font-mono text-slate-400 text-xs">{selectedItem.slug}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Published Date</p>
                                            <p className="text-slate-400 text-xs">{new Date(selectedItem.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    {selectedItem.image && (
                                        <div className="space-y-1 border-t border-white/5 pt-4">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Header Cover Graphic</p>
                                            <div className="h-44 w-full rounded-xl bg-slate-950 overflow-hidden border border-white/10">
                                                <img src={selectedItem.image} alt="Blog header" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    )}
                                    <div className="space-y-1 border-t border-white/5 pt-4">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Article Tags Category</p>
                                        <p className="text-slate-300">{selectedItem.tags || 'No tags listed'}</p>
                                    </div>
                                    <div className="space-y-1 border-t border-white/5 pt-4">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Complete Content Draft</p>
                                        <p className="text-slate-300 font-light leading-relaxed whitespace-pre-wrap bg-slate-950 p-4 border border-white/5 rounded-xl font-mono text-xs max-h-48 overflow-y-auto">
                                            {selectedItem.content}
                                        </p>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div className="border-t border-white/10 p-6 flex justify-end gap-3 bg-slate-900/50">
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 transition-all text-xs font-bold rounded-lg border border-white/5"
                            >
                                Close Details View
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminPanel;
