const userSchema = require('../models/userSchema')

class socketClass {
    Socketarray = []
  userIdentity = ''
    connection(client) {
      // event fired after user signs in succesfully
      client.on("addSocketid", async function(userId){
        console.log('inside socket')
        //console.log(global.io.sockets.sockets)
        //const a = global.io.sockets.sockets
        //console.log(typeof global.io.sockets.sockets)
        //console.log(typeof global.io.sockets.adapter.sids)
        //console.log(Object.keys(global.io.sockets.sockets))


        /*let socketsArray = await global.io.fetchSockets();

        console.log(socketsArray)*/

       /* for (let [id, socket] of io.sockets.entries()) {
          console.log(`${id} is ${socket}`)
      }*/



        //console.log(global.io.sockets.sockets)
        //console.log(global.io.sockets)
        //console.log(global.io.sockets.sockets._eventsCount)
        /*global.io.sockets.adapter.sids.map(function(e) {
          console.log(e)})*/
        /*io.sockets.sockets.map(function(e) {
          Socketarray.push(e.id);
      })
      global.io.sockets.adapter.sids.map(function(e) {
        console.log(e)})*/
        const a  = global.io.sockets.adapter.sids 

        console.log([...a.keys()])
        //console.log(a.Map(1))
        //console.log(typeof a)
        //console.log(Object.entries(a))
        //console.log(a)
        //console.log(Socketarray)
        try{
           const userData = await userSchema.findByIdAndUpdate(userId,{
            $set:{socketId:client.id}
          },{upsert:true,new:true})
          this.userIdentity = userId
          
        }
        catch(error){
          console.log(error)
        }
        
        
      });


      // event fired when the chat room is disconnected
      /*client.on("disconnect", async function(){
        
        try{
           const userData = await userSchema.findByIdAndUpdate(this.userIdentity,{
            $set:{socketId:null}
          },{upsert:true})
          console.log(this.userIdentity)
  
          client.broadcast.emit('disconnectedChat', `${userData.Username} is disconnected from chat`)
          console.log(userData)
        }
        catch(error){
          console.log(error)
        }
        
        
      });*/
      // add identity of user mapped to the socket id
      client.on("identity", (userId) => {
        this.users.push({
          socketId: client.id,
          userId: userId,
        });
      });
      // subscribe person to chat & other user as well
      client.on("subscribe", (room, otherUserId = "") => {
        this.subscribeOtherUser(room, otherUserId);
        client.join(room);
      });
      // mute a chat room
      client.on("unsubscribe", (room) => {
        client.leave(room);
      });
    }
  
    subscribeOtherUser(room, otherUserId) {
      const userSockets = this.users.filter(
        (user) => user.userId === otherUserId
      );
      userSockets.map((userInfo) => {
        const socketConn = global.io.sockets.connected(userInfo.socketId);
        if (socketConn) {
          socketConn.join(room);
        }
      });
    }
  }
  
  module.exports =  new socketClass();