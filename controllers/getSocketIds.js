const notificationSchema = require('../models/notificationSchema')






const getSocket = async(followersArray,foundUsers,parentPost,postId,parentComments,dtype)=>{

if (!Array.isArray(foundUsers)){
   
    const a  = global.io.sockets.adapter.sids 

    const allSocketIds = [...a.keys()]
    
    if( allSocketIds.includes(foundUsers.userId.socketId)){
        
        followersArray.onlineTagged.push(foundUsers['userId']['socketId'])
        
    }
    else{
        followersArray.offlineTagged.push(foundUsers['userId']['_id'])

        if(parentComments !== null){

            const nots = await notificationSchema.create({
                userId: foundUsers['userId']['_id'],
                postId : parentPost,
                commentId : postId,
                parent_Comments : parentComments
            }).populate('userId').populate('postId').populate('commentId').populate('parent_Comments')
            
        }

        else {
            const Nots = await notificationSchema.create({
                userId: foundUsers['userId']['_id'],
                postId : parentPost,
                commentId : postId,
                
            })

            const nots = await notificationSchema.find({userId:Nots.userId}).populate('userId').populate('postId').populate('commentId')
            
        }
    }

}

else{
for(let i=0; i<foundUsers.length;i++){
    const a  = global.io.sockets.adapter.sids 

    const allSocketIds = [...a.keys()]
    
    if(dtype === 'comment'){
    if( allSocketIds.includes(foundUsers[i]['user']['socketId'])){
        //make user and userId same for comment and post, remember to make that of user model exclusive
        followersArray.onlineTagged.push(foundUsers[i]['user']['socketId'])
        
    }
    else{
        followersArray.offlineTagged.push(foundUsers[i]['user']['_id'])

        if(parentComments !== null){

            const nots = await notificationSchema.create({
                userId: foundUsers[i]['user']['_id'],
                postId : parentPost,
                commentId : postId,
                parent_Comments : parentComments
            }).populate('userId').populate('postId').populate('commentId').populate('parent_Comments')
            
        }

        else {
            const Nots = await notificationSchema.create({
                userId: foundUsers[i]['user']['_id'],
                postId : parentPost,
                commentId : postId,
                
            })

            const nots = await notificationSchema.find({userId:Nots.userId}).populate('userId').populate('postId').populate('commentId')
            
        }
    }}
    else{
        if( allSocketIds.includes(foundUsers[i]['socketId'])){
            //make user and userId same for comment and post, remember to make that of user model exclusive
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
}}

}

module.exports = getSocket