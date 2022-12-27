const {register,login,deleteUser} = require('../controllers/usercontrol')

const router = require('express').Router()

router.post('/register', register)
router.post('/signin', login)
router.delete('/delete/:id',deleteUser)


module.exports = router