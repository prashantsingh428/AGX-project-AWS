const mongoose = require("mongoose");

const serviceInquirySchema = new mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
        },
        companyName: String,
        budget: String,
        goals: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("ServiceInquiry", serviceInquirySchema);
