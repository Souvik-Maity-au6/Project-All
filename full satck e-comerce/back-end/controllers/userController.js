const userModel = require("../models/User");

module.exports = {
	// --------- User Registration ---------------- //

	async register(req, res) {
		try {
			const newUser = new userModel({ ...req.body });
			await newUser.save();
			return res.status(200).send({
				msg: "User registered sucessfully",
			});
		} catch (err) {
			console.log(err);
			return res.send({ msg: err.message });
		}
	},

	//----------------------------- User Login -----------------------//

	async login(req, res) {
		const { password, email } = req.body;
		if (!password || !email)
			return res.status(404).send({ msg: "Pls give email and password" });
		try {
			const user = await userModel.findByEmailAndPassword(email, password);
			user[0].generateToken();
			await user[0].save({ validateBeforeSave: false });
			return res.status(200).send({
				msg: `Welcome ${user[0].name}`,
				userId: user[0].id,
				name: user[0].name,
				email: user[0].email,
				accessToken: user[0].token,
			});
		} catch (err) {
			return res.status(404).send({ msg: err });
		}
	},

	//---------------------------------  User Logout --------------------//

	async logout(req, res) {
		try {
			const currentUser = req.user.id;
			const user = await userModel.findById(currentUser);
			if (user) {
				user.token = null;
				await user.save({ validateBeforeSave: false });
				return res.send("Thank you visit again");
			} else {
				throw Error("Please Login first");
			}
		} catch (err) {
			return res.send(err);
		}
	},
};
