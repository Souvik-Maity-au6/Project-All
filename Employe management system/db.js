const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
mongoose
	.connect(
		"mongodb+srv://souvik111:3q4DIAGHIHIflmpk@cluster0-zk6uf.mongodb.net/mayMonthlyTest?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		},
	)
	.then(function() {
		console.log("Database connected successfully");
	})
	.catch(function(err) {
		console.log(err.message);
	});
