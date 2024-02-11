const MobileOtp = require("../model/MobileOtp");
const User = require("../model/Usermodel");
const bcrypt = require('bcrypt');
const varifyMobile = async (req, res) => {
  try {
    const {  otp } = req.body;
      const generatedotp = await MobileOtp.findOne({ mobile: req.user.mobile });
      if (!generatedotp) {
        res.status(400).json({ success: false, message: "Time limit exceeds" });
      } else {
        const otpCompare = await bcrypt.compare(otp, generatedotp.otp)

        if (otpCompare) {
        await  User.findOneAndUpdate({email:req.user.email},{mobileVarified:true},{new:true})
     
          res
            .status(200)
            .json({ success: true, message: "Mobile varified successfully" });
        } else {
          res
            .status(400)
            .json({ success: false, message: "otp is not correct" });
        }
      }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = varifyMobile;