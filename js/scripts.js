
// VARIABLES FOR MAP
var directionsService;
var directionsDisplay;
var map;
var route;
var marker;
var markerArray = [];
var polylines = [];
var instructionsArray = [];
var $walkNumber = parseInt($('.map-section').attr('data-walknr'));
var $instructionsSection = $('#instructions-section');
var $instructionsContainer = document.getElementById('instructions');
var nextStop = document.getElementById('next-stop');
var previousStop = document.getElementById('previous-stop');
var completeTrail = document.getElementById('complete-trail');
var currentLeg = 0;

// VARIABLES FOR WALKS
var theBucketList = {
  start: [52.369385, 4.914318],
  end: [52.381070, 4.871317]
}

var barhopping = {
  start: 'Walters - The Walter Woodbury Bar, Javastraat, Amsterdam',
  stop1: 'Bar Botanique, Eerste Van Swindenstraat, Amsterdam',
  stop2: 'Louie Louie, Linnaeusstraat, Amsterdam',
  stop3: 'de Biertuin, Linnaeusstraat, Amsterdam',
  stop4: 'Caffe Milo, Linnaeusstraat, Amsterdam',
  stop5: 'bar Bukowski, Oosterpark, Amsterdam',
  stop6: 'Smokin Barrels, Beukenplein, Amsterdam',
  end: 'Bar Mowgli, Beukenplein, Amsterdam'
}

var floraAndFauna = {
  start: 'Klein Dantzig, Kamerlingh Onneslaan, Amsterdam',
  stop1: 'Distilleerderij t Nieuwe Diep, Flevopark, Amsterdam',
  stop2: 'Oosterpark, Amsterdam',
  stop3: 'Tropenmuseum, Linnaeusstraat, Oosterparkbuurt, Amsterdam',
  stop4: 'ARTIS, Plantage Kerklaan, Amsterdam',
  stop5: 'Hortus Botanicus Amsterdam, Plantage Middenlaan, Weesperbuurt en Plantage, Amsterdam',
  stop6: 'Nieuwe Herengracht 18, Amsterdam',
  end: 'NEMO Science Museum, Oosterdok, Amsterdam'
}

var foodAndFinesse = {
  start: 'Ten Kate Market, Ten Katestraat, Amsterdam',
  stop1: 'de foodhallen',
  stop2: 'Albert Cuyp Market, Albert Cuypstraat, Amsterdam',
  stop3: 'Dappermarkt, Dapperstraat, Amsterdam',
  stop4: 'Marqt, Utrechtsestraat, Amsterdam',
  stop5: 'STACH Food, Nieuwe Hoogstraat, Amsterdam',
  end: 'Dun Yong, Stormsteeg, Amsterdam'
}

var grafitti = {
  start: 'Amsterdam Centraal, Stationsplein, Amsterdam',
  stop1: 'mt ondinaweg 17b',
  stop2: 'Ms. van Riemsdijkweg 41a, Amsterdam',
  stop3: 'Pllek, Tt. Neveritaweg, Amsterdam',
  stop4: 'Crane Hotel Faralda Amsterdam, NDSM-Plein, Amsterdam',
  stop5: 'Noorderlicht Café, NDSM-Plein, Amsterdam',
  stop6: 'Tt. Neveritaweg 61, Amsterdam',
  end: 'Restaurant-Café De IJ-kantine, Mt. Ondinaweg, Amsterdam'
}

var walks = [barhopping, theBucketList, foodAndFinesse, floraAndFauna, grafitti];
var stops = $.map(walks[$walkNumber], function(value, index) {
  return [value];
});

var waypts = [];
for (var i = 1; i < (stops.length - 1); i++) {
  waypts.push({
    location: stops[i],
    stopover: true
  });
}

// VARIABLES FOR PANELS

$panels = $('.panel');

// MAIN SCRIPTS
function initMap() {

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 52.368722, lng: 4.896982},
    disableDefaultUI: true,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ]
  });
  directionsDisplay.setMap(map);
  calculateRoute();

  nextStop.addEventListener('click', forward);
  previousStop.addEventListener('click', back);

}

function calculateRoute() {
  var request = {
    origin: walks[$walkNumber].start,
    destination: walks[$walkNumber].end,
    waypoints: waypts,
    optimizeWaypoints: false,
    travelMode: 'WALKING'
  };

  instructionsArray = [];
  markerArray = [];

  directionsService.route(request, function(response, status) {
    if (status === 'OK') {

      var polyline = new google.maps.Polyline({
        path: [],
        strokeColor: '#FF0000',
        strokeOpacity: 0.3,
        strokeWeight: 6
      });
      var bounds = new google.maps.LatLngBounds();

      // Loop through the legs, steps and paths of the route to generate polylines, markers and instructions
      var legs = response.routes[0].legs;
      for (i = 0; i < legs.length; i++) {
        var steps = legs[i].steps;
        var instrLeg = document.createElement('div');
        instructionsArray.push(instrLeg);
        // Check if it's the last step of the walk, then add one at the end of it, if not, only at the start
        if (i == (legs.length - 1)) {
          var marker = new google.maps.Marker({
            position: legs[i].start_location,
            map: map
          });
          markerArray.push(marker);
          marker = new google.maps.Marker({
            position: legs[i].end_location,
            map: map
          });
          markerArray.push(marker);
        } else {
          var marker = new google.maps.Marker({
            position: legs[i].start_location,
            map: map
          });
          markerArray.push(marker);
        }

        for (j = 0; j < steps.length; j++) {
          var nextSegment = steps[j].path;
          var instr = steps[j].instructions;
          instructionsArray[i].innerHTML += instr;
          for (k = 0; k < nextSegment.length; k++) {
            polyline.getPath().push(nextSegment[k]);
            bounds.extend(nextSegment[k]);
          }
        }
      }
      console.log(markerArray);
      console.log(instructionsArray);

      if (currentLeg == 0) {
        $instructionsSection.attr('hidden', true);
        previousStop.setAttribute('hidden', true);
      } else {
        $instructionsSection.removeAttr('hidden');
        previousStop.removeAttribute('hidden');
      }

      polyline.setMap(map);
      map.fitBounds(bounds);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function forward(e) {
  e.preventDefault();

  var request = {
    origin: walks[$walkNumber].start,
    destination: walks[$walkNumber].end,
    waypoints: waypts,
    optimizeWaypoints: false,
    travelMode: 'WALKING'
  };

  directionsService.route(request, function(response, status) {
    if (status === 'OK') {

      if (currentLeg < stops.length - 1) {
        var polyline = new google.maps.Polyline({
          path: [],
          strokeColor: '#FF0000',
          strokeOpacity: 0.5,
          strokeWeight: 7
        });
        var bounds = new google.maps.LatLngBounds();

        var legs = response.routes[0].legs;

        var steps = legs[currentLeg].steps;
        for (j = 0; j < steps.length; j++) {
          var nextSegment = steps[j].path;
          for (k = 0; k < nextSegment.length; k++) {
            polyline.getPath().push(nextSegment[k]);
            bounds.extend(nextSegment[k]);
          }
        }

        currentLeg += 1;

        var id = $panels[currentLeg];

        console.log(currentLeg);
        $panels.filter(':not([hidden])').attr('hidden', true);
        $(id).removeAttr('hidden');

        $instructionsSection.removeAttr('hidden');
        previousStop.removeAttribute('hidden');

        if (currentLeg == stops.length - 1) {
          nextStop.setAttribute('hidden', true);
          completeTrail.removeAttribute('hidden');
        }

        $instructionsContainer.innerHTML = '';
        $instructionsContainer.appendChild(instructionsArray[currentLeg - 1]);

        polyline.setMap(map);
        polylines.push(polyline);
        map.fitBounds(bounds);

      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function back(e) {
  e.preventDefault();


  var request = {
    origin: walks[$walkNumber].start,
    destination: walks[$walkNumber].end,
    waypoints: waypts,
    optimizeWaypoints: false,
    travelMode: 'WALKING'
  };

  if (currentLeg >= 1) {
    var removePolyline = polylines[currentLeg - 1];
    removePolyline.setMap(null);
    polylines.pop(removePolyline);
  }

  directionsService.route(request, function(response, status) {
    if (status === 'OK') {

      nextStop.removeAttribute('hidden');
      completeTrail.setAttribute('hidden', true);

      if (currentLeg < stops.length && currentLeg > 1) {
        var bounds = new google.maps.LatLngBounds();

        var legs = response.routes[0].legs;

        var steps = legs[currentLeg - 2].steps;
        for (j = 0; j < steps.length; j++) {
          var nextSegment = steps[j].path;
          for (k = 0; k < nextSegment.length; k++) {
            bounds.extend(nextSegment[k]);
          }
        }

        currentLeg -= 1;
        console.log(currentLeg);
        var id = $panels[currentLeg];

        $panels.filter(':not([hidden])').attr('hidden', true);
        $(id).removeAttr('hidden');

        $instructionsContainer.innerHTML = '';
        $instructionsContainer.appendChild(instructionsArray[currentLeg - 1]);

        map.fitBounds(bounds);

      } else if (currentLeg == 1) {
        $instructionsContainer.innerHTML = '';
        currentLeg -= 1;

        var id = $panels[currentLeg];

        $panels.filter(':not([hidden])').attr('hidden', true);
        $(id).removeAttr('hidden');

        calculateRoute();
      }


    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
