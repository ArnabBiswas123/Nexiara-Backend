const User = require("../model/Usermodel");
const registerValidation = require("../controllers/registerValidation");
const jwt = require('jsonwebtoken')


const register = async (req, res) => {
  try {
    try {
      await registerValidation.validateAsync(req.body);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, message: error.message });
    }
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if(user){
      const data = {
        userData: {
            id: user.id
        }
    }

    const authToken =await jwt.sign(data,process.env.JWT_SECRET,{ expiresIn: '10m' })

      if (user.emailVarified === false && user.mobileVarified===false) {
        return res.status(400).json({success:true, message:'Email and Mobile is not varified', token:authToken});
      }
      else{
        if(user.emailVarified===false)
        return res.status(400).json({success:true, message:'Email not varified', token:authToken});
      else{
        if(user.mobileVarified===false){
          return res.status(400).json({success:true, message:'Mobile not varified', token:authToken});
        }
        else{
          return res.json({success:false, message:'Mobile and Email is varified'})
        }
      }
      }
    }else{
     const newuser= await User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile,
        email: req.body.email,
      });
      const data = {
        userData: {
            id: newuser.id
        }
    }
    const authToken =await jwt.sign(data,process.env.JWT_SECRET,{ expiresIn: '10m' })
      res.json({success:true, message:'User created', token:authToken})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
module.exports = register;
