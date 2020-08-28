const { Router } = require("express");
const { register, login, logout } = require("../controllers/userController");
const { authentication } = require("../middlewares/Authentication");
const router = Router();

router.post("/userRegistration", register);
router.post("/userLogin", login);
router.delete("/userLogout", authentication, logout);

module.exports = router;
