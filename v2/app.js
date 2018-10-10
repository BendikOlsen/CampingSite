var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")
    


var connection  = mongoose.createConnection("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs")



// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});


var Campground = connection.model('Campground', campgroundSchema);

// Campground.create(
//     {
//         name:"Bogstadvannet",
//         image: "https://static.foto.no/linkeddata/articles/images/57907_1024x768.jpg",
//         description: "Dette vannet ligger rett sør for Bogstad Camping. Ingen toalett fasiliteter"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEW CAMPGROUND");
//             console.log(campground);
//         }
//     });

    
app.get("/", function(req, res){
    res.render("landing")
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all camgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    })
});

//CREATE - add new campgrounds to database
app.post("/campgrounds", function(req, res){
    // get data from form and add to camgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampGround = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Campground.create(newCampGround, function(err, newCampGround){
        if(err){
            console.log(err)
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    })
});

//NEW - show form to create new campgrounds
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
})
// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
             //render show template with that campground
            res.render("show", {campground: foundCampground})
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCampServer has started")
})