const { verify } = require("jsonwebtoken");

module.exports = {
	async authentication(req, res, next) {
		// console.log(req.headers.authorization);
		try {
			let token = verify(req.headers.authorization, process.env.PRIVATE_KEY);
			req.user = token;
			next();
		} catch (err) {
			// console.log(err);
			res.status(403).send({
				msg: "Authentication failed...pls login first",
			});
		}
	},
};
