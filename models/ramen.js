var mongoose = require("mongoose");

//ASSOCIATE MODELS!!
var ramenSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	location: String,
	price: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

module.exports = mongoose.model("Ramen", ramenSchema);