const mongoose = require('mongoose')

const gist = mongoose.Schema({
    userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
    message:{
        type: String,
        required: true,
        index: true
    },
    comments:{
        type : Array,
        default: []
    },
    like: {
        type : Number,
        default :0
    }
    ,
    CommentNumbers: {
        type : Number,
        default :0
    }
    ,
    hidden:{
        type: Boolean,
        default: false
    }
},{
    timestamps :true
})

gist.index({ message: 'text'})

module.exports = mongoose.model('Gist',gist)