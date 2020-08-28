var Product = require('../../models/Product');
var User = require('../../models/User');
var Cart = require('../../models/Cart');
var Order = require('../../models/Order');

module.exports = {
    searchByBrand: function(req,res){
      Cart.find({user: req.session.userId}).countDocuments(function(err, count){
        req.session.count = count
      })
      var search = req.body.brand;
      console.log(search)
      Product.find({title:search}).then(function(products){
        return res.render('product', {
          products: products,
          count: req.session.count,
          userId: req.session.userId
        })
      }).catch(function(err){
        console.log(err)
        return res.status(500).send('Server Error')
      })
  },
  addToCart: function(req, res){
    var user = req.user;
    var shoeId = req.params.id;
    var cart = new Cart({user: user._id, product: shoeId});
    cart.save().then(function(){
      return res.redirect(`/productDetails/${shoeId}`)
    }).catch(function(err){
      console.log(err)
    })
  },
  addOrder: function(req, res){
    var user = req.user;
    var shoeId = req.params.id;
    var order = new Order({user: user._id, product: shoeId});
    var orderId = order._id;
    user.orders.push(orderId);
    user.save().then(function(){
      console.log('Oreder placed successfully')
    }).catch(function(err){
      console.log(err)
    })
    order.save().then(function(){
      return res.render('thankyou')
    }).catch(function(err){
      console.log(err)
    })
    
  },
  renderCart: function(req, res){
    var user = req.user
    Cart.find({user: req.session.userId}).countDocuments(function(err, count){
        req.session.count = count
      })
      Cart.find({user:req.session.userId}).populate("product").then(function(products){
        console.log(products)
        return res.render('cart',{
          products: products,
          count: req.session.count,
          length: products.length,
          name: user.name
        })
      })
   
  
  },
  removeFromCart: function(req, res){
    Cart.find({user: req.session.userId}).countDocuments(function(err, count){
        req.session.count = count
      })
    var productId = req.params.productId;
    var userId = req.session.userId
    Cart.deleteOne({product: productId}).then(function(){
      return res.redirect(`/cart/${userId}`)
    }).catch(function(err){
      console.log(err)
    })
  }
}