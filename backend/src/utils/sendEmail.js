import { sendEmail } from '../config/email.js';
import otpVerfication from '../email-templates/otpVerification.js';

const sendRegistrationEmail = async (recipientEmail, otp) => {
    try {
        const response = await sendEmail({
            to: recipientEmail,
            subject: 'Account verification code for Rash-diary!',
            html: otpVerfication.replace('{{otp}}', otp)
        });
        return response;
    } catch (error) {
        console.error('Failed to send registration email:', error);
    }
};


export { sendRegistrationEmail };
