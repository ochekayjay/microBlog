const gistschena = require('../models/postSchema')
const {createPost,getPost,getAllPosts,deletePost,querySearch,querySearchUser,likepost,unlikepost,postsFeed} =  require('../controllers/postControl')
const router = require('express').Router()
 


router.post('/',createPost) //makes a post
router.get('/', getAllPosts) //get all posts uploaded by the user in question
router.delete('/:id', deletePost) //delete a post made by a user
router.get('/search',querySearch) //search for all posts available, made by anyone
router.get('/searchUser/:userid',querySearchUser) //search for posts made by a specific user
router.get('/likepost/:id',likepost) //like a post
router.get('/unlikepost/:id',unlikepost) //unlike a post
router.get('/postfeed',postsFeed)
router.get('/:postid',getPost)// get a specific post made by any user


/*here you have so many get routes, so you need to be extra careful, putting
before the other get requests would absorb their immediate values just after
the forward slash, as ':' is literally interpreted to preceed anything*/ 

module.exports = router