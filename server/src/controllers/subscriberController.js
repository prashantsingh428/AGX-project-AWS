const Subscriber = require("../models/Subscriber");

exports.subscribeEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const alreadySubscribed = await Subscriber.findOne({ email });
        if (alreadySubscribed) {
            return res.status(409).json({ message: "Email already subscribed" });
        }

        await Subscriber.create({ email });

        res.status(201).json({
            success: true,
            message: "Subscribed successfully 🎉",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
