const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    mobile: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1m' } // OTP expires after 1 minutes
});

module.exports=mongoose.model("MobileOtp",otpSchema)