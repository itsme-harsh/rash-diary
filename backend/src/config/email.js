import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text, html }) => {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'Gmail',  // You can use other services like 'Outlook', 'Yahoo', etc.
        auth: {
            user: process.env.EMAIL_USER,  // Your email address
            pass: process.env.EMAIL_PASS   // Your email password or application-specific password
        }
    });

    // Define the email options
    const mailOptions = {
        from: "Rash-diary " + process.env.EMAIL_USER, // Sender address
        to,                           // List of recipients
        subject,                      // Subject line
        html                          // HTML body (optional)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};
