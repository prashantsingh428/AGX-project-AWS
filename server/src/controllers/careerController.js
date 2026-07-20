const Career = require("../models/Career");
const { uploadToCloudinary } = require("../utils/cloudinaryUtils");

/* SUBMIT APPLICATION */
exports.submitCareer = async (req, res) => {
    try {
        let resumeUrl = "";
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, "resumes", "raw");
            resumeUrl = result.secure_url;
        }

        const career = await Career.create({
            ...req.body,
            resume: resumeUrl
        });

        res.status(201).json({
            success: true,
            message: "Application submitted",
            career
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* GET ALL APPLICATIONS */
exports.getCareers = async (req, res) => {
    try {
        const data = await Career.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
