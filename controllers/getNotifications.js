const notificationSchema = require('../models/notificationSchema')
const errorHolder = require('../controllers/errorControl')

const getNotifs = async(req,res,next)=>{
    const notsData = await notificationSchema.find({userId:req.user.id}).populate('postId').populate('commentId').populate('parent_Comments')
    if(notsData){
        if(Array.isArray(notsData)){
            let Array_ids = []
            notsData.forEach(data =>{
                Array_ids.push(data._id)
            })
        await notificationSchema.deleteMany({_id: {$in: Array_ids }})
        res.json(notsData)
        }
        else{
            let remove_id = notsData._id
            await notificationSchema.findByIdAndDelete(remove_id)
            res.json({notsData})
        }
    }
    else{
        res.json({message:'no notifications'})
    }
}

module.exports = getNotifs