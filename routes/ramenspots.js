var express = require("express");
var router 	= express.Router();
var Ramen   = require("../models/ramen");

//rLocations = ramen locations
router.get("/", function(req, res){
	//Get all locations from DB
	Ramen.find({}, function(err, rLocations){
		if(err){
			console.log(err);
		} else {
			res.render("ramenLocation/ramenspot", {rlocations: rLocations, currentUser: req.user});
		}
	});
	
});


router.post("/", isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newrLocation = {
		name: name,
		image: image,
		description: desc,
		author: author
	};
	
	//create new ramen location and save to db
	Ramen.create(newrLocation, function(err, newlyCreated){
		if(err) {
			console.log(err);
		} else {
			//console.log(newlyCreated);
			res.redirect("/ramenspot");
		}
	});
});


//NEW - show form to create new ramen spot
router.get("/new", isLoggedIn, function (req, res){
		res.render("ramenLocation/new");
});

//SHOW - displays info about ramen
router.get("/:id", function(req, res){
	//find ramen spot with provided ID + comments
	Ramen.findById(req.params.id).populate("comments").exec(function(err, foundrLocation){
		if(err){
			console.log(err);
		} else {
			console.log(foundrLocation);
			//render info on ramen location
			res.render("ramenLocation/show", {ramen: foundrLocation});
		}
	});
});

//middleware
function isLoggedIn(req, res, next)
{
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;