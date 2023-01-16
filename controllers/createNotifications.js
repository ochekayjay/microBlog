const userSchema = require('../models/userSchema')
const commentSchema = require('../models/commentSchema')

let followersArray = {onlineFollowersSockets:[],offlineFollowersIds:[],onlineTagged:[],offlineTagged:[]}

//remember to test without calling userSchema or followersArray


const notifier = async(message,postId,parentComments,parentPost)=>{
const comment = await commentSchema.findById(postId)
    console.log('trying shii put')
const regTest = /\B@[a-zA-Z0-9!_]+/g
const words = message.match(regTest) //checks for the presence of the @ keyword in the post  created

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
            console.log('in here')
        }
        else{
            followersArray.offlineTagged.push(foundUsers[i]['_id'])

            if(parentComments !== null){

                const nots = await notificationSchema.create({
                    userId: foundUsers[i]['_id'],
                    postId : parentPost,
                    commentId : postId,
                    parent_Comments : parentComments
                }).populate()
                console.log(nots)
            }

            else {
                const nots = await notificationSchema.create({
                    userId: foundUsers[i]['_id'],
                    postId : parentPost,
                    commentId : postId,
                    
                }).populate()
                console.log(nots)
            }
        }
    }

    const nots = await commentSchema.findById(postId).populate()


global.io.to(followersArray.onlineTagged).emit('notifications',nots)

}
const followerUsers = await userSchema.findById(req.user.id)
.select('-Username -name -Password -Email -_id -followingIds -chatIds -roomIds -socketId -timestamps')
.populate('followerIds', '-Username -name -Password -Email -_id -followingIds -chatIds -roomIds -followerIds -timestamps')

console.log(followerUsers)
for(let i=0; i<followerUsers.length; i++){
followersArray.onlineFollowersSockets.push(followerUsers.followerIds.socketId)
}
global.io.to(followersArray.onlineFollowersSockets).emit('newFeed',post)

}

module.exports = notifier