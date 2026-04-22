const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const { OAuth2Client } = require('google-auth-library');

const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const exists = await User.findOne({ email: email.toString().toLowerCase() });
        if (exists) return res.status(400).json({ message: "Admin exists" });

        await User.create({
            name,
            email: email.toString().toLowerCase(),
            password: await bcrypt.hash(password.toString(), 10),
            role: "admin",
            isVerified: true
        });

        res.json({ message: "Admin created" });
    } catch (error) {
        console.error("Create Admin Error:", error);
        res.status(500).json({ message: "Failed to create admin", error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (await User.findOne({ email }))
            return res.status(400).json({ message: "User exists" });

        const otp = generateOTP();

        await User.create({
            name,
            email,
            password: await bcrypt.hash(password.toString(), 10),
            otp,
            otpExpiry: Date.now() + 10 * 60 * 1000
        });

        await sendEmail(email, "Verify OTP", `Your OTP is ${otp}`);
        res.json({ message: "OTP sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const user = await User.findOne({ email: email.toString().toLowerCase() });
        if (!user || user.otp !== otp.toString() || user.otpExpiry < Date.now())
            return res.status(400).json({ message: "Invalid OTP" });

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: "Email verified" });
    } catch (error) {
        console.error("Verify Email Error:", error);
        res.status(500).json({ message: "Verification failed", error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toString().toLowerCase() });
        if (!user) return res.status(400).json({ message: "Invalid login" });

        if (!user.isVerified)
            return res.status(403).json({ message: "Verify email first" });

        if (!user.password) {
            return res.status(400).json({ message: "Login with Google or reset password" });
        }

        const isMatch = await bcrypt.compare(
            password.toString(),
            user.password.toString()
        );

        if (!isMatch)
            return res.status(400).json({ message: "Invalid login" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendEmail(email, "Reset Password OTP", `OTP: ${otp}`);
        res.json({ message: "OTP sent" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpiry < Date.now())
            return res.status(400).json({ message: "Invalid OTP" });

        user.password = await bcrypt.hash(newPassword.toString(), 10);
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { name, email, sub: googleId, picture } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (user) {
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        } else {
            user = new User({
                name,
                email,
                googleId,
                role: 'user',
                isVerified: true
            });
            await user.save();
        }

        const jwtToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            success: true,
            token: jwtToken,
            role: user.role,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: "Google Login failed", error: error.message });
    }
};
