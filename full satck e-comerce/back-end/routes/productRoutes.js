const { Router } = require("express");
const {
	getProducts,
	getProductDetails,
	addToCart,
	getCartProducts,
	removeFromCart,
	checkout,
	getAllOrder,
} = require("../controllers/ProductController");
const { authentication } = require("../middlewares/Authentication");
const router = Router();

router.get("/getProducts", getProducts);

router.get(`/productDetails/:productId`, getProductDetails);

router.get("/getCartProducts", authentication, getCartProducts);

router.post("/addTocart/:productId", authentication, addToCart);

router.delete("/removeFromCart/:productId", authentication, removeFromCart);

router.post("/checkout", authentication, checkout);

router.get("/getOrders", authentication, getAllOrder);

module.exports = router;
