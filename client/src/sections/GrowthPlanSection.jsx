import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import api from '../api/api.js';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../context/NotificationContext';

gsap.registerPlugin(ScrollTrigger);

const GrowthPlanSection = () => {
    const { t } = useTranslation();
    const { showNotification } = useNotification();
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        company: '',
        industry: '',
        services: '',
        budget: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: leftRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(formRef.current,
                { x: 100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Reset status when user starts typing again
        if (submitStatus) setSubmitStatus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Validate required fields
            if (!formData.name || !formData.phone || !formData.email) {
                throw new Error(t('growth_plan.form.status.error'));
            }

            // Validate phone number format
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
                throw new Error(t('growth_plan.form.status.error'));
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                throw new Error(t('growth_plan.form.status.error'));
            }

            // Remove empty optional fields so backend enum validators don't reject empty strings.
            const payload = Object.fromEntries(
                Object.entries(formData).filter(([, value]) => value !== '')
            );

            await api.post('/leads/leadcreate', payload);



            // Success message
            setSubmitStatus('success');

            // Reset form
            setFormData({
                name: '',
                phone: '',
                email: '',
                company: '',
                industry: '',
                services: '',
                budget: '',
                message: ''
            });

            // Show success notification
            showNotification(t('growth_plan.form.status.success'), 'success');

        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');

            let errorMessage = t('growth_plan.form.status.error');

            if (error.response) {
                // Server responded with error status
                errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
            } else if (error.request) {
                // Request was made but no response
                errorMessage = 'Network error. Please check your connection.';
            } else if (error.message) {
                // Custom validation error
                errorMessage = error.message;
            }

            showNotification(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="growth-plan" ref={sectionRef} className="relative overflow-hidden py-12 bg-white">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col items-start gap-10">
                    {/* Top Content - 2 Column Split */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end">
                        <div className="space-y-4">
                            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full border border-primary/20 mb-2">
                                <span className="text-primary text-[10px] font-black uppercase tracking-widest">PERSONALIZED GROWTH PLAN</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#000048] tracking-tight">
                                Every brand is different.
                            </h2>
                            <p className="text-xl md:text-3xl font-black text-primary leading-tight">
                                Your growth plan should be too.
                            </p>
                        </div>
                        
                        <div className="max-w-xl">
                            <p className="text-lg text-gray-700 leading-relaxed border-l-2 border-primary/20 pl-6 py-2">
                                Share your goals and challenges with us. We'll create a personalized AI-powered marketing plan tailored to your brand's unique needs and objectives.
                            </p>
                        </div>
                    </div>

                    {/* Lead Form */}
                    <div ref={formRef} className="w-full">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name and Email */}
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-[#F2F2F2] border border-gray-300 rounded-xl text-gray-900 placeholder-[#4D4D4D] focus:outline-none focus:border-primary transition-all font-medium"
                                    placeholder="Name*"
                                    disabled={isSubmitting}
                                />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-[#F2F2F2] border border-gray-300 rounded-xl text-gray-900 placeholder-[#4D4D4D] focus:outline-none focus:border-primary transition-all font-medium"
                                    placeholder="Email*"
                                    disabled={isSubmitting}
                                />

                                {/* Company and Phone */}
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full px-5 py-4 bg-[#F2F2F2] border border-gray-300 rounded-xl text-gray-900 placeholder-[#4D4D4D] focus:outline-none focus:border-primary transition-all font-medium"
                                    placeholder="Organization*"
                                    disabled={isSubmitting}
                                />
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-5 py-4 bg-[#F2F2F2] border border-gray-300 rounded-xl text-gray-900 placeholder-[#4D4D4D] focus:outline-none focus:border-primary transition-all font-medium"
                                    placeholder="Contact Number*"
                                    disabled={isSubmitting}
                                />

                                {/* Industry and Services transformed to dropdown looks */}
                                <div className="relative group">
                                    <select
                                        id="industry"
                                        name="industry"
                                        value={formData.industry}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-[#F2F2F2] border border-gray-300 rounded-xl text-[#4D4D4D] focus:outline-none focus:border-primary transition-all font-medium appearance-none cursor-pointer"
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Industry*</option>
                                        <option value="E-commerce">{t('growth_plan.form.industries.ecommerce')}</option>
                                        <option value="SaaS / Technology">{t('growth_plan.form.industries.saas')}</option>
                                        <option value="Healthcare">{t('growth_plan.form.industries.healthcare')}</option>
                                        <option value="Finance">{t('growth_plan.form.industries.finance')}</option>
                                        <option value="Real Estate">{t('growth_plan.form.industries.real_estate')}</option>
                                        <option value="Education">{t('growth_plan.form.industries.education')}</option>
                                        <option value="Retail">{t('growth_plan.form.industries.retail')}</option>
                                        <option value="Consulting">{t('growth_plan.form.industries.consulting')}</option>
                                        <option value="Other">{t('growth_plan.form.industries.other')}</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <select
                                        id="services"
                                        name="services"
                                        value={formData.services}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 bg-[#F2F2F2] border border-gray-300 rounded-xl text-[#4D4D4D] focus:outline-none focus:border-primary transition-all font-medium appearance-none cursor-pointer"
                                        disabled={isSubmitting}
                                    >
                                        <option value="">Inquiry Type*</option>
                                        <option value="Brand Identity & Design">{t('growth_plan.form.service_options.brand')}</option>
                                        <option value="AI-Powered Marketing">{t('growth_plan.form.service_options.marketing')}</option>
                                        <option value="Content Creation">{t('growth_plan.form.service_options.content')}</option>
                                        <option value="Social Media Management">{t('growth_plan.form.service_options.social')}</option>
                                        <option value="SEO & Performance Marketing">{t('growth_plan.form.service_options.seo')}</option>
                                        <option value="Marketing Automation">{t('growth_plan.form.service_options.automation')}</option>
                                        <option value="Full-Service Growth">{t('growth_plan.form.service_options.full')}</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>

                                {/* Message (Span 2) */}
                                <div className="md:col-span-2 relative">
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full px-5 py-4 bg-[#F2F2F2] border border-gray-300 rounded-xl text-gray-900 placeholder-[#4D4D4D] focus:outline-none focus:border-primary transition-all resize-none font-medium"
                                        placeholder="Message"
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            {/* Privacy Checkbox */}
                            <div className="flex items-start gap-3 pt-2">
                                <input
                                    type="checkbox"
                                    id="privacy"
                                    required
                                    className="mt-1.5 w-5 h-5 border-gray-300 rounded text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                                />
                                <label htmlFor="privacy" className="text-[13px] text-[#000048] leading-relaxed">
                                    I would like Ai Growth Exa to contact me based on the information provided above. I agree to the processing of my personal data as described in the <span className="text-blue-600 underline cursor-pointer hover:text-blue-700">Privacy Notice</span>.
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-8 py-3.5 bg-primary text-white font-bold text-base rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-primary/20 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90 hover:translate-x-1'}`}
                                >
                                    {isSubmitting ? 'Processing...' : 'Submit'}
                                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                                    </div>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthPlanSection;
