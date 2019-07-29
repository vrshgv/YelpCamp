var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");
 var data=[
	 {
		 name:"First Camp",
		 image:"https://timedotcom.files.wordpress.com/2017/03/time-health-stock-sleep-camping.jpg",
		 description:"lalaallalalallalala"
	 },
	 {
		 name:"Second Camp",
		 image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoaNa_zk030CCSoe1ReEubXUIvaA_LbetJc9oWZbUvhSyoyvG3",
		 description:"lalaallalalallalala"
	 },
	 {
		 name:"Thied Camp",
		 image:"https://avatars.mds.yandex.net/get-pdb/1364974/d7b4dea8-2698-4aa3-821e-3de63c695800/orig",
		 description:"ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more rece"
	 }
 ];

function seedDB(){
	Campground.deleteMany({},function(err){
		if(err){
			console.log(err);
		
		}
		});
}
	// 	console.log("removed camps");
	// 	data.forEach(function(seed){
	// 		Campground.create(seed,function(err,camp){
	// 			if(err){
	// 				console.log(err);
	// 			}else{
	// 				console.log("added camps");
	// 				Comment.create({text: "this plce is great", author:"Someone"},function(err,createdCom){
	// 					if(err){
	// 						console.log(err);
	// 					}else{
	// 						camp.comments.push(createdCom);
	// 						camp.save();
	// 						console.log("com is saved");
	// 					}
	// 				});
	// 			}
	// 		});
	// 	});
			
		
	// });
//}
module.exports=seedDB;