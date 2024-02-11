const EmailOtp = require("../model/EmailOtp");
const User = require("../model/Usermodel");
const bcrypt = require('bcrypt');
const varifyEmail = async (req, res) => {
  try {
    const {  otp } = req.body;
      const generatedotp = await EmailOtp.findOne({ email: req.user.email });
      if (!generatedotp) {
        res.status(400).json({ success: false, message: "Time limit exceeds" });
      } else {
        const otpCompare = await bcrypt.compare(otp, generatedotp.otp)

        if (otpCompare) {
        await  User.findOneAndUpdate({email:req.user.email},{emailVarified:true},{new:true})
     
          res
            .status(200)
            .json({ success: true, message: "Email varified successfully" });
        } else {
          res
            .status(400)
            .json({ success: false, message: "otp is not correct" });
        }
      }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
module.exports = varifyEmail;
