var express=require("express");
var app=express();
const mongoose=require('mongoose');
var Campground=require("./models/campground");
var seedDB=require("./seeds");
var Comment=require("./models/comment");
 	passport = require("passport");
	localStrategy = require("passport-local");
	passportLocalMongoose = require("passport-local-mongoose");
	User=require("./models/user");
var indexRoutes=require("./routes/index");
	campRoutes=require("./routes/campgrounds");
	commentRoutes=require("./routes/comments");
var methodOverride=require("method-override");

mongoose.connect("mongodb://localhost:27017/yelp",{ useNewUrlParser: true }); 
app.set("view engine", "ejs");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static("public"));
app.listen("3000",function(){
    console.log("server is started");
});

   // seedDB();
/////////////////////
//////////////////
app.use(methodOverride("_method"));
app.use(require("express-session")({
	secret: "hmmm dunno",
	resave:false,
	saveUninitialized:false
}
));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));
/////////////////////////////
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});
app.use(indexRoutes);
app.use(campRoutes);
app.use(commentRoutes);





