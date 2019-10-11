var mongoose = require("mongoose");
 
var citySchema = new mongoose.Schema( {
	lat: Number ,
	lon: Number ,
	cityName: String,
	stationId: Number,
	temperature: Number,
	rh:  Number	
 });
module.exports = mongoose.model("citySchema", citySchema);
