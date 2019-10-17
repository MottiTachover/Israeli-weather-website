CityData = require("../models/cities.js"),
helperFunc = require("../helpers/parseDate");


let functions ={};
	functions.converDateRep = function (Date){
    let dateSplit = Date.split("T");
		day = dateSplit[0],
		day = day.replace("-", "/"),day = day.replace("-", "/");
		hour = dateSplit[1],
		hour = hour.split("+")[0],
		hourSplit = hour.split(":"),
		minuts = hourSplit[1],
		hour = parseInt(hourSplit[0], 10),
		hour+=1;
		if(hour == 24){
			hour = 0;
		}
		if(hour < 10){
			hour = "0"+hour
		}
    return time = ""+hour+":"+minuts
}
functions.imsRqst = async (url)=>{
	const myToken = "ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47",
		options ={
			method: 'GET', // 'GET', 'PUT', 'DELETE', etc.
			headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": myToken
			},
		
		};

		fetchData = await fetch(url, options);
		if(fetchData.status === 200){
			valData = await fetchData.json();
			return valData;
		}
		else{
			
			return "No content";
		}
}

//Return all the stations in the DB  
functions.stationsInDB = async()=>{
	const data = await CityData.find({});
		return data;
}

functions.updataDBValues = async () =>{
	citiesDBData = await functions.stationsInDB()
	let url ="";
	for(city of citiesDBData){
		url = "https://api.ims.gov.il/v1/envista/stations/"+city.stationId+"/data/latest"
			respose 	= await functions.imsRqst(url),
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
							
			CityData.updateOne(
				{ "_id": city._id}, // Filter
				{$set: {"temperature": temp, "rh": rhNew}}, // Update
				{upsert: true} // add document with req.body._id if not exists 
			  )
			.then((obj) => {})
			.catch((err) => {
				console.log('Error: ' + err);
			}) 
	}
	
}

module.exports = functions;
