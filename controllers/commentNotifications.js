const userSchema = require('../models/userSchema')
const commentSchema = require('../models/commentSchema')
const notificationSchema = require('../models/notificationSchema')
const userGetter = require('./getParentIds')
const socketGetter = require('./getSocketIds')

let followersArray = {onlineFollowersSockets:[],offlineFollowersIds:[],onlineTagged:[],offlineTagged:[]}

//remember to test without calling userSchema or followersArray


const checkType = async(type,parentPost,postId)=>{
    
    if(type==='post'){
    
        const commentNots = await commentSchema.findById(postId).populate('user').populate('parent_post_id')
        //console.log(commentNots)
        return commentNots
    
    }
    
    else if(type==='comment'){
        
        const commentNots = await commentSchema.findById(postId).populate('user').populate('parent_post_id').populate('parent_Comments')
        //console.log(commentNots)
        return commentNots
    
    }
}

const notifier = async(message,postId,parentComments,parentPost,type,userId)=>{

    
const regTest = /\B@[a-zA-Z0-9!_]+/g
let words = message.match(regTest) //checks for the presence of the @ keyword in the post  created

const commentNots = await checkType(type,parentPost,postId)


if(words){
    words = words.join(' ')
    const foundUsers = await userSchema.aggregate([
        {$match:{$text: 
            {$search: words} //you can try $in here
        }}])
        
  
        socketGetter(followersArray,foundUsers,parentPost,postId,parentComments,'user')
       
    }


      const Jay = async ()=> {
    const {UsersforComments,UsersforPost} = await userGetter(parentComments,parentPost)
    
    
    socketGetter(followersArray,UsersforPost,parentPost,postId,parentComments,'post')
    
    socketGetter(followersArray,UsersforComments,parentPost,postId,parentComments,'comment')
    
     }
    
Jay()
    
followersArray.onlineTagged.forEach(socket =>{
    global.io.to(socket).emit('notifications',commentNots)
})


followersArray.onlineTagged = []



const followerUsers = await userSchema.findById(userId)
.select('-Username -name -Password -Email -_id -followingIds -chatIds -roomIds -socketId -timestamps')
.populate('followerIds', '-Username -name -Password -Email -_id -followingIds -chatIds -roomIds -followerIds -timestamps')




for(let i=0; i<followerUsers.followerIds.length; i++){
followersArray.onlineFollowersSockets.push(followerUsers.followerIds[i].socketId)
}

followersArray.onlineFollowersSockets.forEach(socket =>{
    global.io.to(socket).emit('newFeed',commentNots)
})

followersArray.onlineFollowersSockets = []


}

module.exports = notifier