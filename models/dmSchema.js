const mongoose = require('mongoose')

const Dm = mongoose.Schema({
    userIds : {
    type: Array,
    required: true
    },
    userNames:{
        type: Array,
        required: true
    }
},{
    timestamps :true
})


module.exports = mongoose.model('Dm',Dm)