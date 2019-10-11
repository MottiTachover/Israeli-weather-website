var mongoose = require("mongoose");
 
var citySchema = new mongoose.Schema( {
	lan: String,
	lon: String, 	
 });
module.exports = mongoose.model("citySchema", citySchema);
