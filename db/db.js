const mongoose = require('mongoose')

connectDatabase = async()=>{
    try{
       const conn = await mongoose.connect('mongodb+srv://kayjay:dc777jjj@cluster0.sjb8tlz.mongodb.net/?retryWrites=true&w=majority')
        console.log(`mongodb is connected: ${conn.connection.host}`)
    }
    catch(error){
        if(error.name==='MongoServerError'){
            console.log('a')
            process.exit(1)
        }
   
        
    }
}

module.exports = connectDatabase