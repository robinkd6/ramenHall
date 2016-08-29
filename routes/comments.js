var express = require("express");
//merge params from ramenspots
var router 	= express.Router({mergeParams: true});
var Ramen   = require("../models/ramen");
var Comment = require("../models/comment");

//New Comments
router.get("/new", isLoggedIn, function(req, res){
	//find by id for new comments to use
	Ramen.findById(req.params.id, function(err, ramen){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {ramen: ramen});
		}
	});
});

//create comments
router.post("/", function(req, res){
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
					//add uesrname and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					ramen.comments.push(comment);
					ramen.save();
					console.log(comment);
					res.redirect('/ramenspot/' + ramen._id);
				}
			});
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