const {register,login,deleteUser,followAccount,unfollowAccount} = require('../controllers/usercontrol')
const authorizeUser = require('../middlewares/authorizeUser')

const router = require('express').Router()

router.post('/register', register)
router.post('/signin', login)
router.delete('/delete/:id',deleteUser)
router.get('/follow/:accId',authorizeUser,followAccount)
router.get('/unfollow/:accId',authorizeUser,unfollowAccount)


module.exports = router