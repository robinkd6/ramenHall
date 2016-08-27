var express          = require("express"),
		app							 = 	express(),
		bodyParser			 = require("body-parser"),
		mongoose 				 = require("mongoose");


mongoose.connect("mongodb://localhost/ramen_hall");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


//schema set up
var ramenSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Ramen = mongoose.model("Ramen", ramenSchema);

// Ramen.create(
// 	{ 
// 		name: "Kizuki Ramen & Izakaya",
// 		image: "http://www.seattleglobalist.com/wp-content/uploads/2015/03/ramen-kukai.jpg",
// 		description: "Miso Garlic Tonkatsu Ramen with 2 eggs"
// 	}, function(err, ramen) {
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("NEWLY CREATED RAMEN");
// 			console.log(ramen);
// 		}
// 	});


app.get("/", function(req, res) {
			res.render("landing");
		});

//rLocations = ramen locations
app.get("/ramenspot", function(req, res){
	//Get all locations from DB
	Ramen.find({}, function(err, rLocations){
		if(err){
			console.log(err);
		} else {
			res.render("ramenspot", {locations: rLocations});
		}
	});
	
});


app.post("/ramenspot", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newrLocation = {
		name: name,
		image: image
	};
	//create new ramen location and save to db
	Ramen.create(newrLocation, function(err, newlyCreated){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/ramenspot")
		}
	});
});


//NEW - show form to create new ramen spot
app.get("/ramenspot/new", function (req, res){
		res.render("new.ejs")
});

//SHOW - displays info about ramen
app.get("/ramenspot/:id", function(req, res){
	res.send(show);
});

app.listen(3000);


