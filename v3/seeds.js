var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment");

var data = [
        {
            name: "svalbard", 
            image: "https://static.foto.no/linkeddata/bildekritikk/images/newimages/1092000-1092999/1092963_xl_585E4EE6-A192-11E8-AF6A-C2148C4C0282.jpg",
            description: "Blåisen setter sitt preg i Bjørnebukta"
        },
        {
            name: "Bjørnebad", 
            image: "https://static.foto.no/linkeddata/articles/images/63646_1024x768.jpg",
            description: "Blåisen setter sitt preg i Bjørnebukta"
        },
         {
            name: "Ensom", 
            image: "https://static.foto.no/linkeddata/articles/images/63781_1024x768.jpg",
            description: "Blåisen setter sitt preg i Bjørnebukta"
        },
    ]

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err)
        }
        console.log("removed campgrounds")
    
        //Add new campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err)
                } else {
                    console.log("Added a new campground")
                    //create a comment
                    Comment.create(
                        {
                            text: "Vakkert fotografi!",
                            author: "Gunnar Gunnersen",
                       },  function(err, comment){
                            if(err){
                                console.log(err)
                            } else {
                           campground.comments.push(comment);
                           campground.save()
                           console.log("Created new comment");
                            };
                        });
                }
            })
        })
    })
}

module.exports = seedDB;