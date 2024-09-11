import crypto from "crypto";

function generateOtp() {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
    return { otp, expiresAt }
}

export { generateOtp }

