const mongoose = require('mongoose')

const user = mongoose.Schema({
    Username:{
        type: String,
        required: true,
        index: true
    },
    Password:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
        unique: true,
    },
    followerIds:{
        type : Array,
        default : []
    },
    chatIds:{
        type : Array,
        default: []
    }
    ,
    roomIds:{
        type : Array,
        default: []
    },
    socketId : {
        type: mongoose.Schema.Types.Mixed,
        default: null
    }
},{
    timestamps :true
})

module.exports = mongoose.model('User',user)