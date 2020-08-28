const cloudinary = require("../cloudinary");
const dataModel = require("../models/Data");
const userModel = require("../models/User");
const convert = require("../converter");
const sequelize = require("../db");

module.exports = {
	async addData(req, res) {
		try {
			const imageContent = convert(req.file.originalname, req.file.buffer);
			const image = await cloudinary.uploader.upload(imageContent);
			req.body.image = image.secure_url;
			const newData = new dataModel(req.body);
			const user = await userModel.findOne({ where: { id: req.user.id } });
			const uploadedData = await newData.save();
			const updateUser = await sequelize.query(
				`UPDATE "user" SET posts = array_append( posts,${uploadedData.dataValues
					.id} ) WHERE id = ${req.user.id}`,
			);
			// console.log("Updated User =", updateUser);
			res.status(201).send({ msg: "Sucessfully Uploaded", data: uploadedData });
		} catch (err) {
			console.log(err);
			res.status(400).send({ msg: err.msg });
		}
	},

	async getAllPublicPosts(req, res) {
		try {
			const allPublicPosts = await dataModel.findAll({
				where: { privacystatus: "public" },
			});
			if (allPublicPosts.length !== 0)
				return res.status(200).send({ allPublicPosts: allPublicPosts });
			return res.status(404).send({ msg: `There is no public posts avilable` });
		} catch (err) {
			return res.status(400).send({ msg: err.msg });
		}
	},
	async getSinglePost(req, res) {
		try {
			const allPublicPosts = await dataModel.findOne({
				where: { id: `${req.params.postId}` },
			});
			if (allPublicPosts.length !== 0)
				return res.status(200).send({ allPublicPosts: allPublicPosts });
			return res
				.status(200)
				.send({ msg: `There is no posts avilable in this id` });
		} catch (err) {
			return res.status(400).send({ msg: err.msg });
		}
	},
	async addToFavourite(req, res) {
		try {
			const user = await userModel.findOne({ where: { id: req.user.id } });
			const updateUser = await sequelize.query(
				`UPDATE "user" SET favourites = array_append( favourites,${req.params
					.postId} ) WHERE id = ${req.user.id}`,
			);
			console.log("Updated User favourite =", updateUser);
			res.status(201).send({ msg: "Sucessfully added to fovourite" });
		} catch (err) {
			return res.status(400).send({ msg: err.msg });
		}
	},
};
