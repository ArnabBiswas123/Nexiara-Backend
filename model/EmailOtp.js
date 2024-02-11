const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1m' } // OTP expires after 1 minutes
});

module.exports=mongoose.model("EmailOtp",otpSchema)