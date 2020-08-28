var express = require('express');
var productControllers = require('../../controllers/apiControllers/productControllers');
var authenticate = require('../../middlewares/authenticate');
var router = express.Router();


router.post('/search', productControllers.searchByBrand);

router.post('/addcart/:id', authenticate, productControllers.addToCart);

router.post('/addorder/:id', authenticate, productControllers.addOrder);

router.get('/cart/:userId',authenticate, productControllers.renderCart)

router.delete('/removecart/:productId', authenticate, productControllers.removeFromCart);


module.exports = router;