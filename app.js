const express = require("express"),
	app =express(),
	indexRoutes = require("./routes/index.js"),
	weatherRoutes = require("./routes/weather.js"),
	weatherMapRoutes = require("./routes/weatherMap.js"),
	cityRoutes = require("./routes/city.js"),
	bodyParser  = require("body-parser"),
	mongoose    = require("mongoose"),
	helperFunc = require("./helpers/parseDate");

	mongoose.connect("mongodb+srv://devs:nav132435@cluster0-jtyln.mongodb.net/test?retryWrites=true&w=majority" || "mongodb://localhost:27017", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true 
	 }).then(()=>{
		 console.log("Connected");
	 }).catch(err => {
		 console.log(err.message)
	 });	
	 
setInterval(helperFunc.updataDBValues, 60000);
					//show cudtom data page
global.fetch = require('node-fetch')





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


app.listen(process.env.PORT || 5000,process.env.Host ||'0.0.0.0', ()=>console.log("Started"));