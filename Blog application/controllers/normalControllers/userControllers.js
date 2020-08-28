module.exports = {
    renderRegisterPage: function(req, res) {
      if(req.session.userId) return res.redirect('/dashboard')
    res.render("register", {
      title: "Registration ::"
    });
  },

  renderLoginPage: function(req, res) {
    if(req.session.userId) return res.redirect('/dashboard')
    res.render("login", {
      title: "Login ::"
    });
  }
}