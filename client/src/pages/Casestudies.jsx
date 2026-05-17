import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingParticles from '../components/FloatingParticles';
import {
    TrendingUp, TrendingDown, Users, Clock, Home, ShoppingBag,
    Code2, Stethoscope, Target, CheckCircle, XCircle, BarChart,
    Rocket, Zap, ArrowRight, Phone, Calendar, Eye, Award,
    Shield, Building2, Repeat, Mail, Cpu, ArrowUpRight, LayoutGrid
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────────────── */
const CaseStudies = () => {
    const location = useLocation();
    const csRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        /* ── Cards GSAP ── */
        const cardCtx = gsap.context(() => {
            cardRefs.current.forEach(card => {
                if (!card) return;
                gsap.fromTo(card,
                    { y: 80, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                        scrollTrigger: { trigger: card, start: 'top 83%', toggleActions: 'play none none none' }
                    }
                );
                gsap.fromTo(card.querySelectorAll('.ci'),
                    { x: -20, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out',
                        scrollTrigger: { trigger: card, start: 'top 76%' }
                    }
                );
            });
        }, csRef);

        return () => { cardCtx.revert(); };
    }, []);

    /* ── Hero collage images (content-relevant) ── */
    const heroImages = [
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop', // healthcare
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&auto=format&fit=crop', // ecommerce
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format&fit=crop', // real estate
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&auto=format&fit=crop', // IT/SaaS
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format&fit=crop', // team/startup
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&auto=format&fit=crop', // analytics
    ];

    /* ── Hero quick stats ── */
    const heroStats = [
        { num: '5.2×', label: 'Peak ROAS Achieved' },
        { num: '38%', label: 'CPL Reduction' },
        { num: '3.6×', label: 'Demo Bookings Up' },
        { num: '1.9×', label: 'Revenue in 90 Days' },
    ];

    /* ── Case studies data ── */
    const caseStudies = [
        {
            id: 'healthcare', num: '01',
            icon: <Stethoscope size={38} />, title: 'Healthcare Lead Generation System',
            industry: 'Healthcare', businessType: 'Multi-specialty clinic',
            accent: '#16a34a', iconBg: '#f0fdf4',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=90&auto=format&fit=crop',
            beforeData: ['High ad spend with low-quality leads', 'Manual and delayed follow-ups', 'Cost per lead increasing month after month'],
            strategy: ['AI-based audience targeting', 'Funnel-driven patient journey design', 'Automated WhatsApp & CRM follow-ups', 'Conversion-focused landing pages'],
            metrics: [
                { value: '38%', label: 'Reduction in CPL', icon: <TrendingDown size={18} /> },
                { value: '2.4×', label: 'Increase in qualified inquiries', icon: <Users size={18} /> },
                { value: '<5 min', label: 'Response time reduced', icon: <Clock size={18} /> },
            ],
            outcome: 'A predictable and scalable patient acquisition system that worked consistently—not occasionally.',
        },
        {
            id: 'realestate', num: '02',
            icon: <Home size={38} />, title: 'Real Estate High-Intent Lead Funnel',
            industry: 'Real Estate', businessType: 'Residential developer',
            accent: '#2563eb', iconBg: '#eff6ff',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=90&auto=format&fit=crop',
            beforeData: ['High volume of junk leads', 'Poor follow-up and tracking', 'Low site-visit conversion ratio'],
            strategy: ['Location + intent-based ad targeting', 'AI-powered lead qualification', 'CRM & site-visit automation', 'Multi-step nurturing funnel'],
            metrics: [
                { value: '3.1×', label: 'ROAS', icon: <BarChart size={18} /> },
                { value: '41%', label: 'Reduction in CPL', icon: <TrendingDown size={18} /> },
                { value: '2×', label: 'Increase in site visits', icon: <Home size={18} /> },
            ],
            outcome: 'Sales teams spoke only with ready-to-buy prospects, not cold or unqualified leads.',
        },
        {
            id: 'ecommerce', num: '03',
            icon: <ShoppingBag size={38} />, title: 'E-commerce & D2C Scaling System',
            industry: 'E-commerce / D2C', businessType: 'Consumer brand',
            accent: '#ea580c', iconBg: '#fff7ed',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=90&auto=format&fit=crop',
            beforeData: ['Rising acquisition costs', 'Low repeat purchase rate', 'Ad fatigue impacting performance'],
            strategy: ['AI-powered product & audience segmentation', 'Funnel-level ROAS optimization', 'Retargeting & retention automation', 'CRO-driven website improvements'],
            metrics: [
                { value: '5.2×', label: 'ROAS', icon: <BarChart size={18} /> },
                { value: '2×', label: 'Repeat purchase rate', icon: <Repeat size={18} /> },
                { value: '1.9×', label: 'Revenue growth in 90 days', icon: <TrendingUp size={18} /> },
            ],
            outcome: 'Profit-first scaling with sustainable growth, not discount dependency.',
        },
        {
            id: 'saas', num: '04',
            icon: <Code2 size={38} />, title: 'SaaS & B2B Lead Generation',
            industry: 'IT Services / SaaS', businessType: 'B2B software company',
            accent: '#0891b2', iconBg: '#ecfeff',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=90&auto=format&fit=crop',
            beforeData: ['Long sales cycles', 'Low demo-to-close ratio', 'High cost per lead'],
            strategy: ['LinkedIn + Google Ads demand generation', 'AI-based lead scoring', 'Demo-focused landing pages', 'Funnel-level attribution tracking'],
            metrics: [
                { value: '3.6×', label: 'Increase in demo bookings', icon: <Calendar size={18} /> },
                { value: '29%', label: 'Reduction in CPL', icon: <TrendingDown size={18} /> },
                { value: 'Higher', label: 'Demo-to-sale conversion', icon: <Target size={18} /> },
            ],
            outcome: 'Sales teams engaged only with qualified decision-makers, improving efficiency and revenue.',
        },
    ];

    const commonalities = [
        { icon: <Cpu size={22} />, title: 'Expertise & Specialization', text: 'Access to a team with expertise in various marketing disciplines, ensuring campaigns are well-founded.' },
        { icon: <Target size={22} />, title: 'Fresh Perspectives', text: 'We bring an outsider\'s perspective to your brand. This fresh view adapts to changing market trends.' },
        { icon: <Clock size={22} />, title: 'Scalability & Flexibility', text: 'Whether you\'re a small startup or a large corporation, we can help you scale your services to meet needs.' },
        { icon: <BarChart size={22} />, title: 'Resource Optimization', text: 'Instead of hiring an in-house team, you can tap into the agency\'s existing infrastructure.' },
    ];

    return (
        <div style={{ background: '#FAF9F6', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#111' }}>
            
            {/* HERO SECTION */}
            <section style={{ paddingTop: '140px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    {/* Dark Nav Pill */}
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '24px', background: '#000', color: '#fff', padding: '8px 24px', borderRadius: '999px', fontSize: '13px', fontWeight: '600', marginBottom: '50px' }}>
                        <span>FirstPlace</span>
                        <span style={{ color: '#aaa' }}>Why Us</span>
                        <span style={{ color: '#aaa' }}>About Us</span>
                        <span style={{ color: '#aaa' }}>Portfolio</span>
                        <span style={{ color: '#facc15', display: 'flex', alignItems: 'center', gap: '4px' }}>Book a call <ArrowUpRight size={14}/></span>
                    </div>

                    <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.04em', margin: '0 0 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        We drive growth to <br/> your business <ArrowUpRight size={44} strokeWidth={2.5} style={{ alignSelf: 'flex-end', marginBottom: '8px' }} />
                    </h1>
                    
                    <p style={{ fontSize: '1.05rem', color: '#555', maxWidth: '520px', margin: '0 auto 30px', lineHeight: 1.6, fontWeight: 500 }}>
                        Unlock your brand's potential with our proven marketing expertise. From strategy to execution, we drive growth.
                    </p>

                    <Link to="/contact" state={{ background: location }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#facc15', color: '#000', padding: '12px 28px', borderRadius: '999px', fontWeight: 800, textDecoration: 'none', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        Book a call <ArrowUpRight size={18} />
                    </Link>
                </div>

                {/* BENTO GRID */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {/* Services Box */}
                    <div style={{ background: '#fff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>Services</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            <span style={{ padding: '8px 16px', borderRadius: '999px', border: '1.5px solid #000', fontSize: '12px', fontWeight: 700 }}>Web Design</span>
                            <span style={{ padding: '8px 16px', borderRadius: '999px', border: '1.5px solid #eaeaea', fontSize: '12px', fontWeight: 600, color: '#666' }}>Social Media</span>
                            <span style={{ padding: '8px 16px', borderRadius: '999px', background: '#000', color: '#fff', fontSize: '12px', fontWeight: 700 }}>Marketing</span>
                            <span style={{ padding: '8px 16px', borderRadius: '999px', border: '1.5px solid #eaeaea', fontSize: '12px', fontWeight: 600, color: '#666' }}>Paid Ads</span>
                            <span style={{ padding: '8px 16px', borderRadius: '999px', border: '1.5px solid #eaeaea', fontSize: '12px', fontWeight: 600, color: '#666' }}>Branding</span>
                            <span style={{ padding: '8px 16px', borderRadius: '999px', background: '#000', color: '#fff', fontSize: '12px', fontWeight: 700 }}>Content Creation</span>
                        </div>
                    </div>

                    {/* Middle Stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Dark Stat */}
                        <div style={{ background: '#000', color: '#fff', borderRadius: '24px', padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{heroStats[0].num}</div>
                            <div style={{ fontSize: '0.9rem', color: '#aaa', marginTop: '4px', fontWeight: 500 }}>{heroStats[0].label} in our tracking</div>
                        </div>
                        {/* Light Stat */}
                        <div style={{ background: '#fff', color: '#111', borderRadius: '24px', padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{heroStats[1].num}</div>
                            <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px', fontWeight: 500 }}>{heroStats[1].label} across accounts</div>
                        </div>
                    </div>

                    {/* Testimonial Box */}
                    <div style={{ background: '#fff', borderRadius: '24px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: '3rem', color: '#111', lineHeight: 0.5, marginTop: '20px', fontFamily: 'serif', fontWeight: 900 }}>"</div>
                        <p style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.5, margin: '16px 0 24px 0', letterSpacing: '-0.01em' }}>
                            The final product exceeded my expectations. <br/><br/>
                            Impressed with the results!
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#444', border: '2px solid #fff', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>AI</div>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#888', border: '2px solid #fff', marginLeft: '-12px', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>G</div>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#facc15', border: '2px solid #fff', marginLeft: '-12px', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '10px', fontWeight: 'bold' }}>E</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DARK SECTION */}
            <section style={{ background: '#000', color: '#fff', padding: '100px 24px', marginTop: '40px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 300px' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                            Why our clients <br/> choose us as <br/> partners
                        </h2>
                    </div>
                    <div style={{ flex: '2 1 400px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '50px 30px' }}>
                        {commonalities.map((item, i) => (
                            <div key={i}>
                                <div style={{ color: '#facc15', marginBottom: '20px' }}>
                                    <LayoutGrid size={32} />
                                </div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.01em' }}>{item.title}</h4>
                                <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6, fontWeight: 500 }}>
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* GET TO KNOW US */}
            <section style={{ padding: '100px 24px', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '50px', flexWrap: 'wrap', gap: '40px' }}>
                    <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800, flex: '1 1 300px', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                        Get to know us a little <br/> more
                    </h2>
                    <div style={{ flex: '1 1 400px', color: '#555', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 500 }}>
                        <p style={{ marginBottom: '16px' }}>Our approach combines strategic thinking with innovative tactics to drive tangible results and achieve our clients' goals.</p>
                        <p>We are dedicated to delivering exceptional value and helping businesses thrive in the ever-evolving marketplace.</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '2 1 400px', borderRadius: '24px', overflow: 'hidden', height: '320px' }}>
                        <img src={heroImages[4]} alt="Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: '1 1 250px', background: '#fff', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.04em' }}>#1 Team!</h3>
                        <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500 }}>
                            We've helped hundreds of partners, ranging from startups to medium-sized businesses to achieve their goals. And stellar feedback is our reward!
                        </p>
                    </div>
                </div>
            </section>

            {/* CASE STUDIES GRID */}
            <section ref={csRef} style={{ padding: '60px 24px 100px 24px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#111', letterSpacing: '-0.03em' }}>
                            Incredible projects we have worked on
                        </h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
                        {caseStudies.map((study, index) => (
                            <div key={study.id}
                                ref={el => cardRefs.current[index] = el}
                                style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #eaeaea', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.03)', transition: 'transform 0.3s' }}
                            >
                                <div style={{ height: '6px', background: study.accent }} />

                                <div style={{ padding: '32px 40px' }}>
                                    {/* Card header */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
                                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#f1f1f1', lineHeight: 1, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                                            {study.num}
                                        </div>
                                        <div style={{ width: '70px', height: '70px', borderRadius: '16px', background: study.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: study.accent, flexShrink: 0 }}>
                                            {study.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '12px', fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>{study.industry}</div>
                                            <h3 style={{ fontSize: 'clamp(1.4rem,2vw,1.8rem)', fontWeight: 800, color: '#111', margin: '0 0 8px', letterSpacing: '-0.02em' }}>{study.title}</h3>
                                        </div>
                                        <div style={{ padding: '8px 16px', background: '#faf9f6', border: '1px solid #eaeaea', borderRadius: '999px', fontSize: '13px', fontWeight: 700, color: '#444', flexShrink: 0 }}>
                                            {study.businessType}
                                        </div>
                                    </div>

                                    {/* 2-col: Before / Strategy */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: '20px', marginBottom: '24px' }}>
                                        <div style={{ background: '#faf9f6', borderRadius: '16px', padding: '24px', border: '1px solid #eaeaea' }}>
                                            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <XCircle size={16} style={{ color: '#dc2626' }} /> Before
                                            </h4>
                                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {study.beforeData.map((item, i) => (
                                                    <li key={i} className="ci" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#dc2626', flexShrink: 0, marginTop: '8px' }} />
                                                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#555', lineHeight: 1.5 }}>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div style={{ background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                                            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <CheckCircle size={16} style={{ color: study.accent }} /> Strategy Used
                                            </h4>
                                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {study.strategy.map((item, i) => (
                                                    <li key={i} className="ci" style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: study.accent, flexShrink: 0, marginTop: '8px' }} />
                                                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#111', lineHeight: 1.5 }}>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Metrics row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '16px', marginBottom: '24px' }}>
                                        {study.metrics.map((metric, i) => (
                                            <div key={i} className="ci" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#fff', border: '1px solid #eaeaea', borderRadius: '16px' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#faf9f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', flexShrink: 0 }}>
                                                    {metric.icon}
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '24px', fontWeight: 800, color: '#111', lineHeight: 1 }}>{metric.value}</div>
                                                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#666', marginTop: '6px' }}>{metric.label}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Outcome */}
                                    <div style={{ background: '#faf9f6', border: '1px solid #eaeaea', borderRadius: '16px', padding: '24px' }}>
                                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Award size={16} style={{ color: '#111' }} /> Outcome
                                        </h4>
                                        <p style={{ fontSize: '16px', fontWeight: 600, color: '#333', fontStyle: 'italic', margin: 0, lineHeight: 1.6 }}>"{study.outcome}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudies;
