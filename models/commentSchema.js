const mongoose = require('mongoose')

const comment = mongoose.Schema({
    user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    parent_id:{
        type : String,
        required: true
    },
    message:{
        type: String,
        required: true,
    },
    comments:{
        type : Array,
        default: []
    }
  
},{
    timestamps :true
})

module.exports = mongoose.model('Comment',comment)