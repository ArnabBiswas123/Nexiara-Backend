const MobileOtp = require("../model/MobileOtp");
const bcrypt = require('bcrypt');
require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authtoken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authtoken);



const sendMobileOtp = async (req, res) => {
  try {
    if (req.user.mobileVarified === true) {
      return res.json({ success: true, message: "Mobile is already varified" });
    }
    const salt = await bcrypt.genSalt(10);
    const PLAIN_OTP = Math.floor(100000 + Math.random() * 900000);
    let String_Plain_Otp = PLAIN_OTP.toString();
    const OTP = await bcrypt.hash(String_Plain_Otp, salt);
    const existingMobile = await MobileOtp.findOne({ mobile: req.user.mobile });
    if (existingMobile) {
      await MobileOtp.findByIdAndUpdate(
        { _id: existingMobile._id },
        { otp: OTP },
        { new: true }
      );
      let msgOptions = {
        from: process.env.TWILIO_FROM_NUMBER,
        to: `+91 ${req.user.mobile}`,
        body: `The OTP is ${PLAIN_OTP}`,
      };
      client.messages
        .create(msgOptions)
        .then((message) => {

          res.send({success:true, message:"OTP sent successfully."});
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          res.status(500).send({success:false, message:"Error sending OTP."});
        });
    }
else{
    await MobileOtp.create({
        mobile:req.user.mobile,
        otp: OTP,
      });
      let msgOptions = {
        from: process.env.TWILIO_FROM_NUMBER,
        to: `+91 ${req.user.mobile}`,
        body: `The OTP is ${PLAIN_OTP}`,
      };
      client.messages
        .create(msgOptions)
        .then((message) => {
          res.send({success:true, message:"OTP sent successfully."});
        })
        .catch((error) => {
          console.error("Error sending OTP:", error);
          res.status(500).send({success:false, message:"Error sending OTP."});
        });
}



  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = sendMobileOtp;
