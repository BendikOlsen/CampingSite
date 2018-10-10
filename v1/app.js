var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")
    



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs")

app.get("/", function(req, res){
    res.render("landing")
});

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var connection  = mongoose.createConnection("mongodb://localhost/yelp_app", { useNewUrlParser: true });
var Campground = connection.model('Campground', campgroundSchema);

Campground.create(
    {
        name: "Bogstadvannet", 
        image: "https://static.foto.no/linkeddata/articles/images/57907_1024x768.jpg"
        
    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("NEW CAMPGROUND");
            console.log(campground);
        }
    });

var campgrounds = [
        {name: "Bogstadvannet", image: "https://static.foto.no/linkeddata/articles/images/57907_1024x768.jpg"},
        {name: "Huk", image: "https://static.foto.no/linkeddata/articles/images/57911_1024x768.jpg"},
        {name: "Lofoten", image: "https://static.foto.no/linkeddata/articles/images/57909_1024x768.jpg"},
        {name: "Hvasser", image:"https://static.foto.no/linkeddata/articles/images/57906_1024x768.jpg"},
        ]
        
app.get("/campgrounds", function(req, res){
        res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
    // get data from form and add to camgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampGround = {name: name, image: image}
    campgrounds.push(newCampGround);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCampServer has started")
})