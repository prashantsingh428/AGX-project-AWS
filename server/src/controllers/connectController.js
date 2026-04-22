const Connect = require("../models/Connect");
const sendEmail = require("../utils/sendEmail");

exports.createConnect = async (req, res) => {
    try {
        const { name, email, phone, company, message } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and Email are required"
            });
        }

        const connect = await Connect.create({
            name,
            email,
            phone,
            company,
            message
        });

        // Send confirmation email
        await sendEmail(email, "Thanks for contacting Ai Growth Exa", `Hi ${name},\n\nWe received your message: "${message}".\n\nWe'll get back to you soon!\n\nBest,\nAi Growth Exa Team`).catch(err => console.error("Connect Email Failed:", err));

        // Optionally send admin notification
        // await sendEmail(process.env.EMAIL_USER, "New Connect Inquiry", `Name: ${name}\nEmail: ${email}\nMessage: ${message}`).catch(err => console.error("Admin Email Failed:", err));

        res.status(201).json({
            success: true,
            message: "Thanks for connecting with us!",
            data: connect
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
