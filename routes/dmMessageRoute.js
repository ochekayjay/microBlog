
const {createMessage,getMessage,deleteMessage} =  require('../controllers/dmMessageControl')
const router = require('express').Router()
 


router.post('/',createMessage)
router.get('/:dmId',getMessage)
router.delete('/:id',deleteMessage)


module.exports = router