const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
const { seedServices } = require("./utils/seeder");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const PORT = process.env.PORT || 5011;
const MONGO_URI = process.env.MONGO_URI;

const startServer = (port) => {
    const server = app.listen(port, "0.0.0.0", () => {
        console.log(`🚀 Server running on port ${port}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });

    server.on("error", (err) => {
        if (err.code === "EADDRINUSE" && process.env.NODE_ENV !== "production") {
            console.log(`⚠️  Port ${port} is busy, trying ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error("❌ Server error:", err);
            process.exit(1);
        }
    });
};

mongoose
    .connect(MONGO_URI)
    .then(async () => {
        console.log("✅ MongoDB Connected");
        await seedServices();
        startServer(Number(PORT));
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1);
    });


