var express = require('express');
var authenticate = require('../../middlewares/authenticate');
var userControllers = require('../../controllers/apiControllers/userControllers') ;


var router = express.Router();


router.post('/users/register', userControllers.registerUser);

router.post('/users/login', userControllers.loginUser);

router.delete("/users/logout", authenticate, userControllers.logoutUser);





module.exports = router;