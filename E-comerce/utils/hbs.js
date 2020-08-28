var hbs = require("hbs");

hbs.registerHelper("constructBuyShoe", function() {
  return `/productDetails/${this._id}`;
});


hbs.registerHelper("constructRemove", function() {
  return `/removecart/${this.product._id}?_method=DELETE`;
});


// hbs.registerHelper("constructUpdateApi", function() {
//   return `/blog/update/${this.blog.id}?_method=PATCH`;
// });