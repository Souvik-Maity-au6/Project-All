var User = require("../models/User");

module.exports = {
  async authenticate(req, res, next) {
    try {
      if (req.session.userId) {
        const user = await User.findById(req.session.userId)
        if (user) next();
        else res.redirect('/')
      }
      else res.redirect('/')
    } catch (error) {
      console.log(error)
      res.redirect('/')
    }
  }
}
