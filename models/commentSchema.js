const mongoose = require('mongoose')
//thinking of making post and comment schema just one, where the diff between both of them is that they...
//...have a type field, type comment and post
const comment = mongoose.Schema({
    user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },

    parent_post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gist',
        required: true,
        },
        
    message:{
        type: String,
        required: true,
    },
   
    like: [                                   
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]
    ,
    child_Comments:[                                   
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
    ,
    parent_Comments:[                                   
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
  //lookout a comment_id referenced in a comment model
},{
    timestamps :true
})

module.exports = mongoose.model('Comment',comment)