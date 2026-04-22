const Career = require("../models/Career");

/* SUBMIT APPLICATION */
exports.submitCareer = async (req, res) => {
    try {
        const career = await Career.create({
            ...req.body,
            resume: req.file?.filename
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
