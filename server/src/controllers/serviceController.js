const ServiceInquiry = require("../models/ServiceInquiry");
const Service = require("../models/Service");

exports.submitServiceInquiry = async (req, res) => {
    try {
        const {
            serviceName,
            fullName,
            email,
            phone,
            companyName,
            budget,
            goals,
        } = req.body;

        if (!serviceName || !fullName || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }

        const inquiry = await ServiceInquiry.create({
            serviceName,
            fullName,
            email,
            phone,
            companyName,
            budget,
            goals,
        });

        res.status(201).json({
            success: true,
            message: "Service inquiry submitted successfully",
            data: inquiry,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ id: 1 });
        res.json({ success: true, data: services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

exports.searchServices = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.json({ success: true, data: [] });
        }

        const services = await Service.find(
            { $text: { $search: q } },
            { score: { $meta: "textScore" } }
        ).sort({ score: { $meta: "textScore" } });

        res.json({ success: true, data: services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
