const mongoose = require('mongoose')

const DmMessage = mongoose.Schema({
    dmId : {
    type: String,
    required: true
    },
    message:{
        type: String,
        required: true
    },
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiverName: {
        type : String,
        required : true
    },
    senderName: {
        type : String,
        required : true
    }
},{
    timestamps :true
})


module.exports = mongoose.model('DmMessage',DmMessage)