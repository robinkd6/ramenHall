var express          = require("express"),
		app							 = 	express(),
		bodyParser			 = require("body-parser"),
		mongoose 				 = require("mongoose"),
		Ramen			       = require("./models/ramen"),
		Comment 				 = require("./models/comment"),
		seedDB					 = require("./seeds");






mongoose.connect("mongodb://localhost/ramen_hall");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//use to start file
seedDB();

//serving public file
app.use(express.static(__dirname + "/public"));

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
			res.render("ramenLocation/ramenspot", {rlocations: rLocations});
		}
	});
	
});


app.post("/ramenspot", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newrLocation = {
		name: name,
		image: image,
		description: desc
	};
	//create new ramen location and save to db
	Ramen.create(newrLocation, function(err, newlyCreated){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/ramenspot");
		}
	});
});


//NEW - show form to create new ramen spot
app.get("/ramenspot/new", function (req, res){
		res.render("ramenLocation/new");
});

//SHOW - displays info about ramen
app.get("/ramenspot/:id", function(req, res){
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

// =======================
// Comments routes
// =======================
app.get("/ramenspot/:id/comments/new", function(req, res){
	//find by id for new comments to use
	Ramen.findById(req.params.id, function(err, ramen){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {ramen: ramen});
		}
	});
});

app.post("/ramenspot/:id/comments", function(req, res){
	//lookup campground using id
	Ramen.findById(req.params.id, function(err, ramen){
		if(err){
			console.log(err);
			res.redirect("/ramenspot");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					ramen.comments.push(comment);
					ramen.save();
					res.redirect('/ramenspot/' + ramen._id);
				}
			});
		}
	});
});

app.listen(3000);


