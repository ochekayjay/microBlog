
const {createMessage,getMessage,deleteMessage,getDms} =  require('../controllers/dmMessageControl')
const router = require('express').Router()
 


router.post('/',createMessage)
router.get('/getDm',getDms)
router.get('/:dmId',getMessage)
router.delete('/:id',deleteMessage)


module.exports = router