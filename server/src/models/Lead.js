const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Full name is required"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true
        },
        company: {
            type: String,
            trim: true

        },

        industry: {
            type: String,
            enum: [
                "E-commerce",
                "SaaS / Technology",
                "Healthcare",
                "Finance",
                "Real Estate",
                "Education",
                "Retail",
                "Consulting",
                "Other"
            ]
        },

        services: {
            type: String,
            required: [true, "Service selection is required"],
            trim: true
        },

        budget: {
            type: String,
            enum: [
                "Less than $5,000",
                "$5,000 - $10,000",
                "$10,000 - $25,000",
                "$25,000 - $50,000",
                "$50,000+"
            ]
        },

        message: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
