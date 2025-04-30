    const { response } = require("express");
const   mongoose  = require("mongoose");

    const feedbackSchema = mongoose.Schema({productId:{type:mongoose.Schema.Types.ObjectId,ref:"Products"} 
    
    ,feedback:String,rating:{type:Number,min:0,max:5},
    image:String,
    createdAt: { type: Date, default: Date.now },

    response:{type:String},
    responsedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
    })
    const feedbackModel = mongoose.model("Feedbacks", feedbackSchema);

    module.exports = feedbackModel; 