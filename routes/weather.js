const express = require("express"),
	router  = express.Router({mergeParams: true}),
	helperFunc = require("../helpers/parseDate");

router.get("/", (req, res) =>{
	res.render("./weather/windy.ejs");
});



router.get("/:stationId/custom", (req, res)=>{
	console.log(req.params.stationId);
	res.render("./weather/customDataForm.ejs", {id: req.params.stationId});
})

router.post("/:stationId", async (req, res)=>{
	let id = req.params.stationId;
		dateFrom = req.body.dateFrom,
		dateF = dateFrom.replace("-", "/"),dateF = dateF.replace("-", "/");
		dateTo = req.body.dateTo,
		val = req.body.channelId,
		dateTo = dateTo.replace("-", "/"),dateTo = dateTo.replace("-", "/"),
		channelId = req.body.val;
		myToken = "ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47",
		urlGetChannel = "https://api.ims.gov.il/v1/envista/stations/58";
			const options ={
			method: 'GET', // 'GET', 'PUT', 'DELETE', etc.
			headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": myToken
			},
		
		},
		valData = await helperFunc.imsRqst(urlGetChannel);
		let channelVal;
			myMap = new Map();
				myMap.set("7",'TD');myMap.set("4", 'WS');myMap.set('BP',20);myMap.set('DiffR',20);myMap.set('Grad',5);myMap.set('NIP',6);myMap.set("1", 'Rain');myMap.set('RH',8);myMap.set('STDwd',9);myMap.set("9",'TDmax'); myMap.set('TDmin',11);myMap.set('TG',12); myMap.set('Time',13);myMap.set("3", 'WDmax');myMap.set('WD',15);myMap.set('Ws10mm',16);myMap.set('WS1mm',17);myMap.set("2", 'WSmax')
		valData.monitors.forEach((item)=>{
			if(item.name ===myMap.get(val)){	
				channelVal = item.channelId;
			}
		})
		
		try{
			let url = "https://api.ims.gov.il/v1/envista/stations/"+id+"/data/"+channelVal+"?from="+dateF+"&to="+dateTo,
			
			
			responseJson 	= await helperFunc.imsRqst(url);
			if(typeof responseJson === "undefined"){
				res.send( {x:[], y:[]});
			}
			sum = 0.0,
			valuesX =[], yAxes =[];
			responseJson.data.forEach((item)=>{
			yAxes.push(""+item.datetime)
			item.channels.forEach((channel)=>{
				valuesX.push(channel.value);
				sum += parseFloat(channel.value, 10);
			})
			
			
			
		})
		console.log(sum)
		res.send( {x:valuesX, y:yAxes});
	}catch(err){
		res.send( {x:[], y:[]});
	}
})


module.exports = router;



