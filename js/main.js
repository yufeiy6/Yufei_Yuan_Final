/* ==================================
      Add Park Polygons to Basemap
=================================== */
//set style of parks
var myStyle4 = function(feature) {
    return {color: '#01B6AD', fillColor:'#01B6AD', fillOpacity: 0.7, weight:0.5};
};

//add parks data to map
parksData = "https://raw.githubusercontent.com/yufeiy6/Data_Final/master/PPR_Assets.geojson";

$.ajax(parksData).done(function(data) {
  var parsedData4 = JSON.parse(data);
  featureGroup4 = L.geoJson(parsedData4, {style:myStyle4}).addTo(map);
});


//hide alert bar at first
$(".alert").hide();




/* =========================
          Schools
========================== */
// Global Variables
var myFeatures;

// Initialize Leaflet Draw
var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    circlemarker: false,
    marker: true,
    rectangle: false
  }
});
map.addControl(drawControl);

//add stop layer
var data;
schoolsData = "https://raw.githubusercontent.com/yufeiy6/Data_Final/master/Schools.geojson";

//set contents for popup and sidebar appending
function addPopUp1(feature, layer) {
  var popupContent1 = feature.properties.FACIL_NAME;
  layer.bindPopup("School: " + popupContent1).openPopup();
  layer.on('click', function(e) {
  $(".sidebar .card").html(" <b>School </b>");
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Name: </i> ");
  $(".sidebar .card").append(feature.properties.FACIL_NAME);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Grade: </i> ");
  $(".sidebar .card").append(feature.properties.GRADE_LEVEL);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Address: </i> ");
  $(".sidebar .card").append(feature.properties.FACIL_ADDRESS);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Zip Code: </i> ");
  $(".sidebar .card").append(feature.properties.ZIPCODE);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Telephone: </i> ");
  $(".sidebar .card").append(feature.properties.FACIL_TELEPHONE);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append("<br>");
});
}

//point to layer
$.ajax(schoolsData).done(function(dat) {
  data = JSON.parse(dat);
  stopLayer = L.geoJson(data, {
    pointToLayer: function createCustomIcon1(feature, latlng) {
      let myIcon1 = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/yufeiy6/Icon/master/school.png',
        iconSize: [18, 18], // width and height of the image in pixels
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
      });
      return L.marker(latlng, {
        icon: myIcon1
      });
    },
    onEachFeature: addPopUp1,
  }).addTo(map);

  //randomly assign schools info onto sidebar
  let random1 = [];
  random1.push(Math.floor(Math.random()*547));
  $(".sidebar .card1").append(" <b>School </b>");
  $(".sidebar .card1").append("<br>");
  $(".sidebar .card1").append(" <i>Name: </i> ");
  $(".sidebar .card1").append(data.features[random1].properties.FACIL_NAME);
  $(".sidebar .card1").append("<br>");
  $(".sidebar .card1").append(" <i>Grade: </i> ");
  $(".sidebar .card1").append(data.features[random1].properties.GRADE_LEVEL);
  $(".sidebar .card1").append("<br>");
  $(".sidebar .card1").append(" <i>Address: </i> ");
  $(".sidebar .card1").append(data.features[random1].properties.FACIL_ADDRESS);
  $(".sidebar .card1").append("<br>");
  $(".sidebar .card1").append(" <i>Zip Code: </i> ");
  $(".sidebar .card1").append(data.features[random1].properties.ZIPCODE);
  $(".sidebar .card1").append("<br>");
  $(".sidebar .card1").append(" <i>Telephone: </i> ");
  $(".sidebar .card1").append(data.features[random1].properties.FACIL_TELEPHONE);
  $(".sidebar .card1").append("<br>");
  $(".sidebar .card1").append("<br>");

  //change-a-group button function
  $(".changeAGroup").click(function() {
    random1 = [];
    random1.push(Math.floor(Math.random()*547));
    $(".sidebar .card1").html(" <b>School </b>");
    $(".sidebar .card1").append("<br>");
    $(".sidebar .card1").append(" <i>Name: </i> ");
    $(".sidebar .card1").append(data.features[random1].properties.FACIL_NAME);
    $(".sidebar .card1").append("<br>");
    $(".sidebar .card1").append(" <i>Grade: </i> ");
    $(".sidebar .card1").append(data.features[random1].properties.GRADE_LEVEL);
    $(".sidebar .card1").append("<br>");
    $(".sidebar .card1").append(" <i>Address: </i> ");
    $(".sidebar .card1").append(data.features[random1].properties.FACIL_ADDRESS);
    $(".sidebar .card1").append("<br>");
    $(".sidebar .card1").append(" <i>Zip Code: </i> ");
    $(".sidebar .card1").append(data.features[random1].properties.ZIPCODE);
    $(".sidebar .card1").append("<br>");
    $(".sidebar .card1").append(" <i>Telephone: </i> ");
    $(".sidebar .card1").append(data.features[random1].properties.FACIL_TELEPHONE);
    $(".sidebar .card1").append("<br>");
    $(".sidebar .card1").append("<br>");
  });
});

//Add slider jQuery (distance)
var bufferSize;

var slider = document.getElementById("myRange1");
var output = document.getElementById("demo");
bufferSize = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  bufferSize = this.value;
};

// Event which runs every time Leaflet draw creates a new layer: Turf + Leaflet Draw
var pointInPoly1;
map.on('draw:created', function(e) {
  if (myFeatures) {
    map.removeLayer(myFeatures);
  }
  if (pointInPoly1) {
    map.removeLayer(pointInPoly1);
  }
  var type = e.layerType; // The type of shape
  layer = e.layer; // The Leaflet layer for the shape
  var id = L.stamp(layer); // The unique Leaflet ID for the layer
  myFeatures = layer;
  map.addLayer(myFeatures);

  if (type == 'marker') {
    var buffer = turf.buffer(myFeatures.toGeoJSON(), bufferSize, {
      unit: 'miles'
    });
    myFeatures = L.geoJSON(buffer).addTo(map);
  }
  var pointsWithin = turf.pointsWithinPolygon(data, myFeatures.toGeoJSON());
  console.log(_.size(pointsWithin.features));
  pointInPoly1 = L.geoJSON(pointsWithin, {
    pointToLayer: function createCustomIcon1(feature, latlng) {
      let myIcon1 = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/yufeiy6/Icon/master/school.png',
        iconSize: [18, 18], // width and height of the image in pixels
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
      });
      return L.marker(latlng, {
        icon: myIcon1
      });
    },
    onEachFeature: addPopUp1,
  }).addTo(map);
  map.removeLayer(stopLayer);

//append results to alert bar
  $(".alert").show();
  $('.alert').html("Congrats! Within your choice of distance there are " + _.size(pointsWithin.features) + " schools, ");
});










/* ===============================
      Add Health Centers Buffer
================================ */

//add stop layer
var data2;
healthCentersData = "https://raw.githubusercontent.com/yufeiy6/Data_Final/master/Health_Centers.geojson";
//set pop up contents
function addPopUp2(feature, layer) {
  var popupContent2 = feature.properties.NAME;
  layer.bindPopup("Health Center: " + popupContent2).openPopup();
}
//set contents for popup and sidebar card
function addPopUp2(feature, layer) {
  var popupContent = feature.properties.NAME;
  layer.bindPopup(popupContent).openPopup();
  layer.on('click', function(e) {
  $(".sidebar .card").html(" <b>Health Centers </b>");
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Name: </i> ");
  $(".sidebar .card").append(feature.properties.NAME);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Organization: </i> ");
  $(".sidebar .card").append(feature.properties.ORGANIZATION);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Zip Code: </i> ");
  $(".sidebar .card").append(feature.properties.ZIP);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Telephone: </i> ");
  $(".sidebar .card").append(feature.properties.PHONE);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append("<br>");
});
}


//point to layer
$.ajax(healthCentersData).done(function(dat) {
  data2 = JSON.parse(dat);
  stopLayer2 = L.geoJson(data2, {
    pointToLayer: function createCustomIcon2(feature, latlng) {
      let myIcon2 = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/yufeiy6/Icon/master/healthcenter.png',
        iconSize: [18, 18], // width and height of the image in pixels
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
      });
      return L.marker(latlng, {
        icon: myIcon2
      });
    },
    onEachFeature: addPopUp2,
  }).addTo(map);


  //randomly assign health centers info onto sidebar
  var random2 = [];
  random2.push(Math.floor(Math.random()*55));
  $(".sidebar .card2").append(" <b>Health Centers </b>");
  $(".sidebar .card2").append("<br>");
  $(".sidebar .card2").append(" <i>Name: </i> ");
  $(".sidebar .card2").append(data2.features[random2].properties.NAME);
  $(".sidebar .card2").append("<br>");
  $(".sidebar .card2").append(" <i>Organization: </i> ");
  $(".sidebar .card2").append(data2.features[random2].properties.ORGANIZATION);
  $(".sidebar .card2").append("<br>");
  $(".sidebar .card2").append(" <i>Zip Code: </i> ");
  $(".sidebar .card2").append(data2.features[random2].properties.ZIP);
  $(".sidebar .card2").append("<br>");
  $(".sidebar .card2").append(" <i>Telephone: </i> ");
  $(".sidebar .card2").append(data2.features[random2].properties.PHONE);
  $(".sidebar .card2").append("<br>");
  $(".sidebar .card2").append("<br>");



  //change-a-group button function
  $(".changeAGroup").click(function() {
    random2 = [];
    random2.push(Math.floor(Math.random()*55));
    $(".sidebar .card2").html(" <b>Health Centers </b>");
    $(".sidebar .card2").append("<br>");
    $(".sidebar .card2").append(" <i>Name: </i> ");
    $(".sidebar .card2").append(data2.features[random2].properties.NAME);
    $(".sidebar .card2").append("<br>");
    $(".sidebar .card2").append(" <i>Organization: </i> ");
    $(".sidebar .card2").append(data2.features[random2].properties.ORGANIZATION);
    $(".sidebar .card2").append("<br>");
    $(".sidebar .card2").append(" <i>Zip Code: </i> ");
    $(".sidebar .card2").append(data2.features[random2].properties.ZIP);
    $(".sidebar .card2").append("<br>");
    $(".sidebar .card2").append(" <i>Telephone: </i> ");
    $(".sidebar .card2").append(data2.features[random2].properties.PHONE);
    $(".sidebar .card2").append("<br>");
    $(".sidebar .card2").append("<br>");
  });
});


//Add slider jQuery
var bufferSize2;

var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("demo");
bufferSize2 = slider2.value; // Display the default slider value


// Update the current slider value (each time you drag the slider handle)
slider2.oninput = function() {
  bufferSize2 = this.value;
};


// Event which runs every time Leaflet draw creates a new layer: Turf + Leaflet Draw
var pointInPoly2;
map.on('draw:created', function(e) {
  if (myFeatures) {
    map.removeLayer(myFeatures);
  }
  if (pointInPoly2) {
    map.removeLayer(pointInPoly2)
  }
  var type = e.layerType; // The type of shape
  layer = e.layer; // The Leaflet layer for the shape
  var id = L.stamp(layer); // The unique Leaflet ID for the layer
  myFeatures = layer;
  map.addLayer(myFeatures);

  if (type == 'marker') {
    var buffer = turf.buffer(myFeatures.toGeoJSON(), bufferSize2, {
      unit: 'miles'
    });
    myFeatures = L.geoJSON(buffer).addTo(map);
  }
  var pointsWithin2 = turf.pointsWithinPolygon(data2, myFeatures.toGeoJSON());
  console.log(_.size(pointsWithin2.features));
  pointInPoly2 = L.geoJSON(pointsWithin2, {
    pointToLayer: function createCustomIcon2(feature, latlng) {
      let myIcon2 = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/yufeiy6/Icon/master/healthcenter.png',
        iconSize: [18, 18], // width and height of the image in pixels
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
      });
      return L.marker(latlng, {
        icon: myIcon2
      });
    },
    onEachFeature: addPopUp2,
  }).addTo(map);
  map.removeLayer(stopLayer2);

//append result to alert bar
  $('.alert').append(_.size(pointsWithin2.features) + " health centers, ");
});





/* ===============================
      Add Rail Station Buffer
================================ */

//add stop layer
var data3;
var railStationsData = "https://raw.githubusercontent.com/yufeiy6/Data_Final/master/DVRPC_Passenger_Rail_Stations.geojson";

//set contents for popup and sidebar card
function addPopUp3(feature, layer) {
  var popupContent3 = feature.properties.STATION;
  layer.bindPopup("Rail Station: " + popupContent3).openPopup();
  layer.on('click', function(e) {
  $(".sidebar .card").html(" <b>Rail Station </b>");
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Type: </i> ");
  $(".sidebar .card").append(feature.properties.TYPE);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Line: </i> ");
  $(".sidebar .card").append(feature.properties.LINE);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Operator: </i> ");
  $(".sidebar .card").append(feature.properties.OPERATOR);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append("<br>");
});
}


//add point to layer
$.ajax(railStationsData).done(function(dat) {
  data3 = JSON.parse(dat);
  stopLayer3 = L.geoJson(data3, {
    pointToLayer: function createCustomIcon3(feature, latlng) {
  let myIcon3 = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/yufeiy6/Icon/master/railstation.png',
    iconSize: [18, 18], // width and height of the image in pixels
    iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
  });
  return L.marker(latlng, {
    icon: myIcon3
  });
},
    onEachFeature:addPopUp3,
  }).addTo(map);


  //randomly assign rail stations info onto sidebar
  let random3 = [];
  random3.push(Math.floor(Math.random()*200));
  $(".sidebar .card3").html(" <b>Rail Station </b>");
  $(".sidebar .card3").append("<br>");
  $(".sidebar .card3").append(" <i>Type: </i> ");
  $(".sidebar .card3").append(data3.features[random3].properties.TYPE);
  $(".sidebar .card3").append("<br>");
  $(".sidebar .card3").append(" <i>Line: </i> ");
  $(".sidebar .card3").append(data3.features[random3].properties.LINE);
  $(".sidebar .card3").append("<br>");
  $(".sidebar .card3").append(" <i>Operator: </i> ");
  $(".sidebar .card3").append(data3.features[random3].properties.OPERATOR);
  $(".sidebar .card3").append("<br>");
  $(".sidebar .card3").append("<br>");


  //change a group button function
  $(".changeAGroup").click(function() {
    random3 = [];
    random3.push(Math.floor(Math.random()*200));
    $(".sidebar .card3").html(" <b>Rail Station </b>");
    $(".sidebar .card3").append("<br>");
    $(".sidebar .card3").append(" <i>Type: </i> ");
    $(".sidebar .card3").append(data3.features[random3].properties.TYPE);
    $(".sidebar .card3").append("<br>");
    $(".sidebar .card3").append(" <i>Line: </i> ");
    $(".sidebar .card3").append(data3.features[random3].properties.LINE);
    $(".sidebar .card3").append("<br>");
    $(".sidebar .card3").append(" <i>Operator: </i> ");
    $(".sidebar .card3").append(data3.features[random3].properties.OPERATOR);
    $(".sidebar .card3").append("<br>");
    $(".sidebar .card3").append("<br>");
  });
});


//Add slider jQuery
var bufferSize3;

var slider3 = document.getElementById("myRange3");
var output3 = document.getElementById("demo");
bufferSize3 = slider3.value; // Display the default slider value


// Update the current slider value (each time you drag the slider handle)
slider3.oninput = function() {
  bufferSize3 = this.value;
};


// Event which runs every time Leaflet draw creates a new layer: Turf + Leaflet Draw
var pointInPoly3;
map.on('draw:created', function (e) {
    if(myFeatures) {
      map.removeLayer(myFeatures);
    }
    if(pointInPoly3) {
      map.removeLayer(pointInPoly3)
    }
    var type = e.layerType; // The type of shape
    layer = e.layer; // The Leaflet layer for the shape
    var id = L.stamp(layer); // The unique Leaflet ID for the layer
    myFeatures = layer;
    map.addLayer(myFeatures);

    if (type == 'marker') {
    var buffer = turf.buffer(myFeatures.toGeoJSON(), bufferSize3, {unit:'miles'});
    myFeatures = L.geoJSON(buffer).addTo(map);
    }
    var pointsWithin3 = turf.pointsWithinPolygon(data3, myFeatures.toGeoJSON());
    console.log(_.size(pointsWithin3.features));
    pointInPoly3 = L.geoJSON(pointsWithin3, {
      pointToLayer: function createCustomIcon3(feature, latlng) {
    let myIcon3 = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/yufeiy6/Icon/master/railstation.png',
      iconSize: [18, 18], // width and height of the image in pixels
      iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
      popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });
    return L.marker(latlng, {
      icon: myIcon3
    });
  },
      onEachFeature:addPopUp3,
    }).addTo(map);
    map.removeLayer(stopLayer3);


//Append result to alert bar
    $('.alert').append(_.size(pointsWithin3.features) + " Rail Stations, ");
});







/* ===============================
      Add Police Station Buffer
================================ */

//add stop layer
var data4;
var policeStationsData = "https://raw.githubusercontent.com/yufeiy6/Data_Final/master/Police_Stations.geojson";


//set contents for popup and sidebar card
function addPopUp4(feature, layer) {
  var popupContent4 = feature.properties.LOCATION;
  layer.bindPopup("Police Station: " + popupContent4).openPopup();
  layer.on('click', function(e) {
  $(".sidebar .card").html(" <b>Police Station </b>");
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Location: </i> ");
  $(".sidebar .card").append(feature.properties.LOCATION);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append(" <i>Telephone: </i> ");
  $(".sidebar .card").append(feature.properties.TELEPHONE_NUMBER);
  $(".sidebar .card").append("<br>");
  $(".sidebar .card").append("<br>");
});
}


//add points to layer
$.ajax(policeStationsData).done(function(dat) {
  data4 = JSON.parse(dat);
  stopLayer4 = L.geoJson(data4, {
    pointToLayer: function createCustomIcon5(feature, latlng) {
      let myIcon5 = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/yufeiy6/Icon/master/icons8-police-badge-48.png',
        iconSize: [18, 18], // width and height of the image in pixels
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
      });
      return L.marker(latlng, {
        icon: myIcon5
      });
    },
    onEachFeature:addPopUp4,
  }).addTo(map);


  //randomly assign police stations info onto sidebar
  let random4 = [];
  random4.push(Math.floor(Math.random()*24));
  $(".sidebar .card4").html(" <b>Police Station </b>");
  $(".sidebar .card4").append("<br>");
  $(".sidebar .card4").append(" <i>Location: </i> ");
  $(".sidebar .card4").append(data4.features[random4].properties.LOCATION);
  $(".sidebar .card4").append("<br>");
  $(".sidebar .card4").append(" <i>Telephone: </i> ");
  $(".sidebar .card4").append(data4.features[random4].properties.TELEPHONE_NUMBER);
  $(".sidebar .card4").append("<br>");
  $(".sidebar .card4").append("<br>");


  //change-a-group button function
  $(".changeAGroup").click(function() {
  random4 = []
  random4.push(Math.floor(Math.random()*24));
  $(".sidebar .card4").html(" <b>Police Station </b>");
  $(".sidebar .card4").append("<br>");
  $(".sidebar .card4").append(" <i>Location: </i> ");
  $(".sidebar .card4").append(data4.features[random4].properties.LOCATION);
  $(".sidebar .card4").append("<br>");
  $(".sidebar .card4").append(" <i>Telephone: </i> ");
  $(".sidebar .card4").append(data4.features[random4].properties.TELEPHONE_NUMBER);
  $(".sidebar .card4").append("<br>");
  $(".sidebar .card4").append("<br>");
  });
});


//Add slider jQuery
var bufferSize4;

var slider4 = document.getElementById("myRange4");
var output4 = document.getElementById("demo");
bufferSize4 = slider4.value; // Display the default slider value


// Update the current slider value (each time you drag the slider handle)
slider4.oninput = function() {
  bufferSize4 = this.value;
};


// Event which runs every time Leaflet draw creates a new layer: Turf + Leaflet Draw
var pointInPoly4;
map.on('draw:created', function (e) {
    if(myFeatures) {
      map.removeLayer(myFeatures);
    }
    if(pointInPoly4) {
      map.removeLayer(pointInPoly4);
    }
    var type = e.layerType; // The type of shape
    layer = e.layer; // The Leaflet layer for the shape
    var id = L.stamp(layer); // The unique Leaflet ID for the layer
    myFeatures = layer;
    map.addLayer(myFeatures);

    if (type == 'marker') {
    var buffer = turf.buffer(myFeatures.toGeoJSON(), bufferSize4, {unit:'miles'});
    myFeatures = L.geoJSON(buffer).addTo(map);
    }
    var pointsWithin4 = turf.pointsWithinPolygon(data4, myFeatures.toGeoJSON());
    console.log(_.size(pointsWithin4.features));
    pointInPoly4 = L.geoJSON(pointsWithin4, {
      pointToLayer: function createCustomIcon5(feature, latlng) {
        let myIcon5 = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/yufeiy6/Icon/master/icons8-police-badge-48.png',
          iconSize: [18, 18], // width and height of the image in pixels
          iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
          popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
        });
        return L.marker(latlng, {
          icon: myIcon5
        });
      },
      onEachFeature:addPopUp4,
    }).addTo(map);

//Remove Marker
    map.removeLayer(stopLayer4);


//Append result to alert bar
    $('.alert').append("and " + _.size(pointsWithin4.features) + " police stations. ");
    map.removeLayer(layer);
});




/* ===============================
       Reset Button Function
================================ */
  $("#reset").click(function() {
  $(".alert").hide();
  $(".sidebar .card").html(" <b>CLICK MARKERS for details </b>");
  map.removeLayer(myFeatures);
  map.removeLayer(pointInPoly1);
  map.removeLayer(pointInPoly2);
  map.removeLayer(pointInPoly3);
  map.removeLayer(pointInPoly4);
  map.removeLayer(layer);
  stopLayer.addTo(map);
  stopLayer2.addTo(map);
  stopLayer3.addTo(map);
  stopLayer4.addTo(map);
});
