const dmSchema = require('../models/dmSchema')
const {createPost,getPost,getAllPosts,deletePost,querySearch,querySearchUser,likepost,unlikepost} =  require('../controllers/postControl')
const router = require('express').Router()
 


router.post('/',createPost)
router.get('/', getAllPosts)
router.get('/:postid',getPost)
router.delete('/:id', deletePost)





module.exports = router