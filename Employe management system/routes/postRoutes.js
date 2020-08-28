var express = require("express");
var {authenticate} = require("../middlewares/authenticate");
var {postRegister,postLogin, postCreateCompany,postJoinCompany} = require("../controllers/postController");

var router = express.Router();

router.post("/register", postRegister);

router.post("/login", postLogin);
router.post("/create-company", authenticate, postCreateCompany);
router.post("/join-company/:id", authenticate, postJoinCompany);



module.exports = router;
