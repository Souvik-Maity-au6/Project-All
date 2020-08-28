const {Sequelize, Model} = require("sequelize");
const {sign} = require("jsonwebtoken");
const {hash, compare} = require("bcryptjs");
const sequelize = require("../db");

class User extends Model {
	static async generateToken(newUser) {
		const token = await sign({id: newUser.id}, process.env.PRIVATE_KEY, {
			expiresIn: 60 * 10,
		});
		newUser.token = token;
	}

	static async findByEmailAndPassword(email, password) {
		let userObj = null;
		try {
			return new Promise(async function(resolve, reject) {
				console.log(email);
				const user = await sequelize.query(
					`SELECT * FROM  "user" WHERE useremail='${email}'`,
					{type: sequelize.QueryTypes.SELECT},
				);
				if (user.length === 0) return reject("Incorrect credentials");
				userObj = user;
				const isMatched = await compare(password, user[0].password);

				if (!isMatched) return reject("Incorrect credentials");
				resolve(userObj);
			});
		} catch (err) {
			reject(err);
		}
	}
}

const userSchema = {
	token: {
		type: Sequelize.STRING,
		defaultValue: null,
	},
	useremail: {
		type: Sequelize.STRING,
		lowercase: true,
		unique: true,
		allowNull: false,
		validate: {
			isEmail: {
				msg: "Please enter a valid email",
			},
		},
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Please provide the password",
			},
		},
	},

	username: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Please provide user Name",
			},
		},
	},
	posts: {
		type: Sequelize.ARRAY(Sequelize.INTEGER),
		defaultValue: [],
	},
	favourites: {
		type: Sequelize.ARRAY(Sequelize.INTEGER),
		defaultValue: [],
	},
};

User.init(userSchema, {
	sequelize,
	tableName: "user",
});

User.beforeCreate(async user => {
	const hashPwd = await hash(user.password, 10);
	user.password = hashPwd;
});
User.beforeUpdate(async user => {
	console.log("hook", user);
});

module.exports = User;

// // const userModel = mongoose.model("user", userSchema);
// // module.exports = userModel;
