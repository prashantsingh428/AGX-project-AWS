import React from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';

const CAREER_CONTENT = {
    overview: {
        title: 'Careers Overview',
        summary: 'Discover our mission, culture, and how we build meaningful careers at AI Growth Exa.'
    },
    'open-roles': {
        title: 'Open Roles',
        summary: 'Explore active opportunities across growth, creative, technology, and business functions.'
    },
    'featured-roles': {
        title: 'Featured Roles',
        summary: 'Priority roles where we are actively hiring to support current growth initiatives.'
    },
    'departments-marketing': {
        title: 'Department: Marketing',
        summary: 'Performance marketing, content strategy, and campaign optimization roles.'
    },
    'departments-technology': {
        title: 'Department: Technology',
        summary: 'Engineering, automation, and data platform roles powering our AI-first delivery.'
    },
    'departments-creative': {
        title: 'Department: Creative',
        summary: 'Brand, design, and storytelling roles shaping premium client experiences.'
    },
    'departments-business': {
        title: 'Department: Business',
        summary: 'Client strategy, operations, and growth enablement roles for business outcomes.'
    },
    'life-at-exa': {
        title: 'Life at AI Growth Exa',
        summary: 'A collaborative, high-ownership environment focused on learning and impact.'
    },
    'growth-learning': {
        title: 'Growth & Learning',
        summary: 'Structured mentorship, practical upskilling, and clear pathways for progression.'
    },
    'what-you-work-on': {
        title: 'What You Will Work On',
        summary: 'Real client challenges, cross-functional execution, and measurable outcomes.'
    },
    'hiring-process': {
        title: 'Hiring Process',
        summary: 'A transparent process from screening to final conversations and offer.'
    },
    apply: {
        title: 'Apply Now',
        summary: 'Share your profile with us and we will connect if there is a strong fit.'
    }
};

const CareerDetailPage = () => {
    const { slug } = useParams();
    const location = useLocation();
    const content = CAREER_CONTENT[slug];

    if (!content) {
        return <Navigate to="/careers" replace />;
    }

    return (
        <section className="min-h-screen bg-slate-50 pt-28 pb-20 px-6 sm:px-10 lg:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-8 sm:p-12">
                    <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Careers</p>
                    <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">{content.title}</h1>
                    <p className="mt-4 text-lg leading-relaxed text-slate-600">{content.summary}</p>

                    <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                        <h2 className="text-lg font-semibold text-slate-900">Professional Pathway</h2>
                        <p className="mt-2 text-slate-600">
                            Every role is mapped with clear outcomes, mentorship support, and measurable performance expectations. We value ownership, communication, and continuous improvement.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link
                            to="/contact"
                            state={{ background: location }}
                            className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
                        >
                            Talk to Hiring Team
                        </Link>
                        <Link
                            to="/careers"
                            className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
                        >
                            Back to Careers
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerDetailPage;
