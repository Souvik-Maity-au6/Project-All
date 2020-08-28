const { Schema, model } = require("mongoose");
const { sign } = require("jsonwebtoken");
const { hash, compare } = require("bcryptjs");

const userSchema = Schema({
	token: {
		type: String,
		default: null,
	},
	name: {
		type: String,
		trim: true,
		sparse: true,
		unique: true,
		required: [true, "Name required"],
	},
	email: {
		type: String,
		trim: true,
		sparse: true,
		lowercase: true,
		unique: true,
		required: [true, "Email required"],
		validate: {
			validator: function(v) {
				return /^[A-Za-z._{0-9}*]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/.test(
					v,
				);
			},
			message: "Please enter a valid email",
		},
	},
	password: {
		type: String,
		validate: {
			validator: function(v) {
				return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(v);
			},
			message: "Please enter a valid password",
		},
		required: [true, "Password Required"],
	},
	orders: [
		{
			type: Schema.Types.ObjectId,
			ref: "order",
		},
	],
});
userSchema.statics.findByEmailAndPassword = async function(email, password) {
	let userObj = null;
	try {
		return new Promise(async function(resolve, reject) {
			const user = await userModel.find({ email: email });
			if (user.length === 0) return reject("Incorrect credentials");
			userObj = user;

			const isMatched = await compare(password, user[0].password);

			if (!isMatched) return reject("Incorrect credentials");
			resolve(userObj);
		});
	} catch (err) {
		reject(err);
	}
};

userSchema.methods.generateToken = async function() {
	this.token = await sign({ id: this._id }, process.env.PRIVATE_KEY, {
		expiresIn: 60 * 30,
	});
};

userSchema.pre("save", async function(next) {
	var user = this;

	try {
		if (user.isModified("password")) {
			const hashPwd = await hash(this.password, 10);
			this.password = hashPwd;
			next();
		}
	} catch (err) {
		console.log(err);
		next(err);
	}
});

const userModel = model("user", userSchema);
module.exports = userModel;
