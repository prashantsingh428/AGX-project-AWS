const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const sendEmail = async (to, subject, text) => {
    // 1. Try Resend if API key is provided
    if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        try {
            const sender = process.env.EMAIL_FROM || "onboarding@resend.dev";
            const response = await resend.emails.send({
                from: sender,
                to,
                subject,
                text,
                html: `<p>${text.replace(/\n/g, "<br>")}</p>`
            });
            if (response && response.error) {
                throw new Error(response.error.message);
            }
            console.log(`[EMAIL] Sent successfully via Resend to ${to}`);
            return;
        } catch (error) {
            console.error("❌ [EMAIL] Resend sending failed:", error.message);
        }
    }

    // 2. Try Nodemailer Gmail SMTP if credentials are provided
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
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
            console.log(`[EMAIL] Sent successfully via Gmail to ${to}`);
            return;
        } catch (error) {
            console.error("❌ [EMAIL] Gmail sending failed:", error.message);
        }
    }

    // 3. Fallback to console logger if no credentials worked or are configured
    console.warn("⚠️ [EMAIL] Credentials not fully configured or failed. Logging email to console:");
    console.log("=========================================");
    console.log(`MOCK EMAIL SENT TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    console.log(`MESSAGE: ${text}`);
    console.log("=========================================");
    throw new Error("Email delivery failed");
};

module.exports = sendEmail;
