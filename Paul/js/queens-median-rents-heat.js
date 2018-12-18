var firstLayer = new L.LayerGroup();
var secondLayer = new L.LayerGroup();

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


// Creating map object around QUEENS FLUSHING MEADOW CORONA PARK
var myMap = L.map("map", {
  center: [40.7397, -73.8408],
  zoom: 12,
  layers: [firstLayer, secondLayer]
});

// NOTE- Amazon new HQ loc Queens Long Island City
L.marker([47.615144,-122.338578], {icon: amazonIcon}).addTo(myMap);
L.marker([40.7447,-73.9485], {icon: amazonIcon}).addTo(myMap);
L.marker([37.3318, -122.0312], {icon: appleIcon}).addTo(myMap);
L.marker([37.4220, 122.0841], {icon: googleIcon}).addTo(myMap);


// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

/* ===================================================================================================
// Link to GeoJSON
var APILink = "http://data.beta.nyc//dataset/d6ffa9a4-c598-4b18-8caf-14abde6a5755/resource/74cdcc33-512f-439c-a43e-c09588c4b391/download/60dbe69bcd3640d5bedde86d69ba7666geojsonmedianhouseholdincomecensustract.geojson";

var geojson;

// Grab data with d3
d3.json(APILink, function (data) {

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "MHI",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.LOCALNAME + ", " + feature.properties.State + "<br>Median Household Income:<br>" +
        "$" + feature.properties.MHI);
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Median Income</h1>" +
      "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function (limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});
=====================================================================================================*/ 
/*
// Grab data with d3
d3.json("top3_tech_loc_zri_hist.geojson", function (data) {
  //var markers = L.markerClusterGroup();
  // Loop through data
  for (var i = 0; i < data.length; i++) {

    // Set the data location property to a variable
    var location = data[i].location;
    console.log(location.coordinates[1], location.coordinates[0]);
    // Check for location property
    if (location) {

      // Add a new marker to the cluster group and bind a pop-up
      L.marker([location.coordinates[1], location.coordinates[0]])
        .bindPopup(response[i].ZRI);
    }
  };
  var myLayer = L.geoJSON().addTo(map);
  myLayer.addData(geojsonFeature);
*/
//
 /* d3.json("top3_tech_loc_zri_hist.geojson", function (data) {
    geojson = L.choropleth(data, {

      // Define what  property in the features to use
      valueProperty: "ZRI",

      // Set color scale
      scale: ["#ffffb2", "#b10026"],

      // Number of breaks in step range
      steps: 10,

      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },

      // Binding a pop-up to each layer
      onEachFeature: function (feature, layer) {
        layer.bindPopup("Zip Code: " + feature.properties.Zipcode + "<br>County: " + feature.properties.CountyName + "<br>Median Household Rent:<br>" +
          "$" + feature.properties.ZRI);
      }
    }).addTo(myMap);
  });*/


d3.json("median-rents.json", function(response) {
    //var loc = response.features[1];
    //console.log(response.ZRI);
  
    var heatArray = [];
  
    for (var i = 0; i < response.length; i++) {
      var location = ([response[i].lat, response[i].lon, response[i].ZRI/1000]) ;
      //console.log(location);
  
      if (location) { //console.log(location[1], location[0]) *** WORKING NOW ***
        heatArray.push([location[0], location[1], location[2]]);
      }
    } console.log(heatArray[2]);
    var heat = L.heatLayer(heatArray, {
        radius: 40,
       // blur: 35,
        //gradient: {0.4: 'blue', 0.65: 'red', 1: 'red'}
    }).addTo(myMap);
});

