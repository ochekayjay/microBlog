
const createMessage =  require('../controllers/dmMessageControl')
const router = require('express').Router()
 


router.post('/',createMessage)


module.exports = router