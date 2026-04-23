import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Upload, X, Loader2, Send } from 'lucide-react';
import api from '../api/api';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        phone: '',
        country: 'India',
        jobTitle: '',
        message: ''
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
            alert('Failed to send message. Please try again.');
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
                    <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all text-sm">
                        Return Home
                        <ChevronRight size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-0">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-6 max-w-7xl mb-10">
                <nav className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={10} />
                    <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
                    <ChevronRight size={10} />
                    <span className="text-slate-900">Request for Services</span>
                </nav>
            </div>

            {/* Contact Us Form Section */}
            <div className="container mx-auto px-6 max-w-7xl pb-8">
                <header className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Contact Us</h1>
                    <p className="text-base md:text-lg text-slate-600 max-w-3xl font-medium leading-relaxed">
                        To request more information about our products and services, please complete the form below.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
                    {/* Main Form Area */}
                    <div className="lg:col-span-8 bg-white rounded-xl shadow-sm p-6 md:p-10 relative overflow-hidden ring-1 ring-slate-100">
                        <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
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

                            <div className="relative">
                                <label className="absolute left-4 top-1.5 text-[12px] font-bold text-slate-400">How can we help you? *</label>
                                <textarea
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full pt-5 pb-1 px-5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary transition-all text-slate-900 font-medium text-base min-h-[100px]"
                                ></textarea>
                                <span className="absolute bottom-2 right-5 text-[10px] text-slate-300 font-bold">Max characters: 10,000</span>
                            </div>

                            {/* File Upload Component */}
                            <div className="group relative">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                                <div className="p-3 border border-slate-100 rounded-xl bg-slate-50/50 flex items-center gap-5 transition-all duration-300">
                                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                                        <Upload size={16} className="text-slate-400" />
                                    </div>
                                    <span className="text-base font-medium text-slate-600">Browse to upload your file (Optional)</span>
                                </div>
                            </div>

                            {/* Privacy Agreement */}
                            <div className="flex items-start gap-4 py-1">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 w-5 h-5 rounded border-slate-300 bg-slate-50 text-secondary focus:ring-secondary/20"
                                />
                                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                                    I have read AI Growth Exa's <Link to="/privacy-policy" className="text-primary font-bold hover:underline">Privacy Statement</Link> and agree to the <Link to="/terms-and-conditions" className="text-primary font-bold hover:underline">terms of use</Link>.*
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-[#E8EBFD] hover:bg-slate-200 text-slate-900 font-bold text-base rounded-xl transition-all duration-300 shadow-sm disabled:opacity-50"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>

                            <p className="text-[12px] text-slate-500 italic mt-4">
                                We will treat any information you submit with us as confidential.
                            </p>
                        </form>
                    </div>

                    {/* Sidebar Area */}
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
                                    'Analyst inquiries',
                                    'Investor inquiries',
                                    'Partner and alliance inquiries',
                                    'Report a security incident',
                                    'Job and career seekers',
                                    'Press and media inquiries',
                                    'Procurement inquiries',
                                    'Vendor helpdesk',
                                    'Raise a Grievance'
                                ].map((item) => (
                                    <li key={item} className="border-b border-slate-100 last:border-0">
                                        <button className="w-full text-left py-4 text-[13px] font-medium hover:text-primary hover:translate-x-1 transition-all">
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* "I'm Looking For" Section (Infosys Style) - Moved Below Form */}
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
                            { name: 'Request for Services' },
                            { name: 'Technology and Market Analyst Queries' },
                            { name: 'Finacle-related Queries' },
                            { name: 'BPM-related Queries' },
                            { name: 'Financial Analysts and Investor Queries' },
                            { name: 'Media Queries' },
                            { name: 'Career-related Queries' },
                            { name: 'Website Feedback' },
                            { name: 'Supplier Payment Related Queries' }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-6 border border-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] group cursor-pointer hover:shadow-xl transition-all duration-500 relative flex flex-col justify-between min-h-[110px] rounded-sm">
                                <h3 className="text-lg font-bold text-slate-800 pr-5 leading-snug group-hover:text-black transition-colors">{item.name}</h3>
                                <div className="w-10 h-1 bg-[#FF9900] group-hover:w-full transition-all duration-500 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* More ways to get in touch - Dark Section */}
            <div className="bg-slate-950 py-14 text-white border-t border-slate-900">
                <div className="container mx-auto px-6 max-w-7xl">
                    <header className="mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">More ways to get in touch</h2>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                        {/* Call us Column */}
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

                        {/* Visit us Column */}
                        <div className="space-y-8">
                            <div className="w-10 h-1 bg-[#FF9900] rounded-full"></div>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold">Visit us</h3>
                                <p className="text-base text-slate-300 font-medium leading-relaxed">
                                    We serve clients around the globe, with<br className="hidden md:block" />
                                    700+ office locations in over 150<br className="hidden md:block" />
                                    countries.
                                </p>
                                <button className="inline-flex items-center gap-3 group text-sm font-bold uppercase tracking-widest hover:text-[#FF9900] transition-colors">
                                    Find office locations
                                    <div className="w-8 h-8 bg-[#FF9900] text-white flex items-center justify-center rounded-sm group-hover:bg-[#FF9900]/80 transition-colors">
                                        <ChevronRight size={16} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Reusable Components
const FormInput = ({ label, name, type = 'text', ...props }) => (
    <div className="relative">
        <label className="absolute left-4 top-1.5 text-[12px] font-bold text-slate-400">{label}</label>
        <input
            type={type}
            name={name}
            {...props}
            className="w-full pt-5 pb-1 px-5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary transition-all text-slate-900 font-medium text-base"
        />
    </div>
);

const FormSelect = ({ label, name, options, ...props }) => (
    <div className="relative">
        <label className="absolute left-4 top-1.5 text-[12px] font-bold text-slate-400">{label}</label>
        <select
            name={name}
            {...props}
            className="w-full pt-5 pb-1 px-5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-primary transition-all text-slate-900 font-medium text-base appearance-none cursor-pointer"
        >
            <option value="">{label.replace('*', '')}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-5 bottom-2.5 pointer-events-none text-slate-400">
            <ChevronRight size={18} className="rotate-90" />
        </div>
    </div>
);

export default Contact;
