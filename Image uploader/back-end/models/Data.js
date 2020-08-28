const {Sequelize, Model} = require("sequelize");

const sequelize = require("../db");

class Data extends Model {}

const dataSchema = {
	imagetitle: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Please provide the title",
			},
		},
	},

	image: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Please provide poster Image",
			},
		},
	},
	privacystatus: {
		type: Sequelize.STRING,
	},

	description: {
		type: Sequelize.STRING,
	},
};

Data.init(dataSchema, {
	sequelize,
	tableName: "data",
});

module.exports = Data;
// const movieModel = mongoose.model("movie", movieSchema);
// module.exports = movieModel;
