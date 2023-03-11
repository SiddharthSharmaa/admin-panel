const mongoose = require("mongoose")

const bookedRoomSchema = new mongoose.Schema({
    roomNo: {
        type: String,
        required: true
    },
    roomType:{
        type: String,
        required: true
    },
    price:{
        type:Number
    },
    bookedDate: [
        {
            type: String,
            default:null,
        }
    ]
})

module.exports = mongoose.model('bookedRoom',bookedRoomSchema)