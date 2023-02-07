const express = require('express')
const port = process.env.PORT || 4000;
const cors = require('cors');
const http = require('http')
const socketio = require('socket.io')
const connectDatabase = require('./db/db')
const bodyParser = require('body-parser'); 
const postcontrol = require('./controllers/postControl')
const {catchError} = require('./middlewares/errorCatcher')
const userAuth = require('./routes/userRoute')
const authorizeUser = require('./middlewares/authorizeUser')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')
const socketClass = require('./utils/socketclass')
const messages = require('./routes/dmMessageRoute')
const swaggerUI = require('swagger-ui-express')
const testdocs = require('./swaggerDocuments')
const morgan = require('morgan')



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

    app.use(morgan('tiny'))

    /*
    morgan((tokens, req, res) => {
      return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'), '-',
          tokens['response-time'](req, res), 'ms'
      ].join(' ')
  })
*/

    connectDatabase()
    
  app.use('/user', userAuth)
  app.use('/post',authorizeUser,postRoute)
  app.use('/comment',authorizeUser,commentRoute)
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(testdocs));
  app.use('/message',authorizeUser,messages)

  app.use(catchError)

  const server = http.createServer(app)

global.io = socketio(server);
global.io.on('connection', socketClass.connection)
global.io.on('connection', async(connect)=>{
  //console.log(Object.keys(global.io.sockets.sockets))
    console.log(`you are welcome ${connect.id} again`)
    global.io.to(connect.id).emit('secondInfo',`${connect.id} just came online for second emit`)
})



  server.listen(port)
  server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`)
  });
    //app.listen(port, ()=> console.log(`in here in port ${port}`))