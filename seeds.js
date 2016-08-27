var mongoose 						= require("mongoose");
var Ramen			  				= require("./models/ramen");



function seedDB() {
	Ramen.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed ramen location")
	});
}
