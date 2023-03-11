const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    startTime:{
        type:String,
    },
    endTime:{
        type:String
    },
    roomNo:{
        type:String
    },
    roomType:{
        type:String,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('users',userSchema)