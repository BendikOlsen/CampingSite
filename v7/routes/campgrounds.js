var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground")

// index route - show all campgrounds
router.get("/", function(req, res){
    // Get all camgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    })
})

// create route - add new campgrounds to database
router.post("/", function(req, res){
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
})

// new route - show form to create new campgrounds
router.get("/new", function(req, res){
    res.render("campgrounds/new")
})
// show route - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            console.log(foundCampground)
             //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})


module.exports = router