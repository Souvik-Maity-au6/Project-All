var mongoose = require("mongoose");
var Schema = mongoose.Schema;

orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
		product: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true },
);

var Order = mongoose.model("order", cartSchema);
module.exports = Order;
