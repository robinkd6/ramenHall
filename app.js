var express          = require("express"),
		app							 = 	express(),
		bodyParser			 = require("body-parser"),
		mongoose 				 = require("mongoose"),
		passport				 = require("passport"),
		LocalStrategy    = require("passport-local"),
		methodOverride   = require("method-override"),
		flash 					 = require("connect-flash"),
		Ramen			       = require("./models/ramen"),
		Comment 				 = require("./models/comment"),
		User             = require("./models/user"),
		seedDB					 = require("./seeds");

//require routes
var commentRoutes 	 = require("./routes/comments"),
		ramenRoutes 		 = require("./routes/ramenspots"),
		authRoutes  		 = require("./routes/index");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
//seed the database + start file
// seedDB();

//serving public file
app.use(express.static(__dirname + "/public"));


//passport configuration
app.use(require("express-session")({
	secret: "Black garlic ramen is better than miso",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	//MOVE ONTO NEXT MIDDLEWARE
	next();
});

app.use(authRoutes);
app.use("/ramenspot", ramenRoutes);
app.use("/ramenspot/:id/comments", commentRoutes);

var url = process.env.DATABASEURL || "mongodb://localhost/ramen_hall";
mongoose.connect(url);


app.listen(process.env.PORT || 3000, function(){
   console.log("The Server Has Started!");
});


