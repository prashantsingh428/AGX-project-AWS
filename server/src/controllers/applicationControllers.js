const Application = require("../models/Application");

exports.applyForJob = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(400).json({ message: "Resume required" });
        }

        const application = new Application({
            ...req.body,
            resume: req.file.filename,
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
