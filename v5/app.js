var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds")
  
mongoose.connect("mongodb://localhost/yelp_camp_v4", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
seedDB();

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
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
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
    res.render("campgrounds/new");
})
// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            console.log(foundCampground)
             //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        }
    });
})

// COMMENT ROUTES

app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
})

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to campground
   //redirect campground show page
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCampServer has started")
})