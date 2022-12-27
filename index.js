const express = require('express')
const port = process.env.PORT || 4000;
const cors = require('cors')
const connectDatabase = require('./db/db')
const bodyParser = require('body-parser'); 
const postcontrol = require('./controllers/postControl')
const {catchError} = require('./middlewares/errorCatcher')
const userAuth = require('./routes/userRoute')
const authorizeUser = require('./middlewares/authorizeUser')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')



const app  = express()

app.use(cors({
    origin: '*'
  }));
  
  app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
  
    app.use(
      bodyParser.json()
    );

    connectDatabase()
    
  app.use('/user', userAuth)
  app.use('/post',authorizeUser,postRoute)
  app.use('/comment',authorizeUser,commentRoute)

    app.use(catchError)
    app.listen(port, ()=> console.log(`in here in port ${port}`))