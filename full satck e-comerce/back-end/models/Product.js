var mongoose = require("mongoose");
var Schema = mongoose.Schema;

productSchema = new Schema({
	imgUrl: {
		type: String,
	},
	title: {
		type: String,
	},
	price: {
		type: String,
	},
	category: {
		type: String,
	},
	ratings: {
		type: Number,
	},
});

var Product = mongoose.model("product", productSchema);
module.exports = Product;
