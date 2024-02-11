const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema=new Schema({
        firstname:{type:String, required:true},
        lastname:{type:String, required:true},
        mobile:{type:Number, required:true},
        email:{type:String, required:true, unique: true},
        mobileVarified:{type:Boolean, default:false},
        emailVarified:{type:Boolean, default:false}
})
module.exports=mongoose.model("User",userSchema)