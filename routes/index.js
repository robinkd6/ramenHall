var express  = require("express");
var router 	 = express.Router();
var passport = require("passport");
var User 		 = require("../models/user");

//root route
router.get("/", function(req, res) {
			res.render("landing");
		});

router.get("/signup", function(req,res){
	res.render("signup");
});
//signup logic
router.post("/signup", function(req, res){
	var newUser = new User({firstname: req.body.firstname, lastname: req.body.lastname, username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err);
			return res.render("signup");
		} 
		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Welcome to RamenHall " + user.username);
			res.redirect("/ramenspot");
		});
	});
});

//show login form
router.get("/login", function(req, res)
{
	res.render("login");
});
//Middleware = passport.authenticate + login logic
router.post("/login", passport.authenticate("local", 
{
	successRedirect: "/ramenspot",
	failureRedirect: "login"
}), function(req, res) {
	console.log("works");

});

//logout route
router.get('/logout', function(req, res)
{
	req.logout();
	req.flash("success", "Logged you out");
	// var _LoggedIn = (req.isAuthenticated() ? true : false);
	res.redirect("/ramenspot");
});



module.exports = router;