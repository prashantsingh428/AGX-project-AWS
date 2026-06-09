const mongoose = require('mongoose');
const Service = require('../models/Service');
const Blog = require('../models/Blog');
const Career = require('../models/Career');

const defaultServices = [
    {
        id: 1,
        title: "AI Marketing Solutions",
        tagline: "Predict customer behavior and automate decisions",
        category: "AI-POWERED MARKETING",
        shortDesc: "Predict customer behavior and automate decisions with LLM-powered growth frameworks.",
        features: ["LLM Growth Frameworks", "Customer Behavior Prediction", "Automated Decisions"],
        benefits: ["Higher ROI", "Automated operations", "Predictive insights"],
        iconName: "Zap"
    },
    {
        id: 2,
        title: "Performance Marketing",
        tagline: "ROI-driven campaign optimization",
        category: "PAID ADVERTISING",
        shortDesc: "ROI-driven campaigns across Google, Meta, and LinkedIn optimized by AI models.",
        features: ["Google Ads Optimization", "Meta Campaigns", "LinkedIn Ads Scaling"],
        benefits: ["Increased click-through rate", "Reduced acquisition cost", "Maximized conversions"],
        iconName: "TrendingUp"
    },
    {
        id: 3,
        title: "SEO & Growth Strategy",
        tagline: "Build sustainable traffic ecosystems",
        category: "SEO & GROWTH",
        shortDesc: "Build search ecosystems that align visibility with business goals for sustainable traffic.",
        features: ["On-page & Off-page SEO", "Growth Strategy Consulting", "Competitor Keyword Mapping"],
        benefits: ["Sustainable search visibility", "High search intent traffic", "Long-term brand authority"],
        iconName: "Target"
    },
    {
        id: 4,
        title: "Podcast & Social Media",
        tagline: "Build brand authority at scale",
        category: "CONTENT MARKETING",
        shortDesc: "Build authority and trust at scale through audio and high-impact social content.",
        features: ["Audio Production", "Social Channel Strategy", "Authority Branding"],
        benefits: ["Brand recall", "Audience engagement", "Omnichannel presence"],
        iconName: "Users"
    },
    {
        id: 5,
        title: "GMB Local Growth",
        tagline: "Dominate local maps and search",
        category: "LOCAL SEO",
        shortDesc: "Dominate local search and maps with AI-powered visibility and review systems.",
        features: ["Google My Business Optimization", "AI Review Systems", "Local Citation Building"],
        benefits: ["Higher foot traffic", "Improved local map ranking", "Increased customer calls"],
        iconName: "ShieldCheck"
    },
    {
        id: 6,
        title: "Funnel & Automation",
        tagline: "Turn traffic into revenue automatically",
        category: "AUTOMATION",
        shortDesc: "Turn traffic into revenue automatically with high-converting lead nurture systems.",
        features: ["Lead Nurture Systems", "Automated Sequences", "Sales Funnel Design"],
        benefits: ["Higher conversion rate", "Hands-off lead management", "Streamlined customer journey"],
        iconName: "Settings"
    },
    {
        id: 7,
        title: "Branding & Creative",
        tagline: "Cohesive visual identity systems",
        category: "BRANDING",
        shortDesc: "Cohesive visual identity systems that build recall and drive consistent conversions.",
        features: ["Logo Design", "Style Guides", "Creative Collateral"],
        benefits: ["Distinct brand recall", "Trust signals", "Consistent marketing assets"],
        iconName: "Briefcase"
    },
    {
        id: 8,
        title: "Web & App Development",
        tagline: "High performance digital products",
        category: "DEVELOPMENT",
        shortDesc: "High-performance digital products built for speed, UX, and conversion optimization.",
        features: ["Full Stack Web apps", "UX Research", "Performance Optimization"],
        benefits: ["Sub-second load speeds", "Mobile responsive design", "Higher conversion focus"],
        iconName: "BarChart3"
    },
    {
        id: 9,
        title: "Content Strategy",
        tagline: "Emotion-driven SEO ranking content",
        category: "CONTENT",
        shortDesc: "Human-written, emotion-driven content that builds trust and ranks naturally.",
        features: ["Copywriting", "SEO Blog Architecture", "Editorial Calendar Management"],
        benefits: ["High semantic search rankings", "Audience resonance", "Informational keyword dominance"],
        iconName: "Award"
    }
];

const defaultBlogs = [
    {
        title: "The Future of Generative AI in Digital Marketing",
        slug: "future-generative-ai-digital-marketing",
        content: "Generative AI is transforming digital marketing by automating content creation, personalization, and customer journey mapping at scale. Advanced marketing engines now integrate large language models to construct high-resonance messaging dynamically. Brands leveraging AI-first infrastructure report double digit percentage growth in engagement.",
        author: "Prashant Singh",
        tags: ["AI", "Generative AI", "Marketing", "Technology"],
        image: ""
    },
    {
        title: "How to Build a High-Performance AI-Powered Funnel",
        slug: "build-ai-powered-sales-funnel",
        content: "An AI-powered sales funnel automatically qualifies, scores, and nurtures leads using advanced predictive models. By analyzing behavioral triggers in real-time, the system routes high-intent prospects directly to sales teams while running hyper-personalized nurture sequences for others. This significantly reduces customer acquisition costs.",
        author: "Prashant Singh",
        tags: ["AI", "Funnel", "Automation", "Sales"],
        image: ""
    },
    {
        title: "SEO Growth in the Age of Search Generative Experience (SGE)",
        slug: "seo-growth-sge-search-experience",
        content: "Search engines are shifting towards SGE (Search Generative Experience). Learn how to adapt your content architecture to rank in AI-generated search summaries. Modern SEO is no longer just about keywords, it is about semantic structure, authority, and answers that align with AI-synthesized models.",
        author: "Prashant Singh",
        tags: ["SEO", "SGE", "Search", "AI"],
        image: ""
    }
];

const defaultCareers = [
    {
        title: "Senior AI Engineer",
        department: "Technology",
        location: "Remote",
        type: "Full-time",
        description: "We are looking for a Senior AI Engineer to design, train, and deploy advanced custom LLMs and intelligent workflow agents. You will work closely with lead architects to build scalable, robust growth infrastructure for global enterprises.",
        requirements: ["3+ years experience with PyTorch/TensorFlow", "Experience building agents with LangChain/LlamaIndex", "Strong Node.js/Python coding skills"]
    },
    {
        title: "Performance Marketing Specialist",
        department: "Marketing",
        location: "Hybrid",
        type: "Full-time",
        description: "Join us as a Performance Marketing Specialist to manage multi-million dollar ad spend optimized by predictive AI bidding algorithms across Google Search, Meta, and LinkedIn.",
        requirements: ["Google Ads certification", "Experience with Meta Ads Manager", "Analytical mindset and data interpretation skills"]
    },
    {
        title: "AI UX Designer",
        department: "Creative",
        location: "Remote",
        type: "Contract",
        description: "Looking for a creative UI/UX designer specialized in design systems for conversational agents, AI chat layouts, and clean dashboards. Help us shape how enterprise users interact with generative AI platforms.",
        requirements: ["Figma expertise", "Portfolio showing interactive UI systems", "Understanding of human-AI interaction principles"]
    }
];

const seedServices = async () => {
    try {
        // 1. Seed Services
        const serviceCount = await Service.countDocuments();
        if (serviceCount === 0) {
            console.log("🌱 Database: No services found. Seeding default services...");
            await Service.insertMany(defaultServices);
            console.log("✅ Database: Default services seeded successfully.");
        } else {
            console.log(`ℹ️ Database: Services collection already has ${serviceCount} records. Seeding skipped.`);
        }

        // 2. Seed Blogs
        const blogCount = await Blog.countDocuments();
        if (blogCount === 0) {
            console.log("🌱 Database: No blogs found. Seeding default blogs...");
            await Blog.insertMany(defaultBlogs);
            console.log("✅ Database: Default blogs seeded successfully.");
        } else {
            console.log(`ℹ️ Database: Blogs collection already has ${blogCount} records. Seeding skipped.`);
        }

        // 3. Seed Careers
        const careerCount = await Career.countDocuments();
        if (careerCount === 0) {
            console.log("🌱 Database: No careers found. Seeding default careers...");
            await Career.insertMany(defaultCareers);
            console.log("✅ Database: Default careers seeded successfully.");
        } else {
            console.log(`ℹ️ Database: Careers collection already has ${careerCount} records. Seeding skipped.`);
        }

    } catch (error) {
        console.error("❌ Database: Seeding services/blogs/careers failed:", error);
    }
};

module.exports = { seedServices };
