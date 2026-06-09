const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Models
const User = require("../models/User");
const Lead = require("../models/Lead");
const Application = require("../models/Application");
const Contact = require("../models/Contact");
const Blog = require("../models/Blog");
const Subscriber = require("../models/Subscriber");

// Apply protection to all admin routes
router.use(protect, adminOnly);

// 1. Stats route
router.get("/stats", async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const leadsCount = await Lead.countDocuments();
        const applicationsCount = await Application.countDocuments();
        const contactsCount = await Contact.countDocuments();
        const blogsCount = await Blog.countDocuments();
        const subscribersCount = await Subscriber.countDocuments();

        res.json({
            success: true,
            data: {
                users: usersCount,
                leads: leadsCount,
                applications: applicationsCount,
                contacts: contactsCount,
                blogs: blogsCount,
                subscribers: subscribersCount
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 2. Users route
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. Leads (strategy calls) routes
router.get("/leads", async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json({ success: true, data: leads });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete("/leads/:id", async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Lead deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 4. Applications routes
router.get("/applications", async (req, res) => {
    try {
        const apps = await Application.find().sort({ createdAt: -1 });
        res.json({ success: true, data: apps });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete("/applications/:id", async (req, res) => {
    try {
        await Application.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Application deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 5. Contacts routes
router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete("/contacts/:id", async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Contact inquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 6. Subscribers routes
router.get("/subscribers", async (req, res) => {
    try {
        const subs = await Subscriber.find().sort({ createdAt: -1 });
        res.json({ success: true, data: subs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.delete("/subscribers/:id", async (req, res) => {
    try {
        await Subscriber.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Subscriber deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
