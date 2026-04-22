const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
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
        console.error("Email sending failed:", error);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;
