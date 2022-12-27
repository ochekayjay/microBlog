const gistschena = require('../models/postSchema')
const {createPost,getPost,getAllPosts,deletePost,querySearch,querySearchUser,likepost,unlikepost} =  require('../controllers/postControl')
const router = require('express').Router()
 


router.post('/',createPost)
router.get('/', getAllPosts)
router.get('/:postid',getPost)
router.delete('/:id', deletePost)
router.get('/search',querySearch)
router.get('/searchUser/:userid',querySearchUser)
router.get('/likepost/:id',likepost)
router.get('/unlikepost/:id',unlikepost)


module.exports = router