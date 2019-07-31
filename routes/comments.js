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
router.get("/campgrounds/:id/comments/:comment_id/edit",checkComOwner,function(req,res){
	Comment.findById(req.params.comment_id,function(err,found){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{camp_id: req.params.id, comment:found});
		}
	});
	
});
router.put("/campgrounds/:id/comments/:comment_id",checkComOwner, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,upd){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
		
	});
});

router.delete("/campgrounds/:id/comments/:comment_id",checkComOwner,function(req,res){
	
		Comment.findByIdAndRemove(req.params.comment_id,function(err){
			if(err){
		res.redirect("back");
	}else{
		res.redirect("/campgrounds/"+req.params.id);
	}
		});
	
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
	
}
function checkComOwner(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,com){
			if(err){
				res.redirect("back");
				
			}else{
				if(com.author.id.equals(req.user._id)){
					next();
				}else{
					res.redirect("back");
				}
			}
		});
	}else{
		res.redirect("back");
	}
}




module.exports=router;