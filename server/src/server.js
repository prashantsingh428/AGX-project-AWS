const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
const { seedServices } = require("./utils/seeder");

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

const PORT = process.env.PORT || 5011;
const MONGO_URI = process.env.MONGO_URI;

let serverInstance;

const startServer = (port) => {
    serverInstance = app.listen(port, "0.0.0.0", () => {
        console.log(`🚀 Server running on port ${port}`);
        console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });

    serverInstance.on("error", (err) => {
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

// Graceful Shutdown Handler
const gracefulShutdown = (signal) => {
    console.log(`\n⚠️  ${signal} received. Starting graceful shutdown...`);

    if (serverInstance) {
        serverInstance.close(() => {
            console.log("🛑 HTTP server closed.");

            mongoose.connection.close(false)
                .then(() => {
                    console.log("💾 MongoDB connection closed.");
                    process.exit(0);
                })
                .catch((err) => {
                    console.error("❌ Error during MongoDB disconnection:", err);
                    process.exit(1);
                });
        });

        // Set safety timeout to force termination if active connections drag on
        setTimeout(() => {
            console.error("⚠️ Forcefully shutting down because graceful shutdown took too long.");
            process.exit(1);
        }, 10000);
    } else {
        process.exit(0);
    }
};

// Listen for system signals
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));



