module.exports = {
    renderRegisterPage: function(req, res) {
      if(req.session.userId) return res.redirect('/product')
    res.render("register", {
      title: "Registration ::"
    });
  },

  renderLoginPage: function(req, res) {
    if(req.session.userId) return res.redirect('/product')
    res.render("login", {
      title: "Login ::"
    });
  }
}