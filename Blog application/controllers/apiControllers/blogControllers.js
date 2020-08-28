var Blog = require('../../models/Blog');
var User = require('../../models/User')


module.exports = {
    createBlog: function(req, res){
        var user = req.user
        var blog = new Blog({ ...req.body });
        blog.user.id = user._id;
        blog.user.name = user.name;
        user.blogs.push({
          id: blog._id,
          title: blog.title
        })
        user.save().then(function(){
          console.log('User has successfully created new blog')
        }).catch(function(err){
          console.log(err)
          if (err.name === "ValidationError")
            return res.status(400).send(`Validation Error: ${err.message}`);
          return res.status(500).send("Server Error");
        })
        blog.save().then(function(){
          console.log('Blog Saved successfully');
          return res.redirect('/dashboard')
        }).catch(function(err){
          console.log(err.messsage);
        return res.status(500).send("Server Error");
        })
    },
    updateBlog: function(req, res){
      var blogId = req.params.blogId;
      var userId = req.user.id;
      var newBlog =  req.body
      var isCompleted = req.body.isCompleted;

      Blog.updateOne(
        {_id: blogId, 'user.id': userId},
        { ...newBlog, isCompleted:isCompleted},
        { new: true }).then(function(blog){
          if(!blog) return res.status(404).send("Blog not found")
          console.log(blog);
        res.redirect('/dashboard');
        }).catch(function(err) {
        if (err.name === "CastError")
          return res.status(400).send("Invalid Blog ID");
        if (err.name === "ValidationError")
          return res.status(400).send(`Validation Error: ${err.message}`);
        return res.status(500).send("Server Error");
      });
    },

    deleteBlog: function(req, res){
      var userId = req.user.id;
      var blogId = req.params.blogId;
     Blog.deleteOne({ _id: blogId, 'user.id': userId }).then(function(blog){
       if(!blog) return res.status(404).send('Blog not found')
     }).catch(function(err){
       if (err.name === "CastError")
          return res.status(400).send("Invalid Todo ID");
        console.log(err);
        return res.status(500).send("Server Error");
     })
     User.updateOne(
       {_id: userId},
       {$pull:{
         blogs:{id: blogId}
       }}).then(function(userObj){
       console.log(userObj)
       res.redirect('/dashboard')
     }).catch(function(err){
       console.log(err)
     })
    }
  }