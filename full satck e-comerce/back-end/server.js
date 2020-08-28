const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

require("./db");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(productRoutes);

app.get("/", (req, res) => {
	return res.send({ message: "Welcome To project testing" });
});

server.listen(PORT, () => {
	console.log("Server is running at port", PORT);
});
