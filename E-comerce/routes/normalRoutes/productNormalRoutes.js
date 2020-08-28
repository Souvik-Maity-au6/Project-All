var express = require('express');
var productControllers = require('../../controllers/normalControllers/productNormalControllers');
var authenticate = require('../../middlewares/authenticate');
var router = express.Router();


router.get('/product', productControllers.renderProducts);

router.get('/women', productControllers.renderWomenShoe);

router.get('/men', productControllers.renderMenShoe);

router.get('/kids', productControllers.renderKidsShoe);

router.get(`/productDetails/:shoeId`, productControllers.renderProductDetails);




module.exports = router