const post = require('../models/postSchema')
const comment = require('../models/commentSchema')

const userGetter = async(commentIds,postIds)=>{
  
    
const UsersforComments = await comment.find({_id:{$in:commentIds}}).select('-parent_post_id -message -like -child_Comments -parent_Comments').populate('user')
const UsersforPost = await post.findById(postIds).select('-message -comments -CommentNumbers -like -hidden').populate('userId')

return {UsersforComments,UsersforPost}
}

module.exports = userGetter