var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/movieApp");

var movieschema = new mongoose.Schema({
	name : String,
	image : String,
	summary: String
});

var Movie = mongoose.model("Movie", movieschema);

/*Movie.create({
	name : "Harry Potter and the Order of the Phoenix",
	image : "https://bit.ly/2IcnSwz",
	summary:"Harry Potter and Dumbledore's warning about the return of Lord Voldemort is not heeded by the wizard authorities who, in turn, look to undermine Dumbledore's authority at Hogwarts and discredit Harry."
});*/

app.get("/", function(req,res){
	res.redirect("/movies");
});
 


app.get("/movies",function(req,res){
	Movie.find({} ,function(err,movies){
		if(err){
			console.log(err);
		}
		else
		{
			res.render("index", {movies : movies});		
		}

	});
	
});

app.get("/movies/new", function(req,res){
	res.render("new");
});

app.post("/movies", function(req,res){
	var name = req.body.title;
	var image = req.body.image;
	var summary = req.body.summary;

	Movie.create({name,image,summary}, function(err,newMovie){
		if(err)
		{
			res.render("new");
		}
		else{
			res.redirect("/movies")
		}
	});
});

var port =8000;
app.listen(port, function(){
	console.log("We are running on port " + port);
});