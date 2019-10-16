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
		const myToken = process.env.MYTOKEN,
			options ={
			method: 'GET', // 'GET', 'PUT', 'DELETE', etc.
			headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": myToken
			},
		
		};

		fetchData = await fetch(url, options);
		console.log(fetchData)
		if(fetchData.status === 200){
			valData = await fetchData.json();
			return valData;
		}
		else{
			console.log("zzzzzzz")

			return "No content";
		}
	}

module.exports = functions;
