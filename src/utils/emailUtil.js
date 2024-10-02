const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT, 
    secure: false,
    auth: {
        user: process.env.SMTP_USER, // your email (from environment variables)
        pass: process.env.SMTP_PASS  // your email password (or an app-specific password)
    }
});


const sendVerificationEmail = async (email, token) => {
    try {
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`; // Frontend URL for email verification

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_FROM, // sender address
            to: email, // recipient email
            subject: 'Email Verification',
            html: `
                <h3>Hello,</h3>
                <p>Thank you for registering. Please verify your email address by clicking the link below:</p>
                <a href="${verificationLink}">Verify Email</a>
                <p>If you did not request this, please ignore this email.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Verification email sent to:', email);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Could not send verification email.');
    }
};

module.exports = sendVerificationEmail;
