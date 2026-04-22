
const Blog = require("../models/Blog");

// CREATE BLOG
exports.createBlog = async (req, res) => {
    try {
        const imagePath = req.file
            ? `/uploads/blogs/${req.file.filename}`
            : "";

        const blog = await Blog.create({
            title: req.body.title,
            slug: req.body.slug,
            content: req.body.content,
            author: req.body.author,
            tags: req.body.tags,
            image: imagePath,
            published: req.body.published
        });

        res.status(201).json({
            success: true,
            data: blog
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        console.error("Get All Blogs Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch blogs", error: error.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json(blog);
    } catch (error) {
        console.error("Get Blog By ID Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch blog", error: error.message });
    }
};

// UPDATE BLOG
exports.updateBlog = async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (req.file) {
            updateData.image = `/uploads/blogs/${req.file.filename}`;
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Delete Blog Error:", error);
        res.status(500).json({ success: false, message: "Failed to delete blog", error: error.message });
    }
};

