const jwt = require("jsonwebtoken");
const User = require('../model/Usermodel');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.userData.id);


      next();
    } catch (error) {
      return res.json({success:false, msssage:'Token is not correct'});
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
  
    return res.json({success:false, msg:'Token is not there'});

  }
};

module.exports = { protect };