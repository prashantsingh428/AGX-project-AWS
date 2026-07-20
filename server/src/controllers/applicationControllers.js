const Application = require("../models/Application");
const { uploadToCloudinary } = require("../utils/cloudinaryUtils");

exports.applyForJob = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: "Resume required" });
        }

        // Upload PDF/DOCX to Cloudinary as a "raw" file
        const result = await uploadToCloudinary(req.file.buffer, "resumes", "raw");

        const application = new Application({
            ...req.body,
            resume: result.secure_url,
        });

        await application.save();

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
