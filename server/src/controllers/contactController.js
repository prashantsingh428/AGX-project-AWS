const Contact = require("../models/Contact");

const submitContact = async (req, res) => {
    try {
        const {
            name,
            email,
            service,
            message,
            jobTitle,
            organization,
            phone,
            country
        } = req.body;

        const resolvedService = service || jobTitle || "General Inquiry";

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Name, email, and message are required" });
        }

        const newContact = new Contact({
            name,
            email,
            service: resolvedService,
            message,
            jobTitle,
            organization,
            phone,
            country
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Contact form submitted successfully",
            data: newContact
        });
    } catch (error) {
        console.error("Error in submitContact:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit contact form",
            error: error.message
        });
    }
};

module.exports = {
    submitContact
};
