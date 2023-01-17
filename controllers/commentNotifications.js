const userSchema = require('../models/userSchema')
const commentSchema = require('../models/commentSchema')
const notificationSchema = require('../models/notificationSchema')

let followersArray = {onlineFollowersSockets:[],offlineFollowersIds:[],onlineTagged:[],offlineTagged:[]}

//remember to test without calling userSchema or followersArray


const checkType = async(type,parentPost)=>{
    console.log('a in check')
    if(type==='post'){
        console.log('b in check')
        const commentNots = await commentSchema.find({parent_post_id:parentPost}).populate('user').populate('parent_post_id')
        //console.log(commentNots)
        return commentNots
    
    }
    
    else if(type==='comment'){
        console.log('c in check')
        const commentNots = await commentSchema.find({parent_post_id:parentPost}).populate('user').populate('parent_post_id').populate('parent_Comments')
        //console.log(commentNots)
        return commentNots
    
    }
}

const notifier = async(message,postId,parentComments,parentPost,type,userId)=>{

    
const regTest = /\B@[a-zA-Z0-9!_]+/g
const words = message.match(regTest) //checks for the presence of the @ keyword in the post  created

const commentNots = await checkType(type,parentPost)
console.log(commentNots)
console.log('abc')
console.log(`${checkType(type,parentPost)} please work?`)

if(words){
    const foundUsers = await userSchema.aggregate([
        {$match:{$text: 
            {$search: message}
        }}])
    for(let i=0; i<foundUsers.length;i++){
        const a  = global.io.sockets.adapter.sids 

        const allSocketIds = [...a.keys()]
        if( allSocketIds.includes(foundUsers[i]['socketId'])){
            followersArray.onlineTagged.push(foundUsers[i]['socketId'])
            
        }
        else{
            followersArray.offlineTagged.push(foundUsers[i]['_id'])

            if(parentComments !== null){

                const nots = await notificationSchema.create({
                    userId: foundUsers[i]['_id'],
                    postId : parentPost,
                    commentId : postId,
                    parent_Comments : parentComments
                }).populate('userId').populate('postId').populate('commentId').populate('parent_Comments')
                
            }

            else {
                const Nots = await notificationSchema.create({
                    userId: foundUsers[i]['_id'],
                    postId : parentPost,
                    commentId : postId,
                    
                })

                const nots = await notificationSchema.find({userId:Nots.userId}).populate('userId').populate('postId').populate('commentId')
                
            }
        }
    }

    
console.log('order')
console.log(`${commentNots} in socket section.`)
global.io.to(followersArray.onlineTagged).emit('notifications',commentNots)

}
const followerUsers = await userSchema.findById(userId)
.select('-Username -name -Password -Email -_id -followingIds -chatIds -roomIds -socketId -timestamps')
.populate('followerIds', '-Username -name -Password -Email -_id -followingIds -chatIds -roomIds -followerIds -timestamps')


for(let i=0; i<followerUsers.length; i++){
followersArray.onlineFollowersSockets.push(followerUsers.followerIds.socketId)
}
global.io.to(followersArray.onlineFollowersSockets).emit('newFeed',commentNots)

}

module.exports = notifier