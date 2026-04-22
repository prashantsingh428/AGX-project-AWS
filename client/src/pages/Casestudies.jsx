import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingParticles from '../components/FloatingParticles';
import {
    TrendingUp, TrendingDown, Users, Clock, Home, ShoppingBag,
    Code2, Stethoscope, Target, CheckCircle, XCircle, BarChart,
    Rocket, Zap, ArrowRight, Phone, Calendar, Eye, Award,
    Shield, Building2, Repeat, Mail, Cpu,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────────────────────── */
const CaseStudies = () => {
    const location = useLocation();
    const heroRef = useRef(null);
    const csRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        /* ── Hero GSAP ── */
        const heroCtx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo('.cs-collage-cell',
                { opacity: 0, scale: 1.12 },
                { opacity: 1, scale: 1, duration: 1.6, stagger: 0.12, ease: 'power2.out' }
            )
                .fromTo('.cs-badge', { y: -28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=1.0')
                .fromTo('.cs-h1', { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, '-=0.6')
                .fromTo('.cs-sub', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
                .fromTo('.cs-box', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
                .fromTo('.cs-btn', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.12 }, '-=0.3');

            /* floating counter numbers in hero stats */
            gsap.fromTo('.hero-stat-num',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.6)', delay: 1.4 }
            );
        }, heroRef);

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
                gsap.fromTo(card.querySelectorAll('.mv'),
                    { scale: 0.4, opacity: 0 },
                    {
                        scale: 1, opacity: 1, duration: 0.65, stagger: 0.15, ease: 'back.out(1.7)',
                        scrollTrigger: { trigger: card, start: 'top 70%' }
                    }
                );
            });
            gsap.fromTo('.cw-card',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out',
                    scrollTrigger: { trigger: '.cw-section', start: 'top 78%' }
                }
            );
        }, csRef);

        return () => { heroCtx.revert(); cardCtx.revert(); };
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
        { icon: <Cpu size={22} />, text: 'AI-driven decision-making' },
        { icon: <Target size={22} />, text: 'Funnel-based growth systems' },
        { icon: <Clock size={22} />, text: 'Automation that saves time & money' },
        { icon: <BarChart size={22} />, text: 'Clear focus on ROI — not vanity metrics' },
    ];

    const beliefs = {
        dont: ['Fake screenshots', 'Over-promised guarantees', 'One-time wins'],
        do: ['Transparent growth stories', 'Realistic expectations', 'Long-term, scalable systems'],
    };

    return (
        <div style={{ background: '#ffffff' }}>

            {/* ================================================================
                HERO — 100vh, 6-cell collage, GSAP animated
            ================================================================ */}
            <section
                ref={heroRef}
                style={{
                    position: 'relative', width: '100%', height: '100vh', minHeight: 640,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    overflow: 'hidden', background: '#0f172a'
                }}
            >
                {/* Collage grid */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0,
                    display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
                    gridTemplateRows: 'repeat(2,1fr)', gap: 3
                }}>
                    {heroImages.map((src, i) => (
                        <div key={i} className="cs-collage-cell" style={{
                            backgroundImage: `url(${src})`,
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            filter: 'brightness(0.42) saturate(0.7)',
                        }} />
                    ))}
                </div>

                {/* Dark overlay */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background: 'linear-gradient(180deg,rgba(15,23,42,0.45) 0%,rgba(15,23,42,0.78) 45%,rgba(15,23,42,0.97) 100%)'
                }} />

                {/* Glow blobs */}
                <div style={{ position: 'absolute', top: '-8%', right: '-4%', width: 460, height: 460, borderRadius: '50%', background: 'rgba(37,99,235,0.18)', filter: 'blur(110px)', zIndex: 1, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-6%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(124,58,237,0.14)', filter: 'blur(100px)', zIndex: 1, pointerEvents: 'none' }} />

                <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.14 }}>
                    <FloatingParticles theme="dark" />
                </div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100, padding: '0 24px', textAlign: 'center', color: '#fff' }}>

                    {/* Badge */}
                    <div className="cs-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 999, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: 22 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#60a5fa', display: 'inline-block', animation: 'cspulse 1.5s infinite' }} />
                        Case Studies & Results
                    </div>

                    {/* Headline */}
                    <h1 className="cs-h1" style={{ fontSize: 'clamp(2.4rem,6.5vw,5rem)', fontWeight: 900, lineHeight: 1.06, letterSpacing: '-0.02em', margin: '0 0 18px', color: '#fff' }}>
                        Real <span style={{ color: '#60a5fa' }}>Growth.</span>
                        <br />
                        Real <span style={{ color: '#a78bfa' }}>Systems.</span> Real <span style={{ color: '#f472b6' }}>Impact.</span>
                    </h1>

                    {/* Sub */}
                    <p className="cs-sub" style={{ fontSize: 'clamp(0.95rem,2vw,1.18rem)', color: '#cbd5e1', maxWidth: 660, margin: '0 auto 20px', lineHeight: 1.72, fontWeight: 500 }}>
                        At <strong style={{ color: '#fff' }}>AI Growth Exa</strong>, we believe results speak louder than promises.
                    </p>

                    {/* Info box */}
                    <div className="cs-box" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.11)', borderRadius: 16, padding: '14px 24px', maxWidth: 660, margin: '0 auto 26px', backdropFilter: 'blur(10px)' }}>
                        <p style={{ fontSize: '0.92rem', color: '#93c5fd', fontWeight: 600, margin: '0 0 6px' }}>
                            Real-world growth systems built using AI-driven strategies, performance frameworks &amp; automation engines.
                        </p>
                        <p style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 500, margin: 0 }}>
                            Client identities are anonymized for confidentiality. Outcomes &amp; results are 100% real.
                        </p>
                    </div>

                    {/* Quick stats row */}
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
                        {heroStats.map((s, i) => (
                            <div key={i} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 12, padding: '10px 20px', textAlign: 'center', backdropFilter: 'blur(6px)' }}>
                                <div className="hero-stat-num" style={{ fontSize: '1.45rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.num}</div>
                                <div style={{ fontSize: 10, color: '#cbd5e1', fontWeight: 600, marginTop: 3 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" state={{ background: location }} className="cs-btn"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', background: '#2563eb', color: '#fff', fontWeight: 800, fontSize: '0.98rem', borderRadius: 12, textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,99,235,0.4)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'scale(1)'; }}>
                            Customize Your Growth Plan <ArrowRight size={17} />
                        </Link>
                        <Link to="/contact" className="cs-btn"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', background: 'rgba(255,255,255,0.09)', color: '#fff', fontWeight: 800, fontSize: '0.98rem', borderRadius: 12, border: '2px solid rgba(255,255,255,0.2)', textDecoration: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}>
                            Book a Strategy Call <Phone size={17} />
                        </Link>
                    </div>
                </div>

                {/* Scroll hint */}
                <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, opacity: 0.45 }}>
                    <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8' }}>Scroll</span>
                    <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom,#94a3b8,transparent)' }} />
                </div>

                <style>{`@keyframes cspulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:0.4}}`}</style>
            </section>

            {/* ================================================================
                CASE STUDIES GRID — white cards, pure black text
            ================================================================ */}
            <section ref={csRef} style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div style={{ maxWidth: 1260, margin: '0 auto', padding: '0 24px' }}>

                    {/* Section header */}
                    <div style={{ textAlign: 'center', marginBottom: 60 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 18px', borderRadius: 999, background: '#f1f5f9', color: '#0f172a', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid #e2e8f0', marginBottom: 16 }}>
                            <Eye size={14} /> Real Results
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.9rem,3.8vw,3rem)', fontWeight: 900, color: '#0f172a', marginBottom: 14, lineHeight: 1.15 }}>
                            Success Stories Across <span style={{ color: '#2563eb' }}>Industries</span>
                        </h2>
                        <p style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', maxWidth: 560, margin: '0 auto' }}>
                            Every case study represents a real business that transformed their growth with our AI-powered systems.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
                        {caseStudies.map((study, index) => (
                            <div key={study.id}
                                ref={el => cardRefs.current[index] = el}
                                style={{ background: '#ffffff', borderRadius: 24, border: '1.5px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', transition: 'box-shadow 0.3s,transform 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.1),0 0 0 2px ${study.accent}`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                {/* Accent top bar */}
                                <div style={{ height: 4, background: study.accent }} />

                                <div style={{ padding: '28px 32px' }}>

                                    {/* Card header */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28, flexWrap: 'wrap' }}>
                                        {/* Case # */}
                                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#e2e8f0', lineHeight: 1, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                                            {study.num}
                                        </div>
                                        {/* Icon */}
                                        <div style={{ width: 72, height: 72, borderRadius: 14, background: study.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: study.accent, flexShrink: 0, border: `1.5px solid ${study.accent}22` }}>
                                            {study.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 13, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{study.industry}</div>
                                            <h3 style={{ fontSize: 'clamp(1.35rem,2.4vw,2rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>{study.title}</h3>
                                            <div style={{ height: 4, width: 48, borderRadius: 2, background: study.accent }} />
                                        </div>
                                        {/* Business type badge */}
                                        <div style={{ padding: '8px 18px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 13, fontWeight: 800, color: '#0f172a', flexShrink: 0 }}>
                                            {study.businessType}
                                        </div>
                                        {/* Thumbnail */}
                                        <div style={{ width: 170, height: 104, borderRadius: 12, overflow: 'hidden', border: `2px solid ${study.accent}28`, flexShrink: 0 }}>
                                            <img src={study.image} alt={study.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                        </div>
                                    </div>

                                    {/* 2-col: Before / Strategy */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18, marginBottom: 18 }}>

                                        {/* Before */}
                                        <div style={{ background: '#fff5f5', border: '1.5px solid #fecaca', borderRadius: 14, padding: '22px 20px' }}>
                                            <h4 style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#fee2e2', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <XCircle size={14} style={{ color: '#dc2626' }} />
                                                </span>
                                                Before AI Growth Exa
                                            </h4>
                                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                {study.beforeData.map((item, i) => (
                                                    <li key={i} className="ci" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', flexShrink: 0, marginTop: 7 }} />
                                                        <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', lineHeight: 1.6 }}>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Strategy */}
                                        <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '22px 20px' }}>
                                            <h4 style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <Zap size={16} style={{ color: '#0f172a', flexShrink: 0 }} /> Strategy Used
                                            </h4>
                                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                {study.strategy.map((item, i) => (
                                                    <li key={i} className="ci" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                                        <CheckCircle size={16} style={{ color: study.accent, flexShrink: 0, marginTop: 2 }} />
                                                        <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', lineHeight: 1.6 }}>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Metrics row */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 20 }}>
                                        {study.metrics.map((metric, i) => (
                                            <div key={i} className="ci" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14 }}>
                                                <div style={{ width: 46, height: 46, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', flexShrink: 0, border: '1px solid #e2e8f0' }}>
                                                    {metric.icon}
                                                </div>
                                                <div>
                                                    <div className="mv" style={{ fontSize: 26, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{metric.value}</div>
                                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#334155', marginTop: 4 }}>{metric.label}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Outcome */}
                                    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '20px 24px', marginBottom: 4 }}>
                                        <h4 style={{ fontSize: 14, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
                                            <Award size={16} style={{ color: '#0f172a' }} /> Outcome
                                        </h4>
                                        <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', fontStyle: 'italic', margin: 0, lineHeight: 1.7 }}>"{study.outcome}"</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================
                WHAT THEY HAVE IN COMMON
            ================================================================ */}
            <section className="cw-section" style={{ background: '#0f172a', padding: '72px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none' }}><FloatingParticles theme="dark" /></div>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: '#93c5fd', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.15)', marginBottom: 14 }}>
                            <Target size={13} /> The Common Pattern
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.7rem,3.5vw,2.7rem)', fontWeight: 900, color: '#ffffff', marginBottom: 10 }}>
                            What All These Case Studies <span style={{ color: '#60a5fa' }}>Have in Common</span>
                        </h2>
                        <p style={{ fontSize: '1.15rem', fontWeight: 700, color: '#e2e8f0' }}>Across industries, the pattern is clear:</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18 }}>
                        {commonalities.map((item, i) => (
                            <div key={i} className="cw-card" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', borderRadius: 16, padding: '24px 20px', transition: 'background 0.2s', cursor: 'default' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.14)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}>
                                <div style={{ color: '#60a5fa', marginBottom: 12 }}>{item.icon}</div>
                                <p style={{ fontSize: 15, fontWeight: 800, color: '#f1f5f9', margin: 0 }}>{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 28, textAlign: 'center' }}>
                        <p style={{ fontSize: '1.05rem', fontWeight: 800, color: '#93c5fd' }}>👉 That's why our results are repeatable, not accidental.</p>
                    </div>
                </div>
            </section>

            {/* ================================================================
                WHY WE SHARE RESULTS THIS WAY — pure black text
            ================================================================ */}
            <section style={{ background: '#ffffff', padding: '72px 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <h2 style={{ fontSize: 'clamp(1.7rem,3.5vw,2.7rem)', fontWeight: 900, color: '#0f172a', marginBottom: 10 }}>
                            Why We Share <span style={{ color: '#2563eb' }}>Results This Way</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginBottom: 40 }}>
                        {/* Don't believe */}
                        <div style={{ background: '#fff5f5', border: '1.5px solid #fecaca', borderRadius: 20, padding: '36px 32px' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <XCircle size={26} style={{ color: '#dc2626', flexShrink: 0 }} /> We don't believe in:
                            </h3>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {beliefs.dont.map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <XCircle size={15} style={{ color: '#dc2626' }} />
                                        </span>
                                        <span style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>❌ {item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Do believe */}
                        <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 20, padding: '36px 32px' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
                                <CheckCircle size={26} style={{ color: '#16a34a', flexShrink: 0 }} /> We believe in:
                            </h3>
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {beliefs.do.map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <CheckCircle size={15} style={{ color: '#16a34a' }} />
                                        </span>
                                        <span style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>✅ {item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Trust badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
                        {['100% Real Results', 'Anonymized Data', 'Verified Outcomes', 'Transparent Process', 'Scalable Systems'].map((badge, i) => (
                            <span key={i} style={{ padding: '7px 16px', background: '#f1f5f9', borderRadius: 999, fontSize: 12, fontWeight: 800, color: '#0f172a', border: '1.5px solid #e2e8f0', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                <Shield size={12} style={{ color: '#0f172a' }} /> {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================
                FINAL CTA
            ================================================================ */}
            <section style={{ background: '#ffffff', padding: '72px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none' }}><FloatingParticles theme="dark" /></div>
                <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: 'clamp(1.7rem,3.5vw,3rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, marginBottom: 18 }}>
                        Want Results Like These —{' '}
                        <span style={{ color: '#2563eb' }}>Built for Your Business?</span>
                    </h2>
                    <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#334155', maxWidth: 500, margin: '0 auto 40px' }}>
                        Every case study starts with one decision: Stop guessing. Start building smart growth systems.
                    </p>
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
                        <Link to="/contact" state={{ background: location }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', background: '#2563eb', color: '#fff', fontWeight: 800, fontSize: '0.98rem', borderRadius: 12, textDecoration: 'none', boxShadow: '0 4px 18px rgba(37,99,235,0.32)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'scale(1)'; }}>
                            <Zap size={17} /> Customize Your Growth Plan <ArrowRight size={17} />
                        </Link>
                        <Link to="/contact"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', background: '#0f172a', color: '#fff', fontWeight: 800, fontSize: '0.98rem', borderRadius: 12, textDecoration: 'none', transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#1e293b'}
                            onMouseLeave={e => e.currentTarget.style.background = '#0f172a'}>
                            <Calendar size={17} /> Book a Strategy Call
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, color: '#64748b' }}>
                        <a href="mailto:hello@aigrowthexa.com" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#334155', textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
                            onMouseLeave={e => e.currentTarget.style.color = '#334155'}>
                            <Mail size={16} /> hello@aigrowthexa.com
                        </a>
                        <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#334155', textDecoration: 'none', fontSize: 14, fontWeight: 600, transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#0f172a'}
                            onMouseLeave={e => e.currentTarget.style.color = '#334155'}>
                            <Phone size={16} /> +91 98765 43210
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudies;
