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
		if(hour == 25){
			hour = 1;
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
		
		},
		fetchData = await fetch(url, options);
		if(fetchData.status === 200){
			valData = await fetchData.json();
			return valData;
		}
		else{
			return "No content";
		}
	}

module.exports = functions;
