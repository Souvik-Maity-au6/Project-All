var express = require('express');
var router = express.Router();
var userNormalControllers = require('../../controllers/normalControllers/userControllers');


router.get('/register', userNormalControllers.renderRegisterPage);


router.get('/login', userNormalControllers.renderLoginPage);



module.exports = router;