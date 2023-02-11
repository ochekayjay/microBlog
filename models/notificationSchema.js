const mongoose = require('mongoose');

const notification = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Gist'
        }
    ,
    commentId: 
        [{
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }]
    ,
    
    parent_Comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ],
   
   
},{
    timestamps :true
})

// there are multiple ways a user can get a notification, 
//      - By literally adding the user's username with the @ keyword just before it in a post.
//      - By adding the user's username with the @ keyword just before it in a comment.
//      -adding a child comment to a comment or a post, the creator of the main post or comment gets notified.

module.exports = mongoose.model('Notification',notification)