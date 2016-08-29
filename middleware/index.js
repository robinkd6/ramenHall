//all middleware goes here
var middleWareObj = {};

middleWareObj.checkRamenOwenership = function() {
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

middleWareObj.checkCommentOwnership = function(req, res, next) {
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

middleware.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
	};

module.exports = middleWareObj;