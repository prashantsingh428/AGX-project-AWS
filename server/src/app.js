const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const blogRoutes = require("./routes/blogRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const careerRoutes = require("./routes/careerRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const connectRoutes = require("./routes/connectRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const serviceRoutes = require("./routes/pageRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use("/uploads", express.static("uploads"));

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api", connectRoutes);
app.use("/api", subscriberRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Ai Growth Exa API", status: "Running" });
});


if (process.env.NODE_ENV === "production") {
    const distPath = path.resolve(__dirname, "../../client/dist");

    app.use(express.static(distPath));

    app.use((req, res, next) => {
        if (!req.path.startsWith("/api")) {
            res.sendFile(path.join(distPath, "index.html"), (err) => {
                if (err) {
                    console.error("Index.html send error:", err);
                    res.status(500).json({ 
                        success: false, 
                        message: "Failed to load client application. Please ensure the build directory exists.",
                        error: err.message 
                    });
                }
            });
        } else {
            next();
        }
    });
}


app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR HANDLER 👉", err);
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? null : err.stack
    });
});

module.exports = app;
