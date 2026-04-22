import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingParticles from '../components/FloatingParticles';
import {
    Building2, Stethoscope, Home, GraduationCap, ShoppingBag, Code2, Rocket,
    TrendingUp, TrendingDown, Target, CheckCircle, Users, Clock, Zap, BarChart,
    Phone, ChevronRight, ArrowRight, Calendar, Shield, Globe, Settings,
    BarChart2, PieChart, Activity, MapPin, Percent,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
   INLINE CHART COMPONENTS  (no external lib needed)
───────────────────────────────────────────────────────────────── */

// Simple animated bar chart
const BarChartWidget = ({ title, source, bars, accentColor }) => (
    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '18px 20px', height: '100%' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{title}</div>
        {source && <div style={{ fontSize: 10, color: '#64748b', fontWeight: 600, marginBottom: 14 }}>{source}</div>}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90 }}>
            {bars.map((bar, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                    <span style={{ fontSize: 8, fontWeight: 800, color: '#0f172a' }}>
                        {bar.label2 || ''}
                    </span>
                    <div style={{ width: '100%', height: bar.height, background: i === bars.length - 1 ? accentColor : `${accentColor}55`, borderRadius: '3px 3px 0 0', transition: 'height 1s ease', position: 'relative' }}>
                        {i === bars.length - 1 && (
                            <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', fontSize: 9, fontWeight: 900, color: '#0f172a', whiteSpace: 'nowrap' }}>{bar.value}</div>
                        )}
                    </div>
                    <span style={{ fontSize: 8, color: '#334155', fontWeight: 600, textAlign: 'center' }}>{bar.label}</span>
                </div>
            ))}
        </div>
    </div>
);

// Donut / stat widget
const StatDonutWidget = ({ title, value, subtitle, accentColor, stats }) => (
    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '18px 20px', height: '100%' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>{title}</div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            {/* Pseudo donut */}
            <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke={accentColor} strokeWidth="3.5"
                        strokeDasharray={`${value} ${100 - value}`} strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 900, color: '#0f172a' }}>{value}%</div>
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>{subtitle}</div>
                {stats && stats.map((s, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 10, color: '#334155', fontWeight: 700 }}>{s.label}</span>
                        <span style={{ fontSize: 10, color: '#0f172a', fontWeight: 900 }}>{s.val}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Horizontal bar chart (for city-wise / ranked data)
const HorizontalBarWidget = ({ title, bars, accentColor }) => (
    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '18px 20px', height: '100%' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', marginBottom: 14 }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {bars.map((b, i) => (
                <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#0f172a' }}>{b.label}</span>
                        <span style={{ fontSize: 10, fontWeight: 900, color: '#0f172a' }}>{b.value}</span>
                    </div>
                    <div style={{ height: 7, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${b.pct}%`, background: accentColor, borderRadius: 4 }} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Brand logos grid widget
const BrandGridWidget = ({ title, brands, accentColor }) => (
    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '18px 20px', height: '100%' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>{title}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {brands.map((b, i) => (
                <span key={i} style={{ padding: '3px 10px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 10, fontWeight: 700, color: '#0f172a' }}>{b}</span>
            ))}
        </div>
    </div>
);

// Growth comparison widget
const GrowthWidget = ({ title, from, to, fromVal, toVal, accentColor, icon }) => (
    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '18px 20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#334155', fontWeight: 700, marginBottom: 3 }}>{from}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#0f172a' }}>{fromVal}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: 18 }}>{icon}</div>
                {/* Solid line — no gradient */}
                <div style={{ height: 2, width: '100%', background: '#cbd5e1', borderRadius: 2 }} />
            </div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: '#334155', fontWeight: 700, marginBottom: 3 }}>{to}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a' }}>{toVal}</div>
            </div>
        </div>
        <div style={{ marginTop: 10, padding: '6px 10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 10, fontWeight: 800, color: '#0f172a', textAlign: 'center' }}>
            Massive Growth Opportunity →
        </div>
    </div>
);

// Cycle / steps widget (for digital marketing cycle)
const CycleWidget = ({ title, steps, accentColor }) => (
    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '18px 20px', height: '100%' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>{title}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 8 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: accentColor, color: '#fff', fontSize: 10, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>{s}</span>
                </div>
            ))}
        </div>
    </div>
);

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */
const Industries = () => {
    const location = useLocation();
    const heroRef = useRef(null);
    const industriesRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const heroCtx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.fromTo('.collage-cell', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1.5, stagger: 0.1, ease: 'power2.out' })
                .fromTo('.hero-badge', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.9')
                .fromTo('.hero-title', { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.5')
                .fromTo('.hero-sub', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
                .fromTo('.hero-box', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4')
                .fromTo('.hero-pill', { scale: 0.75, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.07 }, '-=0.3')
                .fromTo('.hero-btn', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.12 }, '-=0.2');
        }, heroRef);

        const cardCtx = gsap.context(() => {
            cardRefs.current.forEach(card => {
                if (!card) return;
                gsap.fromTo(card,
                    { y: 80, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
                        scrollTrigger: { trigger: card, start: 'top 83%', toggleActions: 'play none none none' }
                    });
                gsap.fromTo(card.querySelectorAll('.anim-item'),
                    { x: -18, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out',
                        scrollTrigger: { trigger: card, start: 'top 76%' }
                    });
                gsap.fromTo(card.querySelectorAll('.metric-val'),
                    { scale: 0.5, opacity: 0 },
                    {
                        scale: 1, opacity: 1, duration: 0.65, stagger: 0.15, ease: 'back.out(1.7)',
                        scrollTrigger: { trigger: card, start: 'top 70%' }
                    });
                // Chart bars animate in
                gsap.fromTo(card.querySelectorAll('.chart-bar'),
                    { scaleY: 0 },
                    {
                        scaleY: 1, duration: 0.8, stagger: 0.05, ease: 'power2.out', transformOrigin: 'bottom',
                        scrollTrigger: { trigger: card, start: 'top 68%' }
                    });
            });
            gsap.fromTo('.why-card',
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: '.why-section', start: 'top 78%' }
                });
        }, industriesRef);

        return () => { heroCtx.revert(); cardCtx.revert(); };
    }, []);

    /* ── Industry data ── */
    const industries = [
        {
            id: 'healthcare', icon: <Stethoscope size={40} />, title: 'Healthcare & Pharma',
            accent: '#16a34a', iconBg: '#f0fdf4',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=90&auto=format&fit=crop',
            painPoints: ['High competition & rising ad costs', 'Trust, credibility & compliance challenges', 'Low-quality patient inquiries', 'Long patient decision cycles'],
            solutions: ['High-intent patient acquisition funnels', 'AI-based targeting & remarketing', 'Automated WhatsApp, CRM & appointment systems', 'Compliance-aware ad & content strategies'],
            metrics: [{ value: '38%', label: 'Reduction in CPL', icon: <TrendingDown size={18} /> }, { value: '2.4×', label: 'Increase in qualified inquiries', icon: <Users size={18} /> }],
            // ── Data widget for this industry
            dataWidget: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
                    <BarChartWidget
                        title="India Hospital Market CAGR"
                        source="TechSci Research, 2025–2030F"
                        accentColor="#16a34a"
                        bars={[
                            { label: '2022', height: 28 }, { label: '2023', height: 34 }, { label: '2024', height: 42 },
                            { label: '2025', height: 52 }, { label: '2026', height: 63 }, { label: '2027', height: 72 },
                            { label: '2028', height: 80 }, { label: '2030', height: 90, value: '10.64%', label2: 'CAGR' },
                        ]}
                    />
                    <StatDonutWidget
                        title="India Hospital Market Segments"
                        value={64}
                        subtitle="Private sector dominates"
                        accentColor="#16a34a"
                        stats={[
                            { label: 'Multi-Specialty', val: '42%' },
                            { label: 'General', val: '35%' },
                            { label: 'Specialty', val: '23%' },
                        ]}
                    />
                </div>
            ),
        },
        {
            id: 'realestate', icon: <Home size={40} />, title: 'Real Estate',
            accent: '#2563eb', iconBg: '#eff6ff',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=90&auto=format&fit=crop',
            painPoints: ['Large volume of unqualified leads', 'Slow follow-ups losing hot prospects', 'High cost per lead eating margins', 'Poor site-visit conversion rates'],
            solutions: ['Buyer-intent & location-based targeting', 'Automated site-visit scheduling & CRM workflows', 'Funnel-based lead qualification system', 'Hyperlocal ad systems for Indian cities'],
            metrics: [{ value: '3.1×', label: 'ROAS achieved', icon: <BarChart size={18} /> }, { value: '41%', label: 'Drop in cost per lead', icon: <TrendingDown size={18} /> }],
            dataWidget: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
                    <HorizontalBarWidget
                        title="Real Estate Boom — City-wise Growth (2020–2023)"
                        accentColor="#2563eb"
                        bars={[
                            { label: 'Chennai', value: '17%', pct: 55 },
                            { label: 'MMR', value: '17.67%', pct: 58 },
                            { label: 'Kolkata', value: '18.67%', pct: 61 },
                            { label: 'Pune', value: '22%', pct: 72 },
                            { label: 'Bangalore', value: '27.33%', pct: 89 },
                            { label: 'Hyderabad', value: '30.67%', pct: 100 },
                        ]}
                    />
                    <StatDonutWidget
                        title="Residential Market Share"
                        value={72}
                        subtitle="Tier-1 city demand leads"
                        accentColor="#2563eb"
                        stats={[
                            { label: 'Luxury Segment', val: '28%' },
                            { label: 'Mid-Income', val: '45%' },
                            { label: 'Affordable', val: '27%' },
                        ]}
                    />
                </div>
            ),
        },
        {
            id: 'education', icon: <GraduationCap size={40} />, title: 'Education & EdTech',
            accent: '#7c3aed', iconBg: '#faf5ff',
            image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=90&auto=format&fit=crop',
            painPoints: ['Low enrollment-to-lead conversion', 'Seasonal demand fluctuations', 'Poor lead quality from generic ads', 'High student drop-offs post-enrollment'],
            solutions: ['Enrollment-focused funnel design', 'AI-led student segmentation & targeting', 'Automated counseling & follow-up sequences', 'Long-term SEO & organic growth strategies'],
            metrics: [{ value: '2.7×', label: 'Enrollment growth', icon: <TrendingUp size={18} /> }, { value: '35%', label: 'CPL reduction', icon: <TrendingDown size={18} /> }],
            dataWidget: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
                    <BarChartWidget
                        title="India EdTech Market Size (US$B)"
                        source="Projected 2024–2030"
                        accentColor="#7c3aed"
                        bars={[
                            { label: '2021', height: 20 }, { label: '2022', height: 28 }, { label: '2023', height: 36 },
                            { label: '2024', height: 46 }, { label: '2025', height: 55 }, { label: '2026', height: 64 },
                            { label: '2027', height: 73 }, { label: '2030', height: 90, value: '$30B+', label2: 'Target' },
                        ]}
                    />
                    <CycleWidget
                        title="Digital Marketing in Education"
                        accentColor="#7c3aed"
                        steps={['Create Website', 'Use Social Media', 'Invest in SEO', 'Run Online Ads', 'Email Marketing', 'Analyze Results', 'Learn & Adapt']}
                    />
                </div>
            ),
        },
        {
            id: 'ecommerce', icon: <ShoppingBag size={40} />, title: 'E-commerce & D2C',
            accent: '#ea580c', iconBg: '#fff7ed',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=90&auto=format&fit=crop',
            painPoints: ['Rising customer acquisition cost (CAC)', 'Low repeat purchase rates', 'High cart abandonment', 'Difficulty scaling profitably'],
            solutions: ['ROAS-driven ad account structures', 'AI-based product & audience segmentation', 'Retention, remarketing & automation systems', 'Funnel-level CRO optimization'],
            metrics: [{ value: '5.2×', label: 'ROAS', icon: <BarChart size={18} /> }, { value: '2×', label: 'Repeat purchase rate', icon: <ShoppingBag size={18} /> }],
            dataWidget: (
                <div style={{ marginTop: 20 }}>
                    <BrandGridWidget
                        title="India's D2C Brand Ecosystem — Categories We Serve"
                        accentColor="#ea580c"
                        brands={[
                            'FMCG', 'Mamaearth', 'Wow Skin', 'Plum', 'Sugar Cosmetics',
                            'Fashion', 'Bewakoof', 'The Label Life', 'Wrogn',
                            'Home Decor', 'Pepperfry', 'Wakefit', 'Sunday', 'FabAlley',
                            'Electronics', 'boAt', 'Noise', 'Intex', 'Portronics',
                            'Food & Bev', 'Epigamia', 'Licious', 'Raw Pressery', 'Noto',
                        ]}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
                        <StatDonutWidget
                            title="D2C Market Growth"
                            value={68}
                            subtitle="Online channel share rising"
                            accentColor="#ea580c"
                            stats={[
                                { label: 'Repeat Buyers', val: '48%' },
                                { label: 'New Customers', val: '52%' },
                            ]}
                        />
                        <GrowthWidget
                            title="India D2C Market Size"
                            from="2022" to="2027"
                            fromVal="$12B" toVal="$60B"
                            accentColor="#ea580c"
                            icon="🚀"
                        />
                    </div>
                </div>
            ),
        },
        {
            id: 'itservices', icon: <Code2 size={40} />, title: 'IT Services & SaaS',
            accent: '#0891b2', iconBg: '#ecfeff',
            image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=90&auto=format&fit=crop',
            painPoints: ['Long B2B sales cycles', 'Low demo-to-close ratio', 'Poor attribution clarity', 'High cost per qualified lead'],
            solutions: ['B2B demand generation systems', 'AI-powered lead scoring & nurturing', 'LinkedIn & Google Ads optimization', 'Funnel-based demo conversion tracking'],
            metrics: [{ value: '3.6×', label: 'Increase in demo bookings', icon: <Calendar size={18} /> }, { value: '29%', label: 'CPL reduction', icon: <TrendingDown size={18} /> }],
            dataWidget: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
                    <BarChartWidget
                        title="India AI in Marketing Market (US$M)"
                        source="Grand View Research, 2018–2030"
                        accentColor="#0891b2"
                        bars={[
                            { label: '2018', height: 12 }, { label: '2020', height: 18 }, { label: '2022', height: 28 },
                            { label: '2023', height: 38, value: '$756M' }, { label: '2025', height: 54 },
                            { label: '2027', height: 68 }, { label: '2029', height: 80 },
                            { label: '2030', height: 90, value: '$4,378M', label2: '28.5% CAGR' },
                        ]}
                    />
                    <BrandGridWidget
                        title="India SaaS Companies We Help Scale"
                        accentColor="#0891b2"
                        brands={['Zepto', 'Amagi', 'Innovaccer', 'LeadSquared', 'Moengage',
                            'Druva', 'Freshworks', 'Chargebee', 'CleverTap', 'Uniphore',
                            'Observe.AI', 'Postman', 'BrowserStack']}
                    />
                </div>
            ),
        },
        {
            id: 'startups', icon: <Rocket size={40} />, title: 'Startups & Enterprises',
            accent: '#4f46e5', iconBg: '#eef2ff',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=90&auto=format&fit=crop',
            painPoints: ['Unclear growth roadmap & priorities', 'Budget inefficiencies across channels', 'Scaling challenges without system', 'Fragmented marketing efforts'],
            solutions: ['Go-to-market (GTM) strategy design', 'Full-funnel growth systems implementation', 'AI-powered analytics & reporting dashboards', 'Cross-channel performance optimization'],
            metrics: [{ value: '4×', label: 'Overall growth in 6 months', icon: <TrendingUp size={18} /> }, { value: 'End-to-end', label: 'AI growth system', icon: <Zap size={18} /> }],
            dataWidget: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 20 }}>
                    <GrowthWidget
                        title="DPIIT-Recognised Startups Growth"
                        from="2016" to="Dec 2024"
                        fromVal="502" toVal="1.57L"
                        accentColor="#4f46e5"
                        icon="🚀"
                    />
                    <BarChartWidget
                        title="India Data Analytics Market (US$M)"
                        source="Grand View Research, 2017–2030"
                        accentColor="#4f46e5"
                        bars={[
                            { label: '2017', height: 10 }, { label: '2019', height: 14 }, { label: '2021', height: 20 },
                            { label: '2022', height: 26, value: '$2,784M' }, { label: '2023', height: 34 },
                            { label: '2025', height: 48 }, { label: '2027', height: 63 }, { label: '2028', height: 72 },
                            { label: '2030', height: 90, value: '$21,288M', label2: 'Peak' },
                        ]}
                    />
                </div>
            ),
        },
    ];

    return (
        <div style={{ background: '#ffffff' }}>

            {/* ================================================================
                HERO — 100vh, sharp collage, full viewport
            ================================================================ */}
            <section ref={heroRef} style={{ position: 'relative', width: '100%', height: '100vh', minHeight: 640, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#0f172a' }}>

                {/* Collage */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(2,1fr)', gap: 3 }}>
                    {industries.map((ind, i) => (
                        <div key={i} className="collage-cell" style={{ backgroundImage: `url(${ind.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.48) saturate(0.75)' }} />
                    ))}
                </div>
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(180deg,rgba(15,23,42,0.48) 0%,rgba(15,23,42,0.76) 45%,rgba(15,23,42,0.97) 100%)' }} />
                <div style={{ position: 'absolute', top: '-8%', right: '-4%', width: 480, height: 480, borderRadius: '50%', background: 'rgba(59,130,246,0.16)', filter: 'blur(110px)', zIndex: 1, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-8%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(99,102,241,0.14)', filter: 'blur(100px)', zIndex: 1, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.15 }}><FloatingParticles theme="dark" /></div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100, padding: '0 24px', textAlign: 'center', color: '#fff' }}>
                    <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', fontSize: 11, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#93c5fd', marginBottom: 24 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#60a5fa', display: 'inline-block', animation: 'hpulse 1.5s infinite' }} />
                        Industries We Serve
                    </div>
                    <h1 className="hero-title" style={{ fontSize: 'clamp(2.4rem,6.5vw,5.2rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', color: '#fff' }}>
                        Industry-Specific <span style={{ color: '#60a5fa' }}>Growth.</span>
                        <br /><span style={{ color: '#a78bfa' }}>AI-Powered Results.</span>
                    </h1>
                    <p className="hero-sub" style={{ fontSize: 'clamp(0.95rem,2vw,1.2rem)', color: '#cbd5e1', maxWidth: 680, margin: '0 auto 22px', lineHeight: 1.7, fontWeight: 500 }}>
                        At <strong style={{ color: '#fff' }}>AI Growth Exa</strong>, we don't believe in one-size-fits-all marketing.
                        Every industry has different buyers, trust triggers, and decision cycles.
                    </p>
                    <div className="hero-box" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '14px 26px', maxWidth: 660, margin: '0 auto 26px', backdropFilter: 'blur(10px)' }}>
                        <p style={{ fontSize: '0.98rem', color: '#93c5fd', fontWeight: 600, margin: 0 }}>
                            That's why we design <strong style={{ color: '#fff' }}>industry-specific AI marketing systems</strong> — built for real Indian markets, real buyer behavior, and real growth challenges.
                        </p>
                    </div>
                    {/* Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
                        {industries.map(ind => (
                            <a key={ind.id} href={`#${ind.id}`} className="hero-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 13px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#f1f5f9', fontSize: 12, fontWeight: 700, textDecoration: 'none', backdropFilter: 'blur(6px)', transition: 'background 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                                <span style={{ color: ind.accent }}>{React.cloneElement(ind.icon, { size: 12 })}</span>
                                {ind.title}
                            </a>
                        ))}
                    </div>
                    {/* CTA */}
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/contact" state={{ background: location }} className="hero-btn"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', background: '#2563eb', color: '#fff', fontWeight: 800, fontSize: '0.98rem', borderRadius: 12, textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,99,235,0.4)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'scale(1)'; }}>
                            Customize Your Growth Plan <ArrowRight size={17} />
                        </Link>
                        <Link to="/contact" className="hero-btn"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 800, fontSize: '0.98rem', borderRadius: 12, border: '2px solid rgba(255,255,255,0.22)', textDecoration: 'none', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
                            Book a Strategy Call <Phone size={17} />
                        </Link>
                    </div>
                </div>
                {/* Scroll hint */}
                <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, opacity: 0.5 }}>
                    <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#94a3b8' }}>Scroll</span>
                    <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom,#94a3b8,transparent)' }} />
                </div>
                <style>{`@keyframes hpulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:0.5}}`}</style>
            </section>

            {/* ================================================================
                INDUSTRIES GRID
            ================================================================ */}
            <section ref={industriesRef} style={{ background: '#f8fafc', padding: '80px 0' }}>
                <div style={{ maxWidth: 1260, margin: '0 auto', padding: '0 24px' }}>

                    <div style={{ textAlign: 'center', marginBottom: 60 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 16px', borderRadius: 999, background: '#f1f5f9', color: '#0f172a', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid #e2e8f0', marginBottom: 14 }}>
                            <Building2 size={13} /> Our Expertise
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.7rem,3.5vw,2.8rem)', fontWeight: 900, color: '#0f172a', marginBottom: 12, lineHeight: 1.15 }}>
                            Solutions Built for <span style={{ color: '#2563eb' }}>Your Industry</span>
                        </h2>
                        <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', maxWidth: 520, margin: '0 auto' }}>
                            Each industry has unique challenges. We've built specialized solutions — backed by real market data.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                        {industries.map((industry, index) => (
                            <div key={industry.id} id={industry.id}
                                ref={el => cardRefs.current[index] = el}
                                style={{ background: '#ffffff', borderRadius: 24, border: '1.5px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', transition: 'box-shadow 0.3s,transform 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.1),0 0 0 2px ${industry.accent}`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                {/* Accent bar */}
                                <div style={{ height: 4, background: industry.accent }} />

                                <div style={{ padding: '28px 32px' }}>

                                    {/* ── Card header ── */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24, flexWrap: 'wrap' }}>
                                        <div style={{ width: 68, height: 68, borderRadius: 14, background: industry.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: industry.accent, flexShrink: 0, border: `1.5px solid ${industry.accent}22` }}>
                                            {industry.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: 'clamp(1.3rem,2.2vw,1.9rem)', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>{industry.title}</h3>
                                            <div style={{ height: 4, width: 48, borderRadius: 2, background: industry.accent }} />
                                        </div>
                                        {/* Thumbnail */}
                                        <div style={{ width: 170, height: 100, borderRadius: 12, overflow: 'hidden', border: `2px solid ${industry.accent}30`, flexShrink: 0 }}>
                                            <img src={industry.image} alt={industry.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                        </div>
                                    </div>

                                    {/* ── 3-col content ── */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 18 }}>

                                        {/* Pain Points */}
                                        <div style={{ background: '#fff5f5', border: '1.5px solid #fecaca', borderRadius: 14, padding: '20px 18px' }}>
                                            <h4 style={{ fontSize: 12, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                                                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#fee2e2', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626', fontWeight: 900, fontSize: 13, flexShrink: 0 }}>!</span>
                                                Industry Pain Points
                                            </h4>
                                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                                                {industry.painPoints.map((pt, i) => (
                                                    <li key={i} className="anim-item" style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                                                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', flexShrink: 0, marginTop: 6 }} />
                                                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', lineHeight: 1.5 }}>{pt}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Solutions */}
                                        <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '20px 18px' }}>
                                            <h4 style={{ fontSize: 12, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                                                <Zap size={15} style={{ flexShrink: 0, color: '#0f172a' }} /> Our AI-Driven Solutions
                                            </h4>
                                            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                                                {industry.solutions.map((sol, i) => (
                                                    <li key={i} className="anim-item" style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                                                        <CheckCircle size={15} style={{ color: industry.accent, flexShrink: 0, marginTop: 2 }} />
                                                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', lineHeight: 1.5 }}>{sol}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Case Snapshot */}
                                        <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: 14, padding: '20px 18px' }}>
                                            <h4 style={{ fontSize: 12, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
                                                <BarChart size={15} style={{ color: '#0f172a' }} /> Case Snapshot
                                            </h4>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                                {industry.metrics.map((metric, i) => (
                                                    <div key={i} className="anim-item" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: 11 }}>
                                                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', flexShrink: 0, border: '1px solid #e2e8f0' }}>
                                                            {metric.icon}
                                                        </div>
                                                        <div>
                                                            <div className="metric-val" style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{metric.value}</div>
                                                            <div style={{ fontSize: 11, fontWeight: 700, color: '#334155', marginTop: 2 }}>{metric.label}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── DATA WIDGET (market charts / infographics) ── */}
                                    <div style={{ borderTop: '1.5px dashed #e2e8f0', marginTop: 20, paddingTop: 4 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                                            <BarChart2 size={13} style={{ color: '#0f172a' }} />
                                            <span style={{ fontSize: 11, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                Market Data & Industry Insights
                                            </span>
                                        </div>
                                        {industry.dataWidget}
                                    </div>

                                    {/* CTA */}
                                    <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Link to="/contact" state={{ industry: industry.title, background: location }}
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: industry.accent, color: '#ffffff', fontWeight: 800, fontSize: 13, borderRadius: 10, textDecoration: 'none', boxShadow: `0 4px 14px ${industry.accent}44`, transition: 'all 0.2s' }}
                                            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = `0 8px 22px ${industry.accent}66`; }}
                                            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 4px 14px ${industry.accent}44`; }}>
                                            Get Industry-Specific Solutions <ChevronRight size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================================================================
                WHY INDUSTRY-SPECIFIC
            ================================================================ */}
            <section className="why-section" style={{ background: '#0f172a', padding: '72px 0', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none' }}><FloatingParticles theme="dark" /></div>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: '#93c5fd', fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.15)', marginBottom: 14 }}>
                            <Target size={13} /> Why It Matters
                        </span>
                        <h2 style={{ fontSize: 'clamp(1.7rem,3.5vw,2.7rem)', fontWeight: 900, color: '#ffffff' }}>
                            Why <span style={{ color: '#60a5fa' }}>Industry-Specific Growth</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 32, alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', lineHeight: 1.65 }}>
                                Generic marketing fails because buyers behave differently in every industry.
                            </p>
                            {['Study industry data deeply', 'Map real Indian buyer journeys', 'Build AI-led systems that fit the market'].map((item, i) => (
                                <div key={i} className="why-card" style={{ display: 'flex', gap: 11, alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '13px 17px', borderRadius: 11, border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <CheckCircle size={17} style={{ color: '#60a5fa', flexShrink: 0 }} />
                                    <span style={{ fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>{item}</span>
                                </div>
                            ))}
                            <p style={{ fontSize: 14, fontWeight: 800, color: '#93c5fd', fontStyle: 'italic', borderLeft: '3px solid #3b82f6', paddingLeft: 14 }}>
                                That's how we deliver predictable, scalable growth — not random wins.
                            </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                            {[{ label: 'Different Buyers', icon: <Users size={22} /> }, { label: 'Unique Trust Triggers', icon: <Shield size={22} /> }, { label: 'Specific Decision Cycles', icon: <Clock size={22} /> }, { label: 'Local Market Insights', icon: <Globe size={22} /> }].map((item, i) => (
                                <div key={i} className="why-card" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '22px 14px', textAlign: 'center', transition: 'background 0.2s', cursor: 'default' }}
                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.13)'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                                    <div style={{ color: '#60a5fa', marginBottom: 9, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                                    <div style={{ fontSize: 12, fontWeight: 800, color: '#f1f5f9' }}>{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================================
                FINAL CTA
            ================================================================ */}
            <section style={{ background: '#ffffff', padding: '72px 24px', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: '#f8fafc', opacity: 0.55, pointerEvents: 'none' }} />
                <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: 'clamp(1.7rem,3.5vw,3rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, marginBottom: 18 }}>
                        Your Industry Has <span style={{ color: '#2563eb' }}>Unique Challenges.</span>
                        <br />Your Growth Strategy Should Too.
                    </h2>
                    <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', maxWidth: 480, margin: '0 auto 40px' }}>
                        Let's build a custom AI-powered growth system designed for your industry and your market.
                    </p>
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
                        <Link to="/contact" state={{ background: location }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', background: '#2563eb', color: '#fff', fontWeight: 800, fontSize: '0.98rem', borderRadius: 12, textDecoration: 'none', boxShadow: '0 4px 18px rgba(37,99,235,0.32)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#1d4ed8'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'scale(1)'; }}>
                            <Settings size={17} /> Customize Your Growth Plan <ArrowRight size={17} />
                        </Link>
                        <Link to="/contact"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 30px', background: '#0f172a', color: '#fff', fontWeight: 800, fontSize: '0.98rem', borderRadius: 12, textDecoration: 'none', transition: 'all 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#1e293b'}
                            onMouseLeave={e => e.currentTarget.style.background = '#0f172a'}>
                            <Calendar size={17} /> Book a Strategy Call
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 9 }}>
                        {['AI-Powered', 'Data-Driven', 'Industry-Specific', 'Indian Markets', 'Scalable Growth'].map((badge, i) => (
                            <span key={i} style={{ padding: '7px 17px', background: '#f1f5f9', borderRadius: 999, fontSize: 12, fontWeight: 800, color: '#0f172a', border: '1.5px solid #e2e8f0' }}>{badge}</span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Industries;
