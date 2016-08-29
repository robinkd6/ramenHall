
var Ramen   = require("../models/ramen");
var Comment = require("../models/comment");
//all middleware goes here
var middlewareObj = {};

middlewareObj.checkRamenOwnership = function(req, res, next) {
		if(req.isAuthenticated()){
			Ramen.findById(req.params.id, function(err, foundrLocation){
				if (err){
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
				res.redirect('back');
		}
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
		if(req.isAuthenticated()){
			Comment.findById(req.params.comment_id, function(err, foundrComment){
				if (err){
					res.redirect("back");
				} else {
					 if(foundComment.author.id.equals(req.user._id)) {
					 	next();
					} else {
					 		res.redirect('back');
					}
				}
			});
		} else {
				res.redirect('back');
		}
};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

module.exports = middlewareObj;