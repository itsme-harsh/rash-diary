import { sendEmail } from '../config/email.js';

const sendRegistrationEmail = async (recipientEmail, type, username) => {
    if (type == "register") {
        try {
            const response = await sendEmail({
                to: recipientEmail,
                subject: 'Welcome to Rash-diary!',
                html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Rash-diary</title>
                
            </head>
            <body style="font-family: Arial, sans-serif;color: #333;line-height: 1.6;margin: 0;padding: 20px;background-color: #f4f4f4;">
                <div class="container" style="max-width: 600px;margin: auto;padding: 15px;background: #fff;border-radius: 3px;box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #5a5a5a;font-size:22px">Welcome to Rash-diary</h2>
                    <p style="margin: 0 0 15px;text-transform:capitalise;">Hello ${username},</p>
                    <p style="margin: 0 0 15px;">Thank you for registering with us. We're excited to have you on board!</p>
                    <p style="margin: 0 0 15px;">If you have any questions, feel free to reach out to our support team.</p>
                    <p style="margin: 0 0 15px;">Best regards,</p>
                    <p style="margin: 0 0 15px;">The Rash-diary Team</p>
                    <div class="footer" style="font-size: 0.9em;color: #888;">
                        <p style="margin: 0 0 15px;">&copy; ${new Date().getFullYear()} Rash-diary. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
            `
            });
            return response;
        } catch (error) {
            console.error('Failed to send registration email:', error);
        }
    }
};


export { sendRegistrationEmail };
