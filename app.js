var express          = require("express"),
		app							 = 	express(),
		bodyParser			 = require("body-parser");



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

	var locations = [
	{ name: "Arashi Ramen",
		image: "https://s3-media1.fl.yelpcdn.com/bphoto/n6bRWuxFtqncviQtEjpFyw/o.jpg"
	},
	{ name: "Santouka",
		image: "https://s3-media4.fl.yelpcdn.com/bphoto/HR7UdLpTMusBYvrq1n8yDA/o.jpg"
	},
	{ name: "Kizuki Ramen & Izakaya",
		image: "https://s3-media2.fl.yelpcdn.com/bphoto/ZRXbVe6-eBC3kDFEltCSFg/o.jpg" 
	}
	];

app.get("/", function(req, res) {
			res.render("landing");
		});


app.get("/ramenspot", function(req, res){

	res.render("ramenspot", {locations: locations});
});


app.post("/ramenspot", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newLocation = {
		name: name,
		image: image
	};
	locations.push(newLocation);
	res.redirect("/ramenspot")
});

app.get("/ramenspot/new", function (req, res){
		res.render("new.ejs")
});

app.listen(3000);


