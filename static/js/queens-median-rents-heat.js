/***************************************************************
 *    Written by: PAUL AGGARWAL
 *    Rutgers Data Science Bootcamp NJ
 */
// Amazon icon at Long Island City
var Icon = L.Icon.extend({
  options: {
  iconSize:     [47, 47], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  }
});
var amazonIcon = new Icon({iconUrl: 'amazon-icon.png'});
var appleIcon = new Icon({iconUrl: 'apple-icon.png'});
var googleIcon = new Icon({iconUrl: 'google-icon.png'});

// IMPORTANT: initialize global variable for heatmap layer to toggle between different data sets
var heat = {};

// Creating map object around San Mateo (part of Silicon Valey)
var myMap = L.map("map", {
  center: [37.5630, -122.3255],
  zoom: 10,
  //layers: [heat]
});

// Amazon HQ1 Seattle
L.marker([47.615144,-122.338578], {icon: amazonIcon}).addTo(myMap);
// Amazon HQ2 Long Island City
L.marker([40.7447,-73.9485], {icon: amazonIcon}).addTo(myMap);
//
L.marker([37.3318, -122.0312], {icon: appleIcon}).addTo(myMap);
L.marker([37.4220, -122.0841], {icon: googleIcon}).addTo(myMap);


// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


  
// ******************* INITIALIZE HEATMAP UNTIL USE SLIDER ***************
d3.json("/2011", function(response) {
    //var loc = response.features[1];
    //console.log(response);
    var heatArray = [];
    //console.log("START: ", response.length, heatArray.length);
    for (var i = 0; i < response.length; i++) {
      var location = ([response[i].lat, response[i].lon, response[i].ZRI/100]) ;
     //console.log(response[i].Year, response[i].Metro,location);
  
      if (location) { //console.log(location[1], location[0]) *** WORKING NOW ***
        heatArray.push([location[0], location[1], location[2]]);
      }
    } //console.log("HEATMAP1:",heatArray.length);
    heat = L.heatLayer(heatArray, {
        radius: 50,
        blur: 35,
        //gradient: {0.4: 'blue', 0.65: 'red', 1: 'red'}
    }).addTo(myMap);
    //console.log("END: ", response.length, heatArray.length);
});

function updateMap(loc) {

  switch (loc) {
    case "Silicon Beach":
      myMap.flyTo({lat: 34.0736, lng: -118.4004}, 11);
      break;
    case "Silicon Valley":
      myMap.flyTo({lat: 37.5630, lng: -122.3255}, 10);  
      break;
    case "Amazon HQ 1":
      myMap.flyTo({lat: 47.615144, lng: -122.338578}, 11);
      break;
    case "Amazon HQ 2":
      myMap.flyTo({lat: 40.7000, lng: -73.8566}, 12);
      break;
    case "Silicon Valley":
      myMmap.flyTo({lat: 37.5630, lng: -122.3255}, 12);
  }
};

function updateYear(yr) {
  if (yr > 2019 && yr < 2023) { yr = 2019};
  d3.json("/"+yr, function(response) {
    //var loc = response.features[1];
    //console.log(response);
   
    var heatArray = [];
    //console.log("START UPDATE: ", response.length, heatArray.length);
    for (var i = 0; i < response.length; i++) {
      var location = ([response[i].lat, response[i].lon, response[i].ZRI/100]) ;
      //console.log(response[i].Year, response[i].Metro,location);
  
      if (location) { //console.log(location[1], location[0]) *** WORKING NOW ***
        heatArray.push([location[0], location[1], location[2]]);
      }
    } 
    if (heat != undefined) { myMap.removeLayer(heat)}
    //console.log(heatArray);
    heat = L.heatLayer(heatArray, {
      radius: 50,
      blur: 35,
      //gradient: {0.4: 'blue', 0.65: 'red', 1: 'red'}
    }).addTo(myMap);
    
    //console.log("END UPDATE: ", response.length, heatArray.length);
  });
};
