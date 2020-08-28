var express = require('express');
var blogControllers = require('../../controllers/apiControllers/blogControllers');
var authenticate = require('../../middlewares/authenticate');
var router = express.Router();


router.post('/blog/create',authenticate, blogControllers.createBlog);

router.patch('/blog/update/:blogId', authenticate, blogControllers.updateBlog);


router.delete('/blog/delete/:blogId', authenticate, blogControllers.deleteBlog);


module.exports = router;