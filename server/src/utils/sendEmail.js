const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("⚠️ Email credentials not fully configured. Logging email instead:");
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Content: ${text}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: `"Auth System" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Email sending failed. Logging to console instead:", error.message);
        console.log("=========================================");
        console.log(`MOCK EMAIL SENT TO: ${to}`);
        console.log(`SUBJECT: ${subject}`);
        console.log(`MESSAGE: ${text}`);
        console.log("=========================================");
    }
};

module.exports = sendEmail;
