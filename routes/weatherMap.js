const express = require("express"),
	router  = express.Router({mergeParams: true}),
	helperFunc = require("../helpers/parseDate");	

router.get("/", async (req, res) =>{
	//await CityData.remove({});
	res.render("./weather/weatherMap.ejs");
});

router.get("/imsRainsum", (req, res) =>{
	res.render("./weather/imsRainForcast.ejs");
});

router.get("/WeatherMonthlyInCoords/:stationId", async(req, res)=>{
	const id = req.params.stationId,
	 		tempMounth = [],dateTimeMounthly=[],
			urlMonth ="https://api.ims.gov.il/v1/envista/stations/"+id+"/data/monthly"
			responseJsonMonth	= await helperFunc.imsRqst(urlMonth),
			responseJsonMonth.data.forEach(dat =>{
				dateTimeMounthly.push(dat.datetime);
				dat.channels.forEach(channel =>{
					if(channel.name === 'TD'){
						tempMounth.push(channel.value);
					}
				})
			})
			res.send({tempMounth:tempMounth, dateTimeMounthly:dateTimeMounthly});
})



router.get("/WeatherInCoords/:stationIdcityname", async (req, res) =>{
	const data = req.params.stationIdcityname.split(","),
	 		id = data[0],
	 		cityName = data [1],
			urlLastData = "https://api.ims.gov.il/v1/envista/stations/"+id+"/data/latest",
			urlDaily ="https://api.ims.gov.il/v1/envista/stations/"+id+"/data/daily"
			
			// Request data from ims server
			responseJsonLastData 	= await helperFunc.imsRqst(urlLastData)
			responseFetchDaily = await  helperFunc.imsRqst(urlDaily)
			
			channels    	= responseJsonLastData.data[0].channels,

			//Parse the date, and adding a hour 
			
			updata = responseJsonLastData.data[0].datetime,
			time = helperFunc.converDateRep(updata)

			const tempDaily = [], timeDaily = [];
			if(responseFetchDaily !== "No content"){
				responseFetchDaily.data.forEach(element => {
					element.channels.forEach(channel =>{
						if(channel.name ==='TD'){
							tempDaily.push(channel.value);
							let toArr = element.datetime.split(":")
							timeDaily.push(toArr)
						}
					})
						
				});
			}
			let located =[];
		   	for(let i = 1; i <= 20; i++){
		    	located.push(-1);
		    }
			const myMap = new Map();
				myMap.set('TD', 1);myMap.set('WS', 2);myMap.set('BP',3);myMap.set('DiffR',4);myMap.set('Grad',5);myMap.set('NIP',6);myMap.set('Rain',7);myMap.set('RH',8);myMap.set('STDwd',9);myMap.set('TDmax',10); myMap.set('TDmin',11);myMap.set('TG',12); myMap.set('Time',13);myMap.set('WDmax',14);myMap.set('WD',15);myMap.set('Ws10mm',16);myMap.set('WS1mm',17);myMap.set('WSmax',18)
			
			for(let i =0; i <= 20; i++){
				if(typeof channels[i] !=='undefined'){
			    	located[myMap.get(channels[i].name)] = i;
				}

		0    }
		    res.render("./weather/weatherDay.ejs", {channels:channels, located: located, cityName: cityName, day, time, dailyTemp: tempDaily, timeDaily: timeDaily, id});
		   //responseJson = await responseFetch.json(),
		    //datetime = responseJson.data[0].datetime,
		    //channels =  responseJson.data[0].channels; 
			//console.log(responseJson.data[0].channels[6].name);
			//res.render("./weather/weatherDay.ejs", {response: responseJson, cityName: cityName});
			//weatherUrl = "https://api.darksky.net/forecast/bfad160449925f4b453dd4f6a6776fcb/" +lat +','+lon;
  			//weatherResponse = await fetch(weatherUrl),
  			//weatherData = await weatherResponse.json();

			//aqUrl = "https://api.openaq.org/v1/latest?coordinates=" +lat +','+lon;
  			//aqResponse = await fetch(aqUrl),
  			//aqData = await aqResponse.json();
  			//data ={
  			//	weather: weatherData,
  			//	airQuality: aqData
  			//};
  			//res.json(data);
});





module.exports = router;