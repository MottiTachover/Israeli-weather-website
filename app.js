const express = require("express"),
	app =express(),
	indexRoutes = require("./routes/index.js"),
	weatherRoutes = require("./routes/weather.js"),
	weatherMapRoutes = require("./routes/weatherMap.js"),
	cityRoutes = require("./routes/city.js"),
	bodyParser  = require("body-parser"),
	mongoose    = require("mongoose"),
	CityData = require("./models/cities.js"),
	helperFunc = require("./helpers/parseDate");

setInterval(upDateDB, 1000000);
async function upDateDB(){
	console.log("update")
	const	DBurl = "http://localhost:3000/city",
  		 	citiesDBResponse = await fetch(DBurl),
			citiesDBData = await citiesDBResponse.json();
			let url ="";
			for(city of citiesDBData){
				url = "https://api.ims.gov.il/v1/envista/stations/"+city.stationId+"/data/latest"
						respose 	= await helperFunc.imsRqst(url),
						channels    = respose.data[0].channels,
						temp = 0,
						rhNew = 0;
						for(channel of channels){							
							if(channel.name =='TD'){
								temp = channel.value;
							}
							if(channel.name =='RH'){
								rhNew = channel.value;
							}
							
						}
						console.log(city.temperature)
						console.log(temp)
						CityData.updateOne(
							{ "_id": city._id}, // Filter
							{$set: {"temperature": temp, "rh": rhNew}}, // Update
							{upsert: true} // add document with req.body._id if not exists 
		  
					   )
					  .then((obj) => {
						 console.log('Updated - ' + obj);
				   })
				  .catch((err) => {
					 console.log('Error: ' + err);
				}) }

								}					//show cudtom data page
global.fetch = require('node-fetch')

mongoose.connect("mongodb+srv://devs:nav132435@cluster0-jtyln.mongodb.net/test?retryWrites=true&w=majority", {
   useNewUrlParser: true,
   useCreateIndex: true
}).then(()=>{
	console.log("Connected");
}).catch(err => {
	console.log(err.message)
});	



app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use("/", indexRoutes);
app.use("/weatherMap", weatherMapRoutes);
app.use("/weather", weatherRoutes);
app.use("/city", cityRoutes);

app.get("/ims", async(req, res)=>{
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
	res.redirect("back");
});

function loadTOdb(stations){
	stations.forEach((station)=>{
		if(typeof station.location.latitude!== 'undefined' &&  station.location.latitude!== null &&  station.location.latitude !=='')
		console.log(station.location.latitude);
	})
}


app.listen(3000, ()=>console.log("Started"));