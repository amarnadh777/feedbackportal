const mongooose = require('mongoose')
const userSchema = new mongooose.Schema({
    username:String,
    fullname:String,
     password:String,
     profilePic:String,
     role:{type:String,
        enum:["user","admin"],
        default:"user"
     }
     
})
const userModel = mongooose.model("User",userSchema)
module.exports = userModel

