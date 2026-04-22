const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            company,
            industry,
            services,
            budget,
            message
        } = req.body;

        // basic validation
        if (!name || !phone || !email) {
            return res.status(400).json({
                success: false,
                message: "Name, phone and email are required"
            });
        }

        const lead = await Lead.create({
            name,
            phone,
            email,
            company,
            industry,
            services,
            budget,
            message
        });

        res.status(201).json({
            success: true,
            message: "Lead submitted successfully 🚀",
            data: lead
        });

    } catch (error) {
        console.error("CREATE LEAD ERROR 👉", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
