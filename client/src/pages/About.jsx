import React, { useEffect, useRef, useState } from 'react';
import api from '../api/api';
import { useNotification } from '../context/NotificationContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import FloatingParticles from '../components/FloatingParticles';
import {
  Lightbulb,
  Target,
  Rocket,
  CheckCircle,
  TrendingUp,
  Settings,
  BarChart,
  Users,
  Globe,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Search,
  MessageSquare
} from 'lucide-react';

// Import images
import aboutHero from '../assets/images/about/about_hero.png';
import aboutCompany from '../assets/images/about/about_company.png';
import aboutSol1 from '../assets/images/about/about_sol_1.png';
import aboutSol2 from '../assets/images/about/about_sol_2.png';
import aboutSol3 from '../assets/images/about/about_sol_3.png';
import aboutConsultation from '../assets/images/about/about_consultation.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { showNotification } = useNotification();
  const location = useLocation();
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        message: formData.message || `Subject: ${formData.subject || 'Consultation Inquiry'}`
      };
      await api.post('/contact', payload);
      showNotification('Inquiry sent successfully! We will contact you soon.', 'success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      showNotification('Failed to send inquiry. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const [showAllFaqs, setShowAllFaqs] = React.useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        '.hero-text',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );

      // Hero Cards
      gsap.fromTo(
        '.hero-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.5 }
      );

      // Stats animation
      if (statsRef.current) {
        gsap.fromTo(
          '.stat-card',
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
      
      // Process animation
      gsap.fromTo(
        '.process-step',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.process-container',
            start: 'top 80%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const faqs = [
    { q: 'When was AI Growth Exa founded?', a: 'We were founded in 2019 with a focus on AI-driven growth marketing.' },
    { q: 'Are you a traditional marketing agency?', a: 'No. We are a growth-focused, AI-first agency.' },
    { q: 'Do you work with international clients?', a: 'Yes. We work globally with a remote-first mindset.' },
    { q: 'What size companies do you work with?', a: 'From growth-stage startups to enterprise-level brands.' },
    { q: 'What makes your approach different?', a: 'We build systems, not just campaigns.' },
    { q: 'Is AI replacing human marketers?', a: 'No. AI supports smarter human decisions.' },
    { q: 'Do you provide reporting and insights?', a: 'Yes. Full transparency with actionable insights.' },
  ];

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 4);

  return (
    <div className="bg-white font-sans text-gray-800">
      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative pt-32 pb-48 md:pt-48 md:pb-56 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img src={aboutHero} alt="Corporate Team" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply"></div>
          {/* Subtle gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-3xl">
            <div className="hero-text inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold uppercase tracking-widest mb-6 border border-primary/30 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              About Us
            </div>

            <h1 className="hero-text text-5xl md:text-7xl font-black leading-[1.1] text-white mb-6">
              Building Growth Systems for the <br />
              <span className="text-primary">AI-First World</span>
            </h1>

            <p className="hero-text text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
              At AI Growth Exa, we don’t just market brands. We build intelligent growth systems designed for an AI-first world. Founded in 2019, we believe marketing should be intelligent, measurable, and scalable — not guesswork.
            </p>

            <Link
              to="/contact"
              className="hero-text inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
            >
              Start Your Journey Today
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Bottom Cards (Overlapping) */}
      <div className="relative z-20 -mt-24 md:-mt-32 container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="hero-card bg-white p-8 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex gap-5 items-start group hover:-translate-y-2 transition-transform duration-300">
            <div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Target size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To help brands grow smarter and faster using AI-driven marketing systems that deliver real business impact.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="hero-card bg-white p-8 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex gap-5 items-start group hover:-translate-y-2 transition-transform duration-300">
            <div className="p-4 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Globe size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Our Vision</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                To become a global growth partner for brands in the AI-first economy — where marketing is intelligent and efficient.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="hero-card bg-white p-8 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 flex gap-5 items-start group hover:-translate-y-2 transition-transform duration-300">
            <div className="p-4 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Core Values</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Innovation, Data, Growth, and Trust. We build long-term partnerships over short-term wins.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ABOUT COMPANY SECTION */}
      <section className="py-24 overflow-hidden bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image side */}
            <div className="w-full lg:w-1/2 relative">
              {/* Decorative Background Shape */}
              <div className="absolute -inset-4 bg-orange-100 rounded-[3rem] transform -rotate-3 z-0"></div>
              {/* Decorative Dots */}
              <div className="absolute -left-8 top-1/4 grid grid-cols-4 gap-2 z-20">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                ))}
              </div>
              <div className="absolute -right-8 bottom-1/4 grid grid-cols-4 gap-2 z-20">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                ))}
              </div>
              
              <img 
                src={aboutCompany} 
                alt="About AI Growth Exa" 
                className="relative z-10 w-full h-[500px] object-cover rounded-[2.5rem] shadow-xl border-4 border-white"
              />
              
              {/* Decorative circle */}
              <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-primary z-20"></div>
            </div>

            {/* Text side */}
            <div className="w-full lg:w-1/2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
                About Company
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                The “Why” Behind <br />
                <span className="text-slate-700">AI Growth Exa</span>
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Back in 2019, we noticed the same problem everywhere. Businesses were spending money on ads without clarity, and time on reports without insights. We asked one simple question: <strong>What if marketing could think before acting?</strong>
              </p>

              <div className="grid sm:grid-cols-2 gap-x-4 gap-y-4 mb-10">
                {[
                  'Data-driven decision systems',
                  'Predictive audience behaviour',
                  'Automation that actually converted',
                  'Enterprise-Level Growth'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                Learn More
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR SOLUTIONS / WHY CHOOSE US */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                Latest Service
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Our Growth Ecosystem
              </h2>
            </div>
            <p className="text-slate-600 text-lg max-w-md">
              Because Growth Needs Focus — Not Fluff. We replace guesswork with clarity, systems, and scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Solution 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
              <div className="h-60 overflow-hidden relative">
                <img src={aboutSol1} alt="Performance-Driven" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-4 right-4 bg-primary text-white p-3 rounded-full shadow-lg">
                  <TrendingUp size={24} />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Performance-Driven Approach</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  Every action is tied directly to ROI and outcomes. We don't just run ads; we engineer pathways to profitability.
                </p>
                <Link to="/services" className="inline-flex items-center font-bold text-slate-900 hover:text-primary transition-colors">
                  Read More <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Solution 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
              <div className="h-60 overflow-hidden relative">
                <img src={aboutSol2} alt="Automation-Focused" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg">
                  <Settings size={24} />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Automation-Focused Systems</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  Less manual work. More efficiency and scale. We build intelligent funnels that nurture and convert on autopilot.
                </p>
                <Link to="/services" className="inline-flex items-center font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                  Read More <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Solution 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 group">
              <div className="h-60 overflow-hidden relative">
                <img src={aboutSol3} alt="Dedicated Team" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-4 right-4 bg-emerald-600 text-white p-3 rounded-full shadow-lg">
                  <Users size={24} />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Dedicated Growth Team</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  Strategists, analysts, and performance experts — aligned to your goals. A true partnership for scaling your brand.
                </p>
                <Link to="/services" className="inline-flex items-center font-bold text-slate-900 hover:text-emerald-600 transition-colors">
                  Read More <ChevronRight size={18} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORK PROCESS */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 max-w-7xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
            Work Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-16">
            How We Operate
          </h2>

          <div className="process-container relative grid md:grid-cols-4 gap-8">
            {/* Connecting Line (Hidden on mobile) */}
            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-0.5 bg-slate-200 z-0"></div>

            {[
              { id: '01', title: 'Research & Data', desc: 'Deep-dive into market & behaviour.', icon: <Search size={28} /> },
              { id: '02', title: 'Strategy', desc: 'Decisions backed by truth.', icon: <Lightbulb size={28} /> },
              { id: '03', title: 'Execution', desc: 'Funnels & automation go live.', icon: <Rocket size={28} /> },
              { id: '04', title: 'Optimization', desc: 'Testing & performance improvement.', icon: <BarChart size={28} /> },
            ].map((step, i) => (
              <div key={i} className="process-step relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-white border-4 border-slate-50 rounded-full shadow-lg flex items-center justify-center text-primary mb-6 relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-black shadow-sm">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SCHEDULE CONSULTATION */}
      <section className="bg-slate-900">
        <div className="flex flex-col md:flex-row">
          {/* Left Image */}
          <div className="w-full md:w-1/2 h-[500px] md:h-auto">
            <img src={aboutConsultation} alt="Consultation" className="w-full h-full object-cover object-center" />
          </div>
          
          {/* Right Form Area */}
          <div className="w-full md:w-1/2 p-12 md:p-20 xl:p-24 flex flex-col justify-center">
            <span className="inline-flex self-start items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary-foreground/80 text-xs font-bold uppercase tracking-widest mb-6">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-10 leading-tight">
              Schedule Your Free <br />Financial Consultation
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Name" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                />
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Message" 
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-primary transition-colors resize-none"
              ></textarea>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 6. STATS MARQUEE (Retained) */}
      <section ref={statsRef} className="relative py-20 bg-white overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">Our Growth in Numbers</h2>
        </div>

        <div className="relative w-full overflow-hidden mask-gradient-sides">
          <div className="flex w-max animate-marquee hover:pause-animation">
            {[
              ...[
                { value: '1600+', label: 'Clients Served' },
                { value: '95%+', label: 'Happy Clients' },
                { value: '98%', label: 'Project Success Ratio' },
                { value: '350+', label: 'SEO Projects Delivered' },
                { value: '571+', label: 'Websites Developed' },
                { value: '400+', label: 'Ad Campaigns' },
              ],
              ...[
                { value: '1600+', label: 'Clients Served' },
                { value: '95%+', label: 'Happy Clients' },
                { value: '98%', label: 'Project Success Ratio' },
                { value: '350+', label: 'SEO Projects Delivered' },
                { value: '571+', label: 'Websites Developed' },
                { value: '400+', label: 'Ad Campaigns' },
              ]
            ].map((stat, i) => (
              <div key={i} className="mx-4 flex-shrink-0 w-64 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:scale-105 transition-transform">
                <div className="text-4xl font-black mb-2 text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 font-bold uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .mask-gradient-sides {
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }
          @keyframes aboutMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: aboutMarquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* 7. TESTIMONIALS (Retained) */}
      <section className="relative py-20 bg-slate-50 border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Happy Clients & Testimonials</h2>
        </div>

        <div className="relative w-full overflow-hidden mask-gradient-sides">
          <div className="flex w-max animate-marquee hover:pause-animation" style={{animationDuration: '60s'}}>
            {[
                { name: 'Rahul Sharma', review: 'PRIYANSHU SIR NE AND AI Growthexa TEAM ने हमारी ब्रांड पहचान पूरी तरह बदल दी। लोगो से लेकर मैसेजिंग तक, हर चीज़ में clarity और professionalism दिखता है।', stars: 5 },
                { name: 'Pooja Verma', review: 'Honestly, laga tha agency k sath kaam kr na bahot kaam chori bhara hoga but, AI Growthexa ke saath kaam karke bahut acha laga. Team ne sirf design nahi banaya, brand ko feel diya.', stars: 5 },
                { name: 'Amit Patel', review: 'AI Growthexa Team ne humare brand ko next level le aaye. Pehle sab scattered lagta tha, but ab har platform pe ek strong aur consistent identity hai.', stars: 5 },
                { name: 'Rahul Sharma', review: 'PRIYANSHU SIR NE AND AI Growthexa TEAM ने हमारी ब्रांड पहचान पूरी तरह बदल दी। लोगो से लेकर मैसेजिंग तक, हर चीज़ में clarity और professionalism दिखता है।', stars: 5 },
                { name: 'Pooja Verma', review: 'Honestly, laga tha agency k sath kaam kr na bahot kaam chori bhara hoga but, AI Growthexa ke saath kaam karke bahut acha laga. Team ne sirf design nahi banaya, brand ko feel diya.', stars: 5 },
                { name: 'Amit Patel', review: 'AI Growthexa Team ne humare brand ko next level le aaye. Pehle sab scattered lagta tha, but ab har platform pe ek strong aur consistent identity hai.', stars: 5 },
                { name: 'Rahul Sharma', review: 'PRIYANSHU SIR NE AND AI Growthexa TEAM ने हमारी ब्रांड पहचान पूरी तरह बदल दी। लोगो से लेकर मैसेजिंग तक, हर चीज़ में clarity और professionalism दिखता है।', stars: 5 },
                { name: 'Pooja Verma', review: 'Honestly, laga tha agency k sath kaam kr na bahot kaam chori bhara hoga but, AI Growthexa ke saath kaam karke bahut acha laga. Team ne sirf design nahi banaya, brand ko feel diya.', stars: 5 },
                { name: 'Amit Patel', review: 'AI Growthexa Team ne humare brand ko next level le aaye. Pehle sab scattered lagta tha, but ab har platform pe ek strong aur consistent identity hai.', stars: 5 },
                { name: 'Rahul Sharma', review: 'PRIYANSHU SIR NE AND AI Growthexa TEAM ने हमारी ब्रांड पहचान पूरी तरह बदल दी। लोगो से लेकर मैसेजिंग तक, हर चीज़ में clarity और professionalism दिखता है।', stars: 5 },
                { name: 'Pooja Verma', review: 'Honestly, laga tha agency k sath kaam kr na bahot kaam chori bhara hoga but, AI Growthexa ke saath kaam karke bahut acha laga. Team ne sirf design nahi banaya, brand ko feel diya.', stars: 5 },
                { name: 'Amit Patel', review: 'AI Growthexa Team ne humare brand ko next level le aaye. Pehle sab scattered lagta tha, but ab har platform pe ek strong aur consistent identity hai.', stars: 5 },
            ].map((t, i) => (
              <div key={i} className="mx-4 flex-shrink-0 w-96 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex gap-1 text-yellow-500 mb-4 text-xl">{'★'.repeat(t.stars)}</div>
                <p className="text-gray-600 italic mb-6 leading-relaxed line-clamp-4">"{t.review}"</p>
                <div className="font-bold text-gray-900 border-t border-slate-100 pt-4 uppercase text-sm tracking-wide">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 8. FAQs (Retained) */}
      <section className="relative py-24 bg-white">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Company FAQs</h2>
            <p className="text-slate-500">Everything you need to know about us.</p>
          </div>
          <div className="space-y-4">
            {visibleFaqs.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-primary/20 transition-colors">
                <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <MessageSquare size={18} className="text-primary" /> {faq.q}
                </h3>
                <p className="text-slate-600 pl-7">{faq.a}</p>
              </div>
            ))}
            {!showAllFaqs && (
              <div className="text-center mt-8">
                <button 
                  onClick={() => setShowAllFaqs(true)}
                  className="text-primary font-bold hover:text-primary/80 transition-colors"
                >
                  View All FAQs
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
