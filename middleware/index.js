
var Ramen   = require("../models/ramen");
var Comment = require("../models/comment");
//all middleware goes here
var middlewareObj = {};

middlewareObj.checkRamenOwnership = function(req, res, next) {
		if(req.isAuthenticated()){
			Ramen.findById(req.params.id, function(err, foundrLocation){
				if (err){
					req.flash("error", "Ramen spot not found");
					res.redirect('back');
				} else {
					 if(foundrLocation.author.id.equals(req.user._id)) {
					 	next();
					} else {

					 		res.redirect('back');
					}
				}
			});
		} else {
				req.flash("error", "You must be logged in to do that");
				res.redirect('back');
		}
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
		if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundrComment){
				if (err){
					res.redirect("back");
				} else {
					 if(foundrComment.author.id.equals(req.user._id)) {
					 	next();
					} else {
							req.flash("error", "Action not authorized");
					 		res.redirect('back');
					}
				}
			});
		} else {
				req.flash("error", "You must be logged in to do that");
				res.redirect('back');
		}
};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that")
	res.redirect("/login");
};

module.exports = middlewareObj;

