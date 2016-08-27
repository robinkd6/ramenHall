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
	image: String
});

var Ramen = mongoose.model("Ramen", ramenSchema);

// Ramen.create(
// 	{ 
// 		name: "Santouka",
// 		image: "https://c.o0bg.com/rf/image_960w/Boston/2011-2020/2015/03/26/BostonGlobe.com/Arts/Images/Boghosian_05plated2_LIFE.jpg"
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
	var newLocation = {
		name: name,
		image: image
	};
	//create new ramen location and save to db
	res.redirect("/ramenspot")
});

app.get("/ramenspot/new", function (req, res){
		res.render("new.ejs")
});

app.listen(3000);


