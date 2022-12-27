const router = require('express').Router()
const {createComment,getComment,deleteComment,likeComment,unlikeComment} = require('../controllers/commentControl')


router.get('/:id',getComment)

router.delete('/delete/:id',deleteComment)

router.post('/:parent',createComment)

router.get('/like/:id',likeComment)

router.get('/unlike/:id',unlikeComment)

module.exports = router