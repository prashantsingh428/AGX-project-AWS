const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String, required: false },
    googleId: { type: String, unique: true, sparse: true },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    otp: String,
    otpExpiry: Date
});

module.exports = mongoose.model("User", userSchema);
