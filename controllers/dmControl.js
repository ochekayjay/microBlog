const dmSchema = require('../models/dmSchema')
const errorHolder = require('../controllers/errorControl')
const userSchema = require('../models/userSchema')


const createDm = async(req,res,next)=>{
    try{
            if(!req.body.intiatiorId || !req.body.initiatorname || !req.body.recipientname || !req.body.recipientId || !req.body.initiatorsocket){
                errorHolder('no user credential',400)
            }
            else{
                //this first searches for the recipient by the recipient's id, gets the id,username and socket_id of that recipient
                //...and stores all of that info into the newly created Dm document.
                const foundrecipient = await userSchema.findById(req.body.recipientId)
                const createdDm = await dmSchema.create({
                    userIds : [req.body.intiatiorId,req.body.recipientId],
                    userNames: [req.body.initiatorname,foundrecipient.Username],
                    Sockets : [req.body.initiatorsocket,foundrecipient.socketId]
                })

                console,log(createdDm)
            }
    }
    catch(error){
        next(error)
    }
}

module.exports = createDm