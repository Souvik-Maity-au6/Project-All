var Blog = require('../../models/Blog')




module.exports = {
  renderDashboard: function(req, res) {
    var user = req.user;
    Blog.find({ 'user.id': user._id }).then(function(blogsArray){
      return res.render('dashboard', {
          title: 'Your Blog ::',
          userId: user.id,
          name: user.name,
          blogs: blogsArray,
          length: blogsArray.length
    })
  }).catch(function(err){
      console.log(err)
      return res.status(500).send('Server Error')
    })
  },
  renderCreateblog: function(req, res) {
    res.render("createblog", {
      title: "Create Blog ::"
    });
  },

  renderUpdateblog: function(req, res){
    var user = req.user;
    var blogId = req.params.blogId;
    Blog.findById(blogId).then(function(blog){
      return res.render('updateblog', {
        title: 'Update your Blog ::',
        blogId: blog._id,
        userId: user.id,
        blogTitle: blog.title,
        blogContent: blog.body,
        blog: blog
      })
    }).catch(function(err) {
        return res.status(500).send(`Server Error ${err.message}`);
      });
    
  }

};
