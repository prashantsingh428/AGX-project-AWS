const Contact = require("../models/Contact");

const submitContact = async (req, res) => {
    try {
        const { name, email, service, message } = req.body;

        if (!name || !email || !service || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newContact = new Contact({
            name,
            email,
            service,
            message
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
