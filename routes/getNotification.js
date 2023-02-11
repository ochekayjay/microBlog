const notifControl = require('../controllers/getNotifications')

const router = require('express').Router()


router.get('/',notifControl)

module.exports = router