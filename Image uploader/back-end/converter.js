const path = require("path");
const DataURIParser = require("datauri/parser");
const newDataUri = new DataURIParser();

module.exports = function(originalName, buffer) {
	let extension = path.extname(originalName);
	return newDataUri.format(extension, buffer).content;
};
