
// VARIABLES
var map;
var route;
var stops;
var $walkNumber;

// WALKS
// var barhopping = {
//   start: [52.363700, 4.933453],
//   stop2: [52.363435, 4.930334],
//   stop3: [52.363038, 4.923905],
//   stop4: [52.362318, 4.924244],
//   stop5: [52.360234, 4.925539],
//   stop6: [52.357943, 4.917675],
//   stop7: [52.356894, 4.917848],
//   end: [52.356675, 4.918108]
// }
var theBucketList = {
  start: [52.369385, 4.914318],
  end: [52.381070, 4.871317]
}
// var foodAndFinesse = {
//   start: [52.373891, 4.883762],
//   end: [52.356072, 4.900242]
// }
// var floraAndFauna = {
//   start: [52.366188, 4.913374],
//   end: [52.356491, 4.862562]
// }
// var grafitti = {
//   start: [52.366712, 4.865824],
//   end: [52.356386, 4.910799]
// }

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

// MAIN SCRIPTS
function initMap() {

  $walkNumber = parseInt($('.map-section').attr('data-walknr'));

  stops = $.map(walks[$walkNumber], function(value, index) {
    return [value];
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 52.368722, lng: 4.896982}
  });
  directionsDisplay.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsDisplay);

  // document.getElementById('start').addEventListener('click', function() {
  //   drawPolyLineForRoute(directionsService, directionsDisplay);
  // });



  var walkCoords = [
    {lat: 52.363700, lng: 4.933453},
    {lat: 52.362318, lng: 4.924244},
    {lat: 52.357943, lng: 4.917675},
    {lat: 52.356675, lng: 4.918108}
  ];

  var pathhh = new google.maps.Polyline({
    path: walkCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  pathhh.setMap(map);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  // var pointsArray = [];
  var waypts = [];
  for (var i = 1; i < (stops.length - 1); i++) {
    waypts.push({
      location: stops[i],
      stopover: true
    });
  }

  var request = {
    origin: walks[$walkNumber].start,
    destination: walks[$walkNumber].end,
    waypoints: waypts,
    optimizeWaypoints: false,
    travelMode: 'WALKING'
  }



  directionsService.route(request, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
      var route = response.routes[0];

      var summaryPanel = document.getElementById('instructions');
      summaryPanel.innerHTML = '';
      // For each route, display summary information.
      for (i = 0; i < route.legs.length; i++) {
        var routeSegment = i + 1;
        summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
            '</b><br>';
        summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
        summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
        summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
      }

      var pointsArray = [];

      for (var route in response.routes) {
        for (var leg in route.legs) {
          for (var step in leg.steps) {
            for (var latlng in step.path) {
              pointsArray.push(latlng)
            }
          }
        }
      }

      console.log(pointsArray);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
