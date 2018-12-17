// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});


// initialize the layer groups we'll be using
var layers = {
  AMAZON: new L.LayerGroup(),
  APPLE: new L.LayerGroup(),
  FACEBOOK: new L.LayerGroup(),
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [37.7749, -122.4194],
  zoom: 13,
  layers: [
	  layers.AMAZON,
	  layers.APPLE,
	  layers.FACEBOOK
	  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Amazon": layers.AMAZON,
  "Apple": layers.APPLE,
  "Facebook": layers.FACEBOOK,
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "topright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};

// Add the info legend to the map
info.addTo(map);








// function createMarkers(response) {
//   var locations = response.data
// } 






// var url = "";

// var 


// d3.json(url, function(response) {

//   console.log(response);

//   var heatArray = [];

//   for (var i = 0; i < response.length; i++) {
//     var location = response[i].location;

//     if (location) {
//       heatArray.push([location.coordinates[1], location.coordinates[0]]);
//     }
//   }

//   var heat = L.heatLayer(heatArray, {
//     radius: 20,
//     blur: 35
//   }).addTo(myMap);

// });
