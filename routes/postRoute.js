const gistschena = require('../models/postSchema')
const {createPost,getPost,getAllPosts,deletePost,querySearch,querySearchUser,likepost,unlikepost,postsFeed} =  require('../controllers/postControl')
const router = require('express').Router()
 


router.post('/',createPost) //makes a post
router.get('/', getAllPosts) //get all posts uploaded by the user in question
router.get('/:postid',getPost)// get a specific post made by any user
router.delete('/:id', deletePost) //delete a post made by a user
router.get('/search',querySearch) //search for all posts available, made by anyone
router.get('/searchUser/:userid',querySearchUser) //search for posts made by a specific user
router.get('/likepost/:id',likepost) //like a post
router.get('/unlikepost/:id',unlikepost) //unlike a post
router.get('postfeed',postsFeed)


module.exports = router