const express = require("express"),
	router  = express.Router({mergeParams: true}),
	CityData = require("../models/cities.js");


router.get("/", async(req, res)=>{
	//await CityData.remove({});
    const data = await CityData.find({});
    res.json(data);
});


//NEW - show form to create new campground
router.get("/new", function(req, res){
	res.render("city/new.ejs"); 
});


//CREATE - add new city to DB
router.post("/",async function(req, res){
    // get data from form and add to campgrounds array
    const 	lat = req.body.lat,
    		lon = req.body.lon,
    		cityName = req.body.cityName,
    		newCityData = {lat, lon, cityName};
    // Create a new campground and save to DB
    loadLocationToDB(newCityData);
    res.redirect("../weatherMap");
});


router.get("/ims", async(req, res)=>{
        let url = "https://api.ims.gov.il/v1/envista/stations",
        myToken = "ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47";
        const options ={
        method: 'GET', // 'GET', 'PUT', 'DELETE', etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": myToken
        },
    
    },
    val = await fetch(url, options);
    valData = await val.json();
    loadTOdb(valData);
});



function loadTOdb(stations){
    stations.forEach((station)=>{
        if(typeof station.location.latitude!== 'undefined' &&  station.location.latitude!== null &&  station.location.latitude !==''){
            const   lat = station.location.latitude,
                    lon = station.location.longitude,
                    cityName = station.name,
                    stationId =  station.stationId;
                    newCityData = {lat, lon, cityName, stationId};
                    loadLocationToDB(newCityData);
        }
    });
}

function loadLocationToDB(newCityData){
    CityData.create(newCityData, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
        }
    });
}
module.exports = router;

