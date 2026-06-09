import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    User, Mail, Shield, Calendar, Briefcase, FileText, 
    Compass, MessageSquare, ExternalLink, Sparkles, TrendingUp,
    ShieldAlert, Loader2, ArrowRight, CheckCircle2, ChevronRight
} from 'lucide-react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';


const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [activity, setActivity] = useState({ leads: [], applications: [], contacts: [] });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch user activity submissions
                const activityRes = await api.get('/auth/my-activity');
                setActivity(activityRes.data.data);
            } catch (err) {
                console.error("Dashboard activity load failed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    <span className="text-sm text-slate-400">Loading your profile...</span>
                </div>
            </div>
        );
    }

    // AI strategy personalized checklist based on user submissions or generic growth items
    const recommendations = [
        {
            title: "Implement LLM-Powered Ad Copy Testing",
            impact: "High Impact",
            time: "2-3 days",
            description: "Deploy automated variant testing using LLMs to lower customer acquisition costs by up to 35%."
        },
        {
            title: "Connect CRM to Predictive Pipeline Analytics",
            impact: "Medium Impact",
            time: "1 week",
            description: "Map existing customer touchpoints to the predictive analysis engine for automated forecasting."
        },
        {
            title: "Scale Content Assets via Multi-Modal Agents",
            impact: "High Impact",
            time: "4 days",
            description: "Configure self-improving content generation agents targeting your specific core SEO keywords."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Left Sidebar: User Profile details */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                        {/* Backdrop glow */}
                        <div className="absolute top-[-20%] right-[-20%] w-36 h-36 bg-blue-500/10 rounded-full blur-2xl"></div>
                        
                        <div className="flex flex-col items-center text-center relative z-10">
                            <div className="w-20 h-20 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-full flex items-center justify-center mb-4 text-3xl font-bold">
                                {user?.name ? user.name.charAt(0).toUpperCase() : <User size={36} />}
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-white mb-1">{user?.name}</h2>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
                                <Shield size={12} />
                                {user?.role || 'user'}
                            </span>
                            
                            <div className="w-full space-y-4 text-left border-t border-white/5 pt-6 text-sm text-slate-400">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-slate-500" />
                                    <span className="truncate">{user?.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-slate-500" />
                                    <span>Account Status: {user?.isVerified ? 'Verified' : 'Unverified'}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleLogout}
                                className="w-full mt-8 py-3 bg-red-600/10 border border-red-500/20 hover:bg-red-600/20 text-red-400 font-bold rounded-xl transition-all text-sm"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>

                    {/* Quick navigation sidebar links */}
                    <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl hidden lg:block">
                        <div className="flex flex-col">
                            {[
                                { id: 'overview', label: 'Overview', icon: Compass },
                                { id: 'growth-plans', label: 'My Growth Plans', count: activity.leads.length, icon: TrendingUp },
                                { id: 'applications', label: 'My Applications', count: activity.applications.length, icon: Briefcase },
                                { id: 'queries', label: 'My Enquiries', count: activity.contacts.length, icon: MessageSquare }
                            ].map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center justify-between px-6 py-4 transition-all text-left text-sm font-semibold border-b border-white/5 last:border-0 ${
                                            activeTab === tab.id 
                                                ? 'bg-blue-600/20 text-blue-400 border-r-2 border-r-blue-500' 
                                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className="w-4 h-4" />
                                            <span>{tab.label}</span>
                                        </div>
                                        {tab.count !== undefined && (
                                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                                                {tab.count}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Side: Main dashboard content area */}
                <div className="lg:col-span-3 space-y-6">
                    
                    {/* Header Greeting */}
                    <div className="bg-gradient-to-r from-blue-900/40 to-slate-900 border border-white/10 rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2 relative z-10">
                            <h1 className="text-3xl font-black tracking-tight text-white">
                                Welcome Back, {user?.name?.split(' ')[0]}!
                            </h1>
                            <p className="text-slate-400 text-sm max-w-xl font-light">
                                Monitor your growth strategy sessions, application status, and view custom recommended AI steps for your industry.
                            </p>
                        </div>
                        {user?.role === 'admin' && (
                            <button
                                onClick={() => navigate('/admin')}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-[0_10px_20px_rgba(59,130,246,0.3)] transition-all flex items-center gap-2 relative z-10 shrink-0"
                            >
                                Admin Control Panel
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Dashboard Mobile tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
                        {[
                            { id: 'overview', label: 'Overview' },
                            { id: 'growth-plans', label: 'Growth Plans' },
                            { id: 'applications', label: 'Applications' },
                            { id: 'queries', label: 'Enquiries' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 text-xs font-bold uppercase rounded-lg border whitespace-nowrap ${
                                    activeTab === tab.id 
                                        ? 'bg-blue-600 border-blue-500 text-white' 
                                        : 'border-white/10 bg-slate-900 text-slate-400 hover:text-white'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Active tab content */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            
                            {/* Summary Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[
                                    { title: 'Growth Sessions', val: activity.leads.length, label: 'Strategy calls requested', icon: TrendingUp },
                                    { title: 'Submitted Roles', val: activity.applications.length, label: 'Career applications open', icon: Briefcase },
                                    { title: 'Sent Inquiries', val: activity.contacts.length, label: 'General contacts pending', icon: MessageSquare }
                                ].map((stat, i) => {
                                    const Icon = stat.icon;
                                    return (
                                        <div key={i} className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl flex items-center gap-5">
                                            <div className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">{stat.title}</p>
                                                <p className="text-3xl font-black text-white">{stat.val}</p>
                                                <p className="text-[11px] text-slate-500 font-light">{stat.label}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Personalized AI Recommendations */}
                            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                                <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                                    <Sparkles className="w-5 h-5 text-blue-400" />
                                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                                        Personalized AI Growth Checklist
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {recommendations.map((rec, i) => (
                                        <div key={i} className="border border-white/10 rounded-xl p-5 hover:border-blue-500/30 hover:bg-blue-600/5 transition-all flex flex-col md:flex-row gap-5 items-start">
                                            <div className="mt-1 flex items-center justify-center shrink-0">
                                                <div className="w-6 h-6 rounded-full border border-blue-500 text-blue-400 flex items-center justify-center text-xs font-bold">
                                                    {i + 1}
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex flex-wrap items-center justify-between gap-2">
                                                    <h4 className="text-base font-bold text-white">{rec.title}</h4>
                                                    <div className="flex gap-2">
                                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
                                                            {rec.impact}
                                                        </span>
                                                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                                            {rec.time}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-slate-400 text-sm font-light leading-relaxed">{rec.description}</p>
                                            </div>
                                            <button className="text-xs text-blue-400 font-bold hover:text-blue-300 flex items-center gap-1 mt-2 md:mt-0 shrink-0 select-none">
                                                Activate
                                                <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'growth-plans' && (
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                            <h3 className="text-xl font-bold border-b border-white/5 pb-4 uppercase tracking-wider text-white">
                                Strategy Call Sessions
                            </h3>

                            {activity.leads.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 space-y-2">
                                    <p className="text-lg font-bold">No sessions requested yet</p>
                                    <p className="text-sm font-light">Book a free strategy session via the growth planner on the homepage!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {activity.leads.map((lead, i) => (
                                        <div key={i} className="border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition-all grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Service Requested</p>
                                                <p className="text-sm font-bold text-white">{lead.services}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Budget Range</p>
                                                <p className="text-sm text-slate-300 font-medium">{lead.budget || 'Not specified'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">Session Status</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                                                    <span className="text-sm text-slate-300 font-medium">Pending Review</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'applications' && (
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                            <h3 className="text-xl font-bold border-b border-white/5 pb-4 uppercase tracking-wider text-white">
                                Career Job Applications
                            </h3>

                            {activity.applications.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 space-y-2">
                                    <p className="text-lg font-bold">No applications submitted yet</p>
                                    <p className="text-sm font-light">Check out open roles in our Careers section to apply!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {activity.applications.map((app, i) => (
                                        <div key={i} className="border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition-all flex justify-between items-center">
                                            <div className="space-y-1">
                                                <h4 className="text-base font-bold text-white">{app.name}</h4>
                                                <p className="text-xs text-slate-400 font-light">Experience Level: {app.experience.toUpperCase()}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                                                    Reviewing
                                                </span>
                                                <a 
                                                    href={app.resume} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="text-slate-400 hover:text-white p-1"
                                                    title="View CV"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'queries' && (
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                            <h3 className="text-xl font-bold border-b border-white/5 pb-4 uppercase tracking-wider text-white">
                                General Inquiries
                            </h3>

                            {activity.contacts.length === 0 ? (
                                <div className="text-center py-12 text-slate-400 space-y-2">
                                    <p className="text-lg font-bold">No inquiries sent yet</p>
                                    <p className="text-sm font-light">Have a query? Message us through our Contact page!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {activity.contacts.map((contact, i) => (
                                        <div key={i} className="border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition-all space-y-2">
                                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                                <h4 className="text-sm font-bold text-white">{contact.service}</h4>
                                                <span className="text-[10px] text-slate-500 font-light">
                                                    {new Date(contact.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <p className="text-slate-400 text-sm font-light leading-relaxed">"{contact.message}"</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
