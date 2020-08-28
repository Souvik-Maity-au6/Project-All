const {Router} = require("express");
const upload = require("../multer");
const {authorization} = require("../middleware/authorization");
const {register, login, logout} = require("../controllers/userController");
const {
	addData,
	getAllPublicPosts,
	getSinglePost,
	addToFavourite,
} = require("../controllers/dataController");
const router = Router();

// ------------------------User Routes---------------------//
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authorization, logout);

// -------------------------------Data Routes---------------------//

router.post("/addData", authorization, upload.single("image"), addData);
router.post("/addToFavourite/:postId", authorization, addToFavourite);
router.get("/allPublicPosts", getAllPublicPosts);
router.get("/post/:postId", authorization, getSinglePost);

module.exports = router;
