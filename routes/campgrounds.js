var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
router.get("/campgrounds",function(req,res){
   
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err.message);
		}else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

router.get("/campgrounds/new",isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});
router.post("/campgrounds",isLoggedIn,function(req,res){
    var newname=req.body.name;
	var newimage=req.body.image;
	var newdescr=req.body.descr;
	var author={
		id:req.user._id,
		username:req.user.username
	};
   Campground.create({
	name:newname, 
	image:newimage,
	description:newdescr,
	author:author
}, function(err,camp){
	if(err){
		console.log(err.message);
	} else{
		console.log(camp);
		res.redirect("/campgrounds");
	}
});
});
 
router.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(error, foundCamp){
		if(error){
			console.log(error);
		}else{
			res.render("campgrounds/show", {campground: foundCamp});
		}
	});
	
});
router.get("/campgrounds/:id/edit",checkOwner,function(req,res){
	Campground.findById(req.params.id,function(err,foundCamp){
		res.render("campgrounds/edit",{campground:foundCamp});
	});			
});
router.put("/campgrounds/:id",checkOwner,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,upd){
			res.redirect("/campgrounds/"+req.params.id);
		
	});
});
router.delete("/campgrounds/:id",checkOwner,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err,campgroundRemoved){
		
			Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect("/campgrounds");
        });
		
	});
});
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router;
function checkOwner(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,camp){
			if(err){
				res.redirect("back");
				
			}else{
				if(camp.author.id.equals(req.user._id)){
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