var express = require('express');
var blogControllers = require('../../controllers/normalControllers/blogControllers');
var authenticate = require('../../middlewares/authenticate');
var router = express.Router();


router.get('/dashboard', authenticate, blogControllers.renderDashboard);

router.get('/createblog', authenticate, blogControllers.renderCreateblog);

router.get('/blog/update/:blogId', authenticate, blogControllers.renderUpdateblog);


module.exports = router