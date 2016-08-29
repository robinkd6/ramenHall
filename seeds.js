var mongoose 						= require("mongoose");
var Ramen			  				= require("./models/ramen");
var Comment 						= require("./models/comment");

var data = [
	{
		name: "Kizuki Ramen & Izakaya",
		image: "http://www.seattleglobalist.com/wp-content/uploads/2015/03/ramen-kukai.jpg",
		description: "Garlic Tonkatsu Shoyu Ramen with 2 eggs"
	},	
	{
		name: "Arashi Ramen",
		image: "https://s3-media3.fl.yelpcdn.com/bphoto/ubd6oX1tKV9Ryf72Ej8eWg/o.jpg",
		description: "Spicy Miso Tonkatsu Ramen with 2 eggs"
	},
	{
		name: "Hokkaido Ramen Santouka",
		image: "https://s3-media4.fl.yelpcdn.com/bphoto/LfIuCmBUHpmRQlBldeM7-A/o.jpg",
		description: "Miso Garlic Tonkatsu Ramen"
	},

];

function seedDB() {
	Ramen.remove({}, function(err){
		// if(err){
		// 	console.log(err);
		// }
		// console.log("Removed ramen locations!");
		// 	//add ramen locations
		// 	data.forEach(function(seed){
		// 	Ramen.create(seed, function(err, ramen){
		// 		if(err){
		// 			console.log(err);
		// 		} else {
		// 			console.log("Added Ramen!");
		// 			//create comment
		// 			Comment.create(
		// 			{
		// 				text: "This place is awesome - I love Ramen",
		// 				author: "Kobe Bryant"
		// 			}, function(err, comment){
		// 					if(err) {
		// 						console.log(err);
		// 					} else {
		// 						ramen.comments.push(comment);
		// 						ramen.save();
		// 					console.log("Created new comment");
		// 				}
						
		// 			});
		// 		}
		// 	});
		// });
	});

}

module.exports = seedDB;