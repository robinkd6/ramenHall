var express 	 = require("express");
var router 		 = express.Router();
var Ramen   	 = require("../models/ramen");
var middleware = require("../middleware/index.js");

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


router.post("/", middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var location = req.body.location;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newrLocation = {
		name: name,
		image: image,
		description: desc,
		price: price,
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
router.get("/new", middleware.isLoggedIn, function (req, res){
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

//edit ramen location route
router.get("/:id/edit", middleware.checkRamenOwnership, function(req, res){
	Ramen.findById(req.params.id, function(err, foundrLocation)
		{ 
		res.render("ramenLocation/edit", {ramen: foundrLocation});
		});
});
//update correct ramen location route
router.put("/:id", function(req, res){
	//find and update rLocation
	Ramen.findByIdAndUpdate(req.params.id, req.body.ramen, function(err, updatedrLocation){
		if(err){
			res.redirect("/ramenspot");
		} else {
			res.redirect("/ramenspot/" + req.params.id);
		}
	});
	//redirect
});

//destroy ramen route
router.delete("/:id", middleware.checkRamenOwnership, function(req, res){
	Ramen.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redired("/ramenspot");
		} else {
			res.redirect("/ramenspot");
		}
	});
});



module.exports = router;