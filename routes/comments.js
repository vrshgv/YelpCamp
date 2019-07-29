//COMMENTS
var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
router.get("/campgrounds/:id/comments/new",isLoggedIn, function(req,res){
	Campground.findById(req.params.id,function(err,foundCamp){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			res.render("comments/new", {camp: foundCamp});
		}
	});
	
});
router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
	Campground.findById(req.params.id, function(err, foundCamp){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			console.log(req.body.comment);
			Comment.create(req.body.comment,function(err,createdCom){
				if(err){
					console.log(err);
					
				}else{
					createdCom.author.id=req.user._id;
					createdCom.author.username=req.user.username;
					createdCom.save();
					foundCamp.comments.push(createdCom);
					foundCamp.save();
					res.redirect("/campgrounds/"+req.params.id);
				}
			});
			
		}
	});
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router;