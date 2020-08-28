var User = require("../models/User");
var Company = require("../models/Company");
var { hash, compare } = require("bcryptjs");

module.exports = {
	async postRegister(req, res) {
		try {
			var user = new User({ ...req.body });
			const hashed = await hash(user.password, 10);
			user.password = hashed;
			await user.save();
			req.session.userId = user._id;
			req.session.userName = user.name;
			res.redirect("/employee-dashboard");
		} catch (error) {
			console.log(error);
		}
	},

	async postLogin(req, res) {
		try {
			var email = req.body.email;
			var password = req.body.password;
			if (!email || !password) return res.status(400).send("Enter all fields");
			const user = await User.findOne({ email: email });
			if (!user) throw "Incorrect credentials";
			const isMatched = compare(password, user.password);
			if (!isMatched) throw "Incorrect credentials";
			req.session.userId = user._id;
			req.session.userName = user.name;
			res.redirect("/employee-dashboard");
		} catch (error) {
			console.log(error);
			res.redirect("/");
		}
	},
	async postCreateCompany(req, res) {
		try {
			const company = new Company({ ...req.body });
			company.creator.id = req.session.userId;

			const userObj = await User.findById(req.session.userId);
			userObj.currCompany.id = company._id;
			userObj.currCompany.name = company.name;
			userObj.currCompany.joinedDate = new Date();
			await userObj.save();

			company.creator.name = userObj.name;
			company.currEmployees.push({ id: req.session.userId, name: userObj.name, joinedDate: new Date() });
			await company.save();

			res.redirect("/employee-dashboard");
		} catch (error) {
			console.log(error);
		}
	},

	async postJoinCompany(req, res) {
		try {
			const company = await Company.findById(req.params.id);
			console.log(company);
			const employee = { id: req.session.userId, joinedDate: new Date() };
			company.currEmployees.push(employee);
			await company.save();

			const user = await User.findById(req.session.userId);
			user.currCompany.id = company._id;
			user.currCompany.joiningDate = new Date();
			await user.save();

			res.redirect("/employee-dashboard");
		} catch (error) {
			console.log(error);
		}
	},
};
