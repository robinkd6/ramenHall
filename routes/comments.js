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

//comments edit route
router.get("/:comment_id/edit", function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {ramen_id: req.params.id, comment: foundComment} );
		}
	});
});
//comment udpate
router.put("/:comment_id", function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/ramenspot/" + req.params.id);
		}
	})
})

//middleware
function isLoggedIn(req, res, next)
{
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;