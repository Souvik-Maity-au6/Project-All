var hbs = require("hbs");

hbs.registerHelper("constructUpdate", function() {
  return `/blog/update/${this.id}`;
});


hbs.registerHelper("constructDelete", function() {
  return `/blog/delete/${this.id}?_method=DELETE`;
});


hbs.registerHelper("constructUpdateApi", function() {
  return `/blog/update/${this.blog.id}?_method=PATCH`;
});