var User = require('../models/User');
var Cart = require('../models/Cart');
var Product = require('../models/Product');

module.exports = function(req, res, next){
    if (req.session.userId) {
    User.findById(req.session.userId).then(function(user){
      req.user = user;
      
      next()
    }).catch(function(err){
      console.log(err)
      res.redirect('/login')
    })

  }else res.redirect('/login')
}