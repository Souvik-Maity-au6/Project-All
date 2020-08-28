const productModel = require("../models/Product");
const cartModel = require("../models/Cart");
const orderModel = require("../models/Order");

module.exports = {
	async addToCart(req, res) {
		const userId = req.user.id;
		const productId = req.params.productId;
		try {
			const cart = new cartModel({ user: userId, product: productId });
			await cart.save();
			const product = await productModel.findById(productId);
			res.status(200).send({
				msg: "Product has been added to cart successfully",
				product: product,
			});
		} catch (err) {
			console.log(err);
			res.status(500).send(err);
		}
	},
	async getCartProducts(req, res) {
		const userId = req.user.id;
		try {
			const allCartProducts = await cartModel
				.find({ user: userId })
				.populate("product");

			res.status(200).send({ products: allCartProducts });
		} catch (err) {
			console.log(err);
			res.status(500).send(err);
		}
	},
	async removeFromCart(req, res) {
		const userId = req.user.id;
		const productId = req.params.productId;
		try {
			await cartModel.deleteOne({
				user: userId,
				product: productId,
			});
			res
				.status(200)
				.send({ msg: "Your product has been removed from the cart" });
		} catch (err) {
			console.log(err);
			res.status(500).send(err);
		}
	},

	async checkout(req, res) {
		const userId = req.user.id;
		try {
			const cartProducts = await cartModel.find({ user: userId });
			if (cartProducts.length) {
				cartProducts.map(async product => {
					const newOrder = new orderModel({
						user: userId,
						product: product.product,
					});
					const order = await newOrder.save();
				});
				await cartModel.deleteMany({ user: userId });
			}
			res.status(200).send({
				msg: "your order has been successfully placed",
			});
		} catch (err) {
			console.log(err);
			res.status(500).send(err);
		}
	},
	async getAllOrder(req, res) {
		const userId = req.user.id;
		try {
			const orders = await orderModel
				.find({ user: userId })
				.populate("product");
			if (orders.length) {
				res.status(200).send({ orders: orders });
			} else {
				res.status(200).send({ msg: "You have no order pls buy something" });
			}
		} catch (err) {
			console.log(err);
			res.status(500).send(err);
		}
	},
	async getProducts(req, res) {
		const category = req.query.category;
		try {
			if (category) {
				const products = await productModel.find({ category: category });
				return res.status(200).send({ products: products });
			} else {
				const products = await productModel.find({});
				return res.status(200).send({ products: products });
			}
		} catch (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	},

	async getProductDetails(req, res) {
		const productId = req.params.productId;
		try {
			const product = await productModel.findById(productId);
			return res.status(200).send({ product: product });
		} catch (err) {
			console.log(err);
			return res.status(500).send(err);
		}
	},
};
