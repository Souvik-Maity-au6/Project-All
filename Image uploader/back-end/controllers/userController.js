const userModel = require("../models/User");
const sequelize = require("../db");

module.exports = {
	// ---------------------------- Rgister user to db--------------------------- //
	async register(req, res) {
		try {
			const { password, useremail } = req.body;
			const pwdRegex = "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
			const pattern = new RegExp(pwdRegex);
			// req.body.userId = uuid();
			if (pattern.test(password)) {
				const newUser = new userModel({ ...req.body });
				// await userModel.generateToken(newUser.dataValues);
				// // console.log("new user token",newUser.token);
				const user = await newUser.save();
				console.log(user);

				return res.status(200).send({ msg: "User registered sucessfull" });
			} else {
				return res.send("Invalid Password");
			}
		} catch (err) {
			console.log(err);
			return res.send({ msg: err.msg });
		}
	},

	//----------------------------- Login user to db-----------------------//

	async login(req, res) {
		console.log("hi there");
		const { password, useremail } = req.body;
		if (!password || !useremail)
			return res.status(404).send({ msg: "Invalid Credentials" });
		try {
			const user = await userModel.findByEmailAndPassword(useremail, password);
			await userModel.generateToken(user[0]);
			const loggedinUser = await sequelize.query(
				`UPDATE "user" SET token='${user[0].token}'`,
			);
			return res
				.status(200)
				.send({ msg: `Welcome ${user[0].username}`, data: user[0] });
		} catch (err) {
			if (err === "Incorrect credentials")
				return res.status(403).send({ msg: err.msg });
			console.log(err);
		}
	},

	//---------------------------------   Logout user to db--------------------//

	async logout(req, res) {
		try {
			// console.log("Hello");
			const currentUser = req.user.id;
			console.log("Current User = ", currentUser);
			// console.log(req.user);
			// const user = await userModel.findById(currentUser);
			const user = await sequelize.query(
				`SELECT * FROM "user" WHERE Id='${currentUser}'`,
			);
			// console.log(user)

			if (user.length !== 0) {
				user.token = null;
				// await user.save();
				await sequelize.query(`UPDATE "user"  SET token=${user.token}`);
				return res.send("Thank you visit again");
			} else {
				throw Error("Please Login first");
			}
		} catch (err) {
			return res.send({ msg: err.msg });
		}
	},
};
