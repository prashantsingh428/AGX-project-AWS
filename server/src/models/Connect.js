const mongoose = require("mongoose");

const connectSchema = new mongoose.Schema(
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
        phone: {
            type: String,
            trim: true
        },
        company: {
            type: String,
            trim: true
        },
        message: {
            type: String,
            trim: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Connect", connectSchema);
