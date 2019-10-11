var mongoose = require("mongoose");
 
var weatherSchema = new mongoose.Schema( {
	lan: String,
	lon: String,
	weather : mongoose.Types.ObjectId,
	airQuality : mongoose.Types.ObjectId 
	
 });
module.exports = mongoose.model("weather", weatherSchema);
