const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        service: {
            type: String,
            required: true,
            trim: true
        },
        jobTitle: {
            type: String,
            trim: true
        },
        organization: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        },
        message: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
