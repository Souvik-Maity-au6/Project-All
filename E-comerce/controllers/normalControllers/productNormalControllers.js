var product = require('../../models/Product');
var Cart = require('../../models/Cart');




module.exports = {
  renderProducts: function(req, res) {
    var page = parseInt(req.query.page);
    var skip = page * 24;
     Cart.find({user: req.session.userId}).countDocuments(function(err, count){
        req.session.count = count
      })
    if(page === NaN){
      product.find({}).limit(24).then(function(products){
      return res.render('product', {
        products: products,
        count: req.session.count,
        userId: req.session.userId
      })
    }).catch(function(err){
      console.log(err)
      return res.status(500).send('Server Error')
    })
  }else{
    product.find({}).skip(skip).limit(24).then(function(products){
      return res.render('product', {
        products: products,
        count: req.session.count,
        userId: req.session.userId
      })
    }).catch(function(err){
      console.log(err)
      return res.status(500).send('Server Error')
    })
  }
  },
  renderWomenShoe: function(req, res){
    var page = parseInt(req.query.page);
    var skip = page * 12;
     Cart.find({user: req.session.userId}).countDocuments(function(err, count){
        req.session.count = count
      })
    if(page === NaN){
      product.find({'category': 'Women'}).limit(12).then(function(products){
      return res.render('women', {
        products: products,
        count: req.session.count,
        userId: req.session.userId
      })
    }).catch(function(err){
      console.log(err)
      return res.status(500).send('Server Error')
    })
    }else{
      product.find({'category': 'Women'}).skip(skip).limit(12).then(function(products){
      return res.render('women', {
        products: products,
        count: req.session.count,
        userId: req.session.userId
      })
    }).catch(function(err){
      console.log(err)
      return res.status(500).send('Server Error')
    })
    }
    
  },
 renderMenShoe: function(req, res){
    var page = parseInt(req.query.page);
    var skip = page * 12;
     Cart.find({user: req.session.userId}).countDocuments(function(err, count){
        req.session.count = count
      })
    if(page === NaN){
      product.find({'category': 'Men'}).limit(12).then(function(products){
      return res.render('men', {
        products: products,
        count: req.session.count,
        userId: req.session.userId
      })
    }).catch(function(err){
      console.log(err)
      return res.status(500).send('Server Error')
    })
    }else{
      product.find({'category': 'Men'}).skip(skip).limit(12).then(function(products){
      return res.render('men', {
        products: products,
        count: req.session.count,
        userId: req.session.userId
      })
    }).catch(function(err){
      console.log(err)
      return res.status(500).send('Server Error')
    })
    }
  },
  renderKidsShoe: function(req, res){
    var page = parseInt(req.query.page);
    var skip = page * 12;
     Cart.find({user: req.session.userId}).countDocuments(function(err, count){
        req.session.count = count
      })
    if(page === NaN){
      product.find({'category': 'Kids'}).limit(12).then(function(products){
      return res.render('kids', {
        products: products,
        count: req.session.count,
        userId: req.session.userId
      })
    }).catch(function(err){
      console.log(err)
      return res.status(500).send('Server Error')
    })
    }else{
      product.find({'category': 'Kids'}).skip(skip).limit(12).then(function(products){
      return res.render('kids', {
        products: products,
        count: req.session.count,
        userId: req.session.userId
      })
    }).catch(function(err){
      console.log(err)
      return res.status(500).send('Server Error')
    })
    }
  },
  renderProductDetails: function(req, res){
    var shoeId = req.params.shoeId
    Cart.find({user: req.session.userId}).countDocuments(function(err, count){
        req.session.count = count
      })
    product.findById(shoeId).then(function(shoe){
      return {
        id: shoeId,
        img: shoe.imgUrl,
        brandName: shoe.title,
        price: shoe.price,
        ratings: shoe.ratings,
        category: shoe.category
      }
    }).then(function(shoeObj){
      product.find({category: shoeObj.category}).limit(5).then(function(products){
        return res.render('productDetails', {
          products: products,
          id: shoeId,
          img: shoeObj.img,
          brandName: shoeObj.brandName,
          price: shoeObj.price,
          ratings: shoeObj.ratings,
          category: shoeObj.category,
          count: req.session.count,
          userId: req.session.userId

        })
      })
    }).catch(function(err){
      console.log(err)
    })
  }
  

};
