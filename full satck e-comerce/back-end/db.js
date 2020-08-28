const mongoose = require("mongoose");

const databaseConnection = async () => {
	const connect = await mongoose.connect(
		process.env.MONGODB_URL.replace("<password>", process.env.MONGODB_PASSWORD),
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		},
	);
	if (connect) {
		console.log("Data base Connected Sucessfully");
	}
};

databaseConnection();

databaseConnection();
