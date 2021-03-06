var express = require("express");
//merge params from ramenspots
var router 	= express.Router({mergeParams: true});
var Ramen   = require("../models/ramen");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//New Comments
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
	//lookup campground using id
	Ramen.findById(req.params.id, function(err, ramen){
		if(err){
			console.log(err);
			res.redirect("/ramenspot");
		} else {
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error", "Unable to post comment");
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
					req.flash("success", "Comment added");
					res.redirect('/ramenspot/' + ramen._id);
				}
			});
		}
	});
});

//comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {ramen_id: req.params.id, comment: foundComment} );
		}
	});
});
//comment udpate
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/ramenspot/" + req.params.id);
		}
	});
});

//destroy comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted");
			res.redirect("/ramenspot/" + req.params.id);
		}
	});
});



module.exports = router;