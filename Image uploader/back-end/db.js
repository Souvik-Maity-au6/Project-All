const Sequelize = require("sequelize");
const {POSTGRESS_URI_CLOUD, POSTGRESS_PWD_CLOUD} = process.env;
// console.log(POSTGRESS_PWD, POSTGRESS_URI);
const sequelize = new Sequelize(
	POSTGRESS_URI_CLOUD.replace("<password>", POSTGRESS_PWD_CLOUD),
);
// console.log(sequelize);
sequelize.sync();
const testConn = async () => {
	try {
		const auth = await sequelize.authenticate();
		console.log("Database is connected sucessfully ");
	} catch (err) {
		console.log(err.message);
	}
};

testConn();

module.exports = sequelize;
