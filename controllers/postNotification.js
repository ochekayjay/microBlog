const userSchema = require('../models/userSchema')
const notificationSchema = require('../models/notificationSchema')

let followersArray = {onlineFollowersSockets:[],offlineFollowersIds:[],onlineTagged:[],offlineTagged:[]}


const postNotifier = async(message,post,userId)=>{
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

                        if(allSocketIds.includes(foundUsers[i]['socketId'])){
                            followersArray.onlineTagged.push(foundUsers[i]['socketId'])
                        }
                        else{
                            followersArray.offlineTagged.push(foundUsers[i]['_id'])
                            const nots = await notificationSchema.create({
                                userId: foundUsers[i]['_id'],
                                postId : post.id
                            })
                        
                        }
                    }
                    console.log(`tags in ${followersArray}`)
                global.io.to(followersArray.onlineTagged).emit('notifications',post)
                followersArray.onlineTagged = []
                
                }
        const followerUsers = await userSchema.findById(userId)
        .select('-Username -name -Password -Email -_id -followingIds -chatIds -roomIds -socketId -timestamps')
        .populate('followerIds', '-Username -name -Password -Email -_id -followingIds -chatIds -roomIds -followerIds -timestamps')
         
        
        for(let i=0; i<followerUsers.followerIds.length; i++){
            //offline followers do not need to see posts in notification section when they finally come back online.
            //it would automatically have appeared on their feed section.
                followersArray.onlineFollowersSockets.push(followerUsers.followerIds[i].socketId)
                console.log(followerUsers.length)
                console.log(followerUsers)
        }
        console.log(`no tags ${followersArray}`)
        console.log(followersArray.onlineFollowersSockets)
        global.io.to(followersArray.onlineFollowersSockets).emit('newFeed',post)
        followersArray.onlineFollowersSockets = []
                
}

module.exports = postNotifier