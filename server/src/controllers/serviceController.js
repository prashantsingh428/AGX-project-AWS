const ServiceInquiry = require("../models/ServiceInquiry");
const Service = require("../models/Service");
const Blog = require("../models/Blog");
const Career = require("../models/Career");

exports.submitServiceInquiry = async (req, res) => {
    try {
        const {
            serviceName,
            fullName,
            email,
            phone,
            companyName,
            budget,
            goals,
        } = req.body;

        if (!serviceName || !fullName || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }

        const inquiry = await ServiceInquiry.create({
            serviceName,
            fullName,
            email,
            phone,
            companyName,
            budget,
            goals,
        });

        res.status(201).json({
            success: true,
            message: "Service inquiry submitted successfully",
            data: inquiry,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ id: 1 });
        res.json({ success: true, data: services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Static list of pages/sections in the web app
const staticPages = [
    {
        title: "AI Solutions & Infrastructure",
        category: "PAGE",
        url: "/aisolution",
        keywords: ["ai solution", "infrastructure", "intelligent agents", "custom agents", "llm", "machine learning", "predictive"]
    },
    {
        title: "About Us - Architects of Intelligence",
        category: "PAGE",
        url: "/about",
        keywords: ["about us", "who we are", "team", "mission", "vision", "global impact", "our story"]
    },
    {
        title: "Founder Profile - Prashant Singh",
        category: "PAGE",
        url: "/founder",
        keywords: ["founder", "ceo", "leadership", "prashant singh", "visionary"]
    },
    {
        title: "Awards & Google Certifications",
        category: "PAGE",
        url: "/awards",
        keywords: ["awards", "certifications", "google ads search", "expert", "credentials"]
    },
    {
        title: "Case Studies & Client Portfolios",
        category: "PAGE",
        url: "/case-studies",
        keywords: ["case studies", "portfolio", "clients", "success stories", "marketing outcomes", "roi results"]
    },
    {
        title: "Industries We Serve (Healthcare, Finance, E-commerce)",
        category: "PAGE",
        url: "/industries",
        keywords: ["industries", "healthcare", "finance", "retail", "manufacturing", "e-commerce", "business sectors"]
    },
    {
        title: "Careers - Join the Future of AI",
        category: "PAGE",
        url: "/careers",
        keywords: ["careers", "jobs", "hiring", "openings", "join team", "work culture"]
    },
    {
        title: "Contact Us & Book Free Strategy Call",
        category: "PAGE",
        url: "/contact",
        keywords: ["contact", "support", "help", "strategy call", "free consultation", "email", "phone"]
    }
];

exports.searchServices = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.json({ success: true, data: [] });
        }

        const regex = new RegExp(q, "i");

        // 1. Search Services
        const services = await Service.find({
            $or: [
                { title: regex },
                { category: regex },
                { shortDesc: regex }
            ]
        }).sort({ id: 1 });

        const formattedServices = services.map(s => ({
            id: s._id,
            title: s.title,
            category: s.category || "SERVICE",
            url: `/services?q=${encodeURIComponent(s.title)}`
        }));

        // 2. Search Blogs
        const blogs = await Blog.find({
            $or: [
                { title: regex },
                { content: regex },
                { tags: regex }
            ]
        }).sort({ createdAt: -1 });

        const formattedBlogs = blogs.map(b => ({
            id: b._id,
            title: b.title,
            category: "BLOG",
            url: `/blog/${b._id}`
        }));

        // 3. Search Careers
        const careers = await Career.find({
            $or: [
                { title: regex },
                { department: regex },
                { description: regex }
            ]
        }).sort({ createdAt: -1 });

        const formattedCareers = careers.map(c => ({
            id: c._id,
            title: `${c.title} (${c.location})`,
            category: `CAREER - ${c.department.toUpperCase()}`,
            url: `/careers`
        }));

        // 4. Search Static Pages/Sections
        const matchedPages = staticPages.filter(p => 
            p.title.toLowerCase().includes(q.toLowerCase()) ||
            p.keywords.some(k => k.toLowerCase().includes(q.toLowerCase()))
        );

        const formattedPages = matchedPages.map(p => ({
            id: p.url,
            title: p.title,
            category: p.category,
            url: p.url
        }));

        // Combine all results
        const allResults = [
            ...formattedServices,
            ...formattedPages,
            ...formattedBlogs,
            ...formattedCareers
        ];

        res.json({ success: true, data: allResults });
    } catch (error) {
        console.error("Global search query error:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
