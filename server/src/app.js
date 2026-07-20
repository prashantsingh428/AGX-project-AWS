const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

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
const adminRoutes = require("./routes/adminRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use("/uploads", express.static("uploads"));

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:5174"
].filter(Boolean);

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || origin === "null" || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS: ${origin}`));
        }
    },
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
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Ai Growth Exa API", status: "Running" });
});

app.get("/api/health", async (req, res) => {
    try {
        const isDbConnected = mongoose.connection && mongoose.connection.readyState === 1;
        const dbStatus = isDbConnected ? "UP" : "DOWN";

        const healthStatus = {
            status: isDbConnected ? "UP" : "DEGRADED",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            services: {
                database: dbStatus,
                server: "UP"
            },
            system: {
                memoryUsage: process.memoryUsage(),
                cpuUsage: process.cpuUsage()
            }
        };

        if (!isDbConnected) {
            return res.status(503).json(healthStatus);
        }
        res.json(healthStatus);
    } catch (error) {
        res.status(500).json({ status: "DOWN", error: error.message });
    }
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
