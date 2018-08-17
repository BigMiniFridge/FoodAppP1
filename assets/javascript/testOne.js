// testing link from HTML
// var ApiKEYOne = "AIzaSyD0JwizcvstgWDQ6bVfXDc_KoaMmwj-VAA"; // GOOGLE API KEY.
// testing link from HTML

// Firebase functionality:
var config = {
  apiKey: "AIzaSyDD5x2f_E1K75eZ4MwGaQuTWdTnv0MB3MQ",
  authDomain: "project-1-a4c1b.firebaseapp.com",
  databaseURL: "https://project-1-a4c1b.firebaseio.com",
  projectId: "project-1-a4c1b",
  storageBucket: "project-1-a4c1b.appspot.com",
  messagingSenderId: "637068371479"
};

firebase.initializeApp(config); //INITALIZE FIREBASE

// APIKEYS: CAN BE GREYED OUT
var ApiKEYGoogle = "AIzaSyD0JwizcvstgWDQ6bVfXDc_KoaMmwj-VAA" // GOOGLE API KEY.
var ApiKEYFirebase = "AIzaSyDD5x2f_E1K75eZ4MwGaQuTWdTnv0MB3MQ" // FIREBASE
var ApiKEYEdamam = "c4dc7650e31e0ed398abb5860e305431"
var ApiIDEdamam = "b27f8bf6"


// CLICK FUNCTION HELP:
// CREATE AN ON CLICK FUNCTION: 
$("#whatever").on("click", function(event) {
    // PREVENTS THE APP FROM SENDING
    event.preventDefault();
}); // END OF THE ON CLICK EVENT.

// AJAX SAMPLERS:
// $.ajax({
//     url: queryURL,
//     method: "GET"
//   })  // AJAX CALL END.
  // .then(function(response) {

  //  }); // THEN FUNCTION RESPONSE END







// Google map
var map;
var infowindow;
var search;

$("#select-food-type").on("click", function(event) {
  event.preventDefault();
  console.log($("#food-type").val())
  search = $("#food-type").val()
  initMap()
})

function initMap() {
  var pyrmont = {lat: 39.676599, lng: -104.961895};

  map = new google.maps.Map(document.getElementById("map"), {
    center: pyrmont,
    zoom: 15
  });

  var request = {
    location: pyrmont,
    radius: "500",
    keyword: search,
    type: ["restaurant"]
  };

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, "click", function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
} // End Google Map