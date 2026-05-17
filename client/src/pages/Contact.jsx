import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Upload, Send, ChevronUp } from 'lucide-react';
import api from '../api/api';
import { useNotification } from '../context/NotificationContext';

const Contact = () => {
    const location = useLocation();
    const { showNotification } = useNotification();
    const searchParams = new URLSearchParams(location.search);
    const isGrowthPlan = searchParams.get('type') === 'growth-plan';

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        phone: '',
        country: 'India',
        jobTitle: '',
        message: '',
        industry: '',
        inquiryType: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/contact', formData);
            setSuccess(true);
        } catch (error) {
            console.error('Error submitting contact:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-[#F0F2F8] pt-32 pb-20 flex items-center justify-center">
                <div className="bg-white p-12 rounded-2xl shadow-sm text-center max-w-lg animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">Request Sent!</h2>
                    <p className="text-slate-500 text-base mb-8 leading-relaxed font-medium">
                        Our team will reach out to you within 24 hours to discuss your intelligence needs.
                    </p>
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A365D] text-white font-semibold rounded-lg hover:bg-[#0f2442] transition-all text-sm">
                        Return Home
                        <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-0">
            {/* Breadcrumbs - Only show if not growth plan */}
            {!isGrowthPlan && (
                <div className="container mx-auto px-6 max-w-7xl mb-10">
                    <nav className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                        <Link to="/" className="hover:text-[#1A365D] transition-colors">Home</Link>
                        <ChevronRight size={10} />
                        <Link to="/contact" className="hover:text-[#1A365D] transition-colors">Contact Us</Link>
                        <ChevronRight size={10} />
                        <span className="text-slate-900">Request for Services</span>
                    </nav>
                </div>
            )}

            {/* Form Section */}
            <div className="container mx-auto px-6 max-w-7xl pb-16">
                
                {isGrowthPlan ? (
                    <div className="mb-12 mt-6 max-w-6xl">
                        <div className="inline-block bg-[#E8EDF2] text-[#1A365D] text-[10px] font-bold px-4 py-2 rounded-full mb-8 tracking-[0.15em] uppercase">
                            PERSONALIZED GROWTH PLAN
                        </div>
                        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-20">
                            <div className="lg:w-1/2">
                                <h1 className="text-4xl md:text-[3.5rem] font-bold text-[#0B1220] tracking-tight leading-[1.1]">Every brand is different.</h1>
                                <h2 className="text-4xl md:text-[3.5rem] font-bold text-[#1A365D] tracking-tight leading-[1.1] mt-2">Your growth plan should be too.</h2>
                            </div>
                            <div className="lg:w-1/2 lg:pl-12 lg:border-l-[3px] lg:border-[#E8EDF2] flex items-center">
                                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                                    Share your goals and challenges with us. We'll create a personalized AI-powered marketing plan tailored to your brand's unique needs and objectives.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <header className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Contact Us</h1>
                        <p className="text-base md:text-lg text-slate-600 max-w-3xl font-medium leading-relaxed">
                            To request more information about our products and services, please complete the form below.
                        </p>
                    </header>
                )}

                <div className={`grid grid-cols-1 ${!isGrowthPlan ? 'lg:grid-cols-12 gap-10 lg:gap-20 items-start' : ''}`}>
                    {/* Main Form Area */}
                    <div className={`${!isGrowthPlan ? 'lg:col-span-8 bg-white rounded-xl shadow-sm p-6 md:p-10 relative overflow-hidden ring-1 ring-slate-100' : 'max-w-6xl'}`}>
                        <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                            
                            {isGrowthPlan ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <FormInput label="Name*" name="name" value={formData.name} onChange={handleChange} required className="bg-[#F3F4F6] border-none rounded-xl text-sm" />
                                    <FormInput label="Email*" name="email" type="email" value={formData.email} onChange={handleChange} required className="bg-[#F3F4F6] border-none rounded-xl text-sm" />
                                    <FormInput label="Organization*" name="organization" value={formData.organization} onChange={handleChange} required className="bg-[#F3F4F6] border-none rounded-xl text-sm" />
                                    <FormInput label="Contact Number*" name="phone" value={formData.phone} onChange={handleChange} required className="bg-[#F3F4F6] border-none rounded-xl text-sm" />
                                    <FormSelect
                                        label="Industry*"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        required
                                        className="bg-[#F3F4F6] border-none rounded-xl text-sm"
                                        options={['Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 'Other']}
                                    />
                                    <FormSelect
                                        label="Inquiry Type*"
                                        name="inquiryType"
                                        value={formData.inquiryType}
                                        onChange={handleChange}
                                        required
                                        className="bg-[#F3F4F6] border-none rounded-xl text-sm"
                                        options={['AI Marketing Strategy', 'Data & Analytics', 'Brand Transformation', 'Cloud & Infrastructure', 'General Inquiry']}
                                    />
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <FormInput label="Full Name *" name="name" value={formData.name} onChange={handleChange} required />
                                    <FormInput label="Business Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                    <FormInput label="Organization/ Institution" name="organization" value={formData.organization} onChange={handleChange} />
                                    <FormInput label="Phone/ Mobile" name="phone" value={formData.phone} onChange={handleChange} />
                                    <FormSelect
                                        label="Country*"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        options={['India', 'United States', 'United Kingdom', 'Germany', 'Japan', 'Singapore', 'Australia']}
                                    />
                                    <FormSelect
                                        label="Job Title*"
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        options={['CEO', 'CTO', 'Director', 'Manager', 'Other']}
                                    />
                                </div>
                            )}

                            <div className="relative">
                                <label className={`absolute left-4 top-2 text-[12px] font-bold ${isGrowthPlan ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {isGrowthPlan ? 'Message' : 'How can we help you? *'}
                                </label>
                                <textarea
                                    name="message"
                                    required={!isGrowthPlan}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className={`w-full pt-6 pb-2 px-4 border focus:outline-none transition-all text-slate-900 font-medium text-base min-h-[140px] ${isGrowthPlan ? 'bg-[#F3F4F6] border-none rounded-xl focus:ring-2 focus:ring-[#1A365D]/20 text-sm' : 'bg-white border-slate-200 rounded-xl focus:border-primary'}`}
                                ></textarea>
                                {!isGrowthPlan && <span className="absolute bottom-2 right-5 text-[10px] text-slate-300 font-bold">Max characters: 10,000</span>}
                            </div>

                            {!isGrowthPlan && (
                                <div className="group relative">
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                                    <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 flex items-center gap-5 transition-all duration-300">
                                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                                            <Upload size={16} className="text-slate-400" />
                                        </div>
                                        <span className="text-base font-medium text-slate-600">Browse to upload your file (Optional)</span>
                                    </div>
                                </div>
                            )}

                            {isGrowthPlan ? (
                                <div className="flex items-start gap-4 py-4">
                                    <input
                                        type="checkbox"
                                        required
                                        className="mt-1 w-5 h-5 rounded border-slate-300 text-[#1A365D] focus:ring-[#1A365D]"
                                    />
                                    <p className="text-[12px] text-[#1A365D] font-medium leading-relaxed max-w-4xl">
                                        I would like Ai Growth Exa to contact me based on the information provided above. I agree to the processing of my personal data as described in the <Link to="/privacy-policy" className="text-[#3b82f6] hover:underline">Privacy Notice</Link>.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex items-start gap-4 py-1">
                                    <input
                                        type="checkbox"
                                        required
                                        className="mt-1 w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20"
                                    />
                                    <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                                        I have read AI Growth Exa's <Link to="/privacy-policy" className="text-primary font-bold hover:underline">Privacy Statement</Link> and agree to the <Link to="/terms-and-conditions" className="text-primary font-bold hover:underline">terms of use</Link>.*
                                    </p>
                                </div>
                            )}

                            <div className={isGrowthPlan ? 'flex justify-between items-center mt-6 border-t border-gray-100 pt-8' : 'mt-6'}>
                                {isGrowthPlan ? (
                                    <>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="inline-flex items-center gap-2 py-3 px-8 bg-[#1A365D] hover:bg-[#0f2442] text-white font-bold text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#1A365D]/20 disabled:opacity-50"
                                        >
                                            {loading ? "Submitting..." : "Submit"}
                                            {!loading && <ChevronRight size={16} />}
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                            className="hidden md:inline-flex items-center gap-3 py-2 px-6 bg-white border border-[#1A365D] text-[#1A365D] font-bold text-[10px] tracking-[0.15em] rounded-full hover:bg-[#1A365D] hover:text-white transition-all group"
                                        >
                                            BACK TO TOP
                                            <div className="w-5 h-5 bg-[#1A365D] group-hover:bg-white text-white group-hover:text-[#1A365D] rounded-full flex items-center justify-center transition-colors">
                                                <ChevronUp size={12} />
                                            </div>
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3.5 bg-[#E8EBFD] hover:bg-slate-200 text-slate-900 font-bold text-base rounded-xl transition-all duration-300 shadow-sm disabled:opacity-50"
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                )}
                            </div>

                            {!isGrowthPlan && (
                                <p className="text-[12px] text-slate-500 italic mt-4">
                                    We will treat any information you submit with us as confidential.
                                </p>
                            )}
                        </form>
                    </div>

                    {/* Sidebar Area - Only show for normal contact */}
                    {!isGrowthPlan && (
                        <div className="lg:col-span-4 space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-base font-bold text-slate-900">International Headquarters</h3>
                                <div className="space-y-4">
                                    <p className="text-[13px] text-slate-600 font-medium leading-loose">
                                        AI Growth Exa Ltd. | Technology Excellence Hub<br />
                                        Plot No. 3A, Sector 126 | Noida - 201304, India
                                    </p>
                                    <Link to="/about" className="inline-flex items-center gap-1 text-[13px] font-bold text-primary hover:underline group">
                                        Search our global locations
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-200">
                                <ul className="space-y-0 text-slate-700">
                                    {[
                                        { label: 'Analyst inquiries', href: 'mailto:contact@aigrowthexa.com?subject=Analyst%20Inquiry' },
                                        { label: 'Investor inquiries', href: 'mailto:contact@aigrowthexa.com?subject=Investor%20Inquiry' },
                                        { label: 'Partner and alliance inquiries', href: 'mailto:contact@aigrowthexa.com?subject=Partner%20Inquiry' },
                                        { label: 'Report a security incident', href: 'mailto:contact@aigrowthexa.com?subject=Security%20Incident' },
                                        { label: 'Job and career seekers', href: '/careers' },
                                        { label: 'Press and media inquiries', href: 'mailto:contact@aigrowthexa.com?subject=Media%20Inquiry' },
                                        { label: 'Procurement inquiries', href: 'mailto:contact@aigrowthexa.com?subject=Procurement%20Inquiry' },
                                        { label: 'Vendor helpdesk', href: 'mailto:contact@aigrowthexa.com?subject=Vendor%20Helpdesk' },
                                        { label: 'Raise a Grievance', href: 'mailto:contact@aigrowthexa.com?subject=Grievance' }
                                    ].map((item) => (
                                        <li key={item.label} className="border-b border-slate-100 last:border-0">
                                            {item.href.startsWith('/') ? (
                                                <Link to={item.href} className="block w-full text-left py-4 text-[13px] font-medium hover:text-primary hover:translate-x-1 transition-all">
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <a href={item.href} className="block w-full text-left py-4 text-[13px] font-medium hover:text-primary hover:translate-x-1 transition-all">
                                                    {item.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Normal Contact Footers */}
            {!isGrowthPlan && (
                <>
                    <div className="bg-[#F8F9FA] py-14 border-y border-slate-100">
                        <div className="container mx-auto px-6 max-w-7xl">
                            <header className="mb-10 text-center">
                                <div className="flex gap-1 mb-6 text-slate-200 justify-center">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="w-1 h-3.5 bg-current rounded-full" />
                                    ))}
                                </div>
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">I’m Looking For</h2>
                                <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                                    Please select your area of interest below. An AI Growth Exa representative will contact you shortly after receiving your request.
                                </p>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                                {[
                                    { name: 'Request for Services', href: '/contact' },
                                    { name: 'Technology and Market Analyst Queries', href: 'mailto:contact@aigrowthexa.com?subject=Technology%20and%20Market%20Analyst%20Query' },
                                    { name: 'Finacle-related Queries', href: 'mailto:contact@aigrowthexa.com?subject=Finacle-related%20Query' },
                                    { name: 'BPM-related Queries', href: 'mailto:contact@aigrowthexa.com?subject=BPM-related%20Query' },
                                    { name: 'Financial Analysts and Investor Queries', href: 'mailto:contact@aigrowthexa.com?subject=Financial%20Analyst%20and%20Investor%20Query' },
                                    { name: 'Media Queries', href: 'mailto:contact@aigrowthexa.com?subject=Media%20Query' },
                                    { name: 'Career-related Queries', href: '/careers' },
                                    { name: 'Website Feedback', href: 'mailto:contact@aigrowthexa.com?subject=Website%20Feedback' },
                                    { name: 'Supplier Payment Related Queries', href: 'mailto:contact@aigrowthexa.com?subject=Supplier%20Payment%20Query' }
                                ].map((item, idx) => (
                                    item.href.startsWith('/') ? (
                                        <Link key={idx} to={item.href} className="bg-white p-6 border border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group cursor-pointer hover:shadow-xl transition-all duration-500 relative flex flex-col justify-between min-h-[110px] rounded-sm">
                                            <h3 className="text-lg font-bold text-slate-800 pr-5 leading-snug group-hover:text-black transition-colors">{item.name}</h3>
                                            <div className="w-10 h-1 bg-[#FF9900] group-hover:w-full transition-all duration-500 rounded-full"></div>
                                        </Link>
                                    ) : (
                                        <a key={idx} href={item.href} className="bg-white p-6 border border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group cursor-pointer hover:shadow-xl transition-all duration-500 relative flex flex-col justify-between min-h-[110px] rounded-sm">
                                            <h3 className="text-lg font-bold text-slate-800 pr-5 leading-snug group-hover:text-black transition-colors">{item.name}</h3>
                                            <div className="w-10 h-1 bg-[#FF9900] group-hover:w-full transition-all duration-500 rounded-full"></div>
                                        </a>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-950 py-14 text-white border-t border-slate-900">
                        <div className="container mx-auto px-6 max-w-7xl">
                            <header className="mb-12">
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">More ways to get in touch</h2>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                                <div className="space-y-8">
                                    <div className="w-10 h-1 bg-[#FF9900] rounded-full"></div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-bold">Call us</h3>
                                        <div className="space-y-2">
                                            <p className="text-base text-slate-300 font-medium">US and Canada: <span className="text-white">1 (877) 889-9009</span></p>
                                            <p className="text-base text-slate-300 font-medium">International: <span className="text-white">1 (216) 672-0266</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="w-10 h-1 bg-[#FF9900] rounded-full"></div>
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-bold">Visit us</h3>
                                        <p className="text-base text-slate-300 font-medium leading-relaxed">
                                            We serve clients around the globe, with<br className="hidden md:block" />
                                            700+ office locations in over 150<br className="hidden md:block" />
                                            countries.
                                        </p>
                                        <Link to="/about" className="inline-flex items-center gap-3 group text-sm font-bold uppercase tracking-widest hover:text-[#FF9900] transition-colors">
                                            Find office locations
                                            <div className="w-8 h-8 bg-[#FF9900] text-white flex items-center justify-center rounded-sm group-hover:bg-[#FF9900]/80 transition-colors">
                                                <ChevronRight size={16} />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const FormInput = ({ label, name, type = 'text', className = '', ...props }) => (
    <div className="relative">
        <label className={`absolute left-4 top-2 text-[12px] font-bold z-10 pointer-events-none ${className.includes('bg-[#F3F4F6]') ? 'text-slate-500' : 'text-slate-400'}`}>{label}</label>
        <input
            type={type}
            name={name}
            {...props}
            className={`w-full pt-6 pb-2 px-4 focus:outline-none transition-all font-medium ${className ? className + ' focus:ring-2 focus:ring-[#1A365D]/20 text-[#0B1220]' : 'bg-white border border-slate-200 rounded-xl focus:border-primary text-slate-900 text-base'}`}
        />
    </div>
);

const FormSelect = ({ label, name, options, className = '', ...props }) => (
    <div className="relative">
        <label className={`absolute left-4 top-2 text-[12px] font-bold z-10 pointer-events-none ${className.includes('bg-[#F3F4F6]') ? 'text-slate-500' : 'text-slate-400'}`}>{label}</label>
        <select
            name={name}
            {...props}
            className={`w-full pt-6 pb-2 px-4 focus:outline-none transition-all font-medium appearance-none cursor-pointer relative z-0 ${className ? className + ' focus:ring-2 focus:ring-[#1A365D]/20 text-[#0B1220]' : 'bg-white border border-slate-200 rounded-xl focus:border-primary text-slate-900 text-base'}`}
        >
            <option value="">Select an option</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className={`absolute right-4 bottom-3 pointer-events-none ${className.includes('bg-[#F3F4F6]') ? 'text-slate-500' : 'text-slate-400'}`}>
            <ChevronRight size={16} className="rotate-90" />
        </div>
    </div>
);

export default Contact;
