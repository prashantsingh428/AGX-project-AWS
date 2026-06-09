const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

const {
    createAdmin,
    register,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword,
    googleLogin,
    getMe,
    getMyActivity
} = require("../controllers/authController");

router.post("/create-admin", createAdmin);
router.post("/register", register);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/google", googleLogin);
router.get("/me", protect, getMe);
router.get("/my-activity", protect, getMyActivity);

module.exports = router;
