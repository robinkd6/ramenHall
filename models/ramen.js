var mongoose = require("mongoose");


var ramenSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

module.exports = mongoose.model("Ramen", ramenSchema);