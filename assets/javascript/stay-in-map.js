var pos;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      initMap();
    });
     
  } 
  
  // Google map
  var map;
  var infowindow;
  var search;
  var type;
  var icon;

  $("#select-store").on("click", function(event) {
    event.preventDefault();
    // console.log("hello");
    // console.log($("#grocery-store-type").val())
    search = $("#grocery-store-type").val()
    icon = "assets/images/supermarket.png"
    type = "store"
    initMap()
  });
  
  function initMap() {
    if (!pos){
    pos = {lat: 39.676599, lng: -104.961895};
  }
    map = new google.maps.Map(document.getElementById("map"), {
      center: pos,
      zoom: 12
    });
  
    var request = {
      location: pos,
      radius: "4828.02",
      keyword: search,
      type: [type]
    };
  
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  
  function callback(results, status) {
    if (search) {
    // console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {


        // console.log(results[i].name)
        
      
        usePlaceId(results[i]);
        // createMarker(results[i]);
      }
    }
  }
  }
  
  function usePlaceId(place) {
  
  
    var request2 = {
      placeId: place.place_id,
      fields: ["name", "rating", "formatted_phone_number", "geometry", "address_component", "adr_address", "alt_id", "formatted_address", "icon", "id", "permanently_closed", "photo", "place_id", "plus_code", "scope", "type", "url", "utc_offset", "vicinity", "opening_hours", "website", "price_level", "rating", "review"]
    };
  
    var service2 = new google.maps.places.PlacesService(map);
    service2.getDetails(request2, callback);
  
    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        createMarker(place);
      }
    }
  }
  
  function createMarker(place) {
  
    var placeLoc = place.geometry.location;
    // var marker = new google.maps.Marker({
    //   map: map,
    //   position: placeLoc
    // });
    
    var marker = new google.maps.Marker({
      position: placeLoc,
      map: map,
      icon: icon
    });
    marker.addListener('mouseover', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
    marker.addListener('mouseout', function() {
    infowindow.close();
    });
    google.maps.event.addListener(marker, "mouseover", function () {
      $("#hoverTry").text(JSON.stringify(place))
    });
    google.maps.event.addListener(marker, "mouseout", function () {
      $("#hoverTry").text("")
    });
    google.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
      // console.log(this);
    });
  } // End Google Map