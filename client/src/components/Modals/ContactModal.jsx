import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, Mail, Phone, MapPin, Globe, Loader2 } from 'lucide-react';
import api from '../../api/api';
import { useNotification } from '../../context/NotificationContext';

const ContactModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: 'Business Growth & Scaling',
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
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            console.error('Error submitting contact form:', error);
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (onClose) {
            onClose();
        } else {
            navigate(-1);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-950/80 z-[100] flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in" onClick={handleClose}>
            <div
                className="bg-white rounded-[2rem] w-full max-w-5xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row border border-white/10"
                onClick={e => e.stopPropagation()}
            >
                {/* Left Side: Branding & Info */}
                <div className="w-full md:w-[40%] bg-[#0f172a] p-10 text-white relative overflow-hidden flex flex-col justify-between">
                    {/* Background Decorative Circles */}
                    <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-white/80 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            Get In Touch
                        </div>
                        <h2 className="text-4xl font-black mb-6 leading-tight">
                            Let's Build Something <span className="text-primary">Genius</span> Together.
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
                            Ready to replace guesswork with intelligent growth? Tell us about your goals.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
                                    <Mail className="w-5 h-5 text-primary group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email Us</p>
                                    <p className="text-sm font-semibold text-slate-200">hello@aigrowthexa.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:bg-primary transition-all duration-300 group-hover:scale-110">
                                    <MapPin className="w-5 h-5 text-primary group-hover:text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Visit Us</p>
                                    <p className="text-sm font-semibold text-slate-200">Global Remote First</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-10 border-t border-slate-800 flex items-center justify-between">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            © 2024 Ai Growth Exa
                        </div>
                        <div className="flex gap-4">
                            <Globe className="w-4 h-4 text-slate-500 hover:text-primary cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="w-full md:w-[60%] p-10 md:p-14 relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-all duration-300"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {success ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <Send className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
                                <p className="text-slate-500 font-medium">We'll get back to you within 24 hours.</p>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="email@company.com"
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Service Interested In</label>
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 appearance-none cursor-pointer"
                                >
                                    <option>Business Growth & Scaling</option>
                                    <option>AI Implementation</option>
                                    <option>Performance Marketing</option>
                                    <option>Creative & Design</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">About Your Project</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your goals and current challenges..."
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-900 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary hover:bg-primary/90 text-white font-black text-lg rounded-2xl transition-all duration-300 shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {loading ? (
                                    <>
                                        <span>Sending...</span>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-slate-400 font-medium">
                                By clicking send, you agree to our <span className="text-primary cursor-pointer underline">Privacy Policy</span>.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
