const EmailOtp = require("../model/EmailOtp");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const tarnsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = async (req, res) => {
  try {
    if (req.user.emailVarified === true) {
      return res.json({ success: true, message: "Email is already varified" });
    }
    const salt = await bcrypt.genSalt(10);
    const PLAIN_OTP = Math.floor(100000 + Math.random() * 900000);
    let String_Plain_Otp = PLAIN_OTP.toString();
    const OTP = await bcrypt.hash(String_Plain_Otp, salt);
    const existingEmail = await EmailOtp.findOne({ email: req.user.email });
    if (existingEmail) {
      await EmailOtp.findByIdAndUpdate(
        { _id: existingEmail._id },
        { otp: OTP },
        { new: true }
      );

      const mailOptions = {
        from: process.env.EMAIL,
        to: req.user.email,
        subject: "sending OTP for validation",
        text: `OTP:- ${PLAIN_OTP}`,
      };

      tarnsporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(400).json({ success: false, error: "Email not send" });
        } else {
          res
            .status(200)
            .json({ success: true, message: "Email send successfully" });
        }
      });
    } else {
      await EmailOtp.create({
        email: req.user.email,
        otp: OTP,
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: req.user.email,
        subject: "sending OTP for validation",
        text: `OTP:- ${PLAIN_OTP}`,
      };

      tarnsporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(400).json({ success: false, error: "Email not send" });
        } else {
          res
            .status(200)
            .json({ success: true, message: "Email send successfully" });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
module.exports = sendEmail;
