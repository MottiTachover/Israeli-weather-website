
function createMap(){
	console.log("L");
	const myIcon = L.icon({
	    iconUrl: "https://img.icons8.com/ios-filled/50/000000/wind-gauge.png",
	    iconSize: [50,30],
	    iconAnchor: [22, 94],
	});
	
	const mymap = L.map('mapid').setView([0,0], 5);
	const marker = L.marker([0,0],{icon:myIcon}).addTo(mymap);
	const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      const tiles = L.tileLayer(tileUrl, { attribution });
      tiles.addTo(mymap);

	async function getIss(){
		const url = "https://api.wheretheiss.at/v1/satellites/25544";
		try{
			const response = await fetch(url),
			data = await response.json(),
			{latitude, longitude} = data;

			marker.setLatLng([latitude, longitude]);
			mymap.setView([latitude, longitude], 5)

		}catch(err){
			console.log(err);
		}
	}
}



module.exports = createMap; 