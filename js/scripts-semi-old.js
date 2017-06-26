
// VARIABLES
var map;
var route;
var stops;

// WALKS
var barhopping = {
  start: [52.363700, 4.933453],
  stop2: [52.363435, 4.930334],
  stop3: [52.363038, 4.923905],
  stop4: [52.362318, 4.924244],
  stop5: [52.360234, 4.925539],
  stop6: [52.357943, 4.917675],
  stop7: [52.356894, 4.917848],
  end: [52.356675, 4.918108]
}
var theBucketList = {
  start: [52.369385, 4.914318],
  end: [52.381070, 4.871317]
}
var foodAndFinesse = {
  start: [52.373891, 4.883762],
  end: [52.356072, 4.900242]
}
var floraAndFauna = {
  start: [52.366188, 4.913374],
  end: [52.356491, 4.862562]
}
var grafitti = {
  start: [52.366712, 4.865824],
  end: [52.356386, 4.910799]
}

var barhoppingWaypoints = [
  {location:new google.maps.LatLng(52.363435, 4.930334)},
  {location:new google.maps.LatLng(52.363038, 4.923905)},
  {location:new google.maps.LatLng(52.362318, 4.924244)},
  {location:new google.maps.LatLng(52.360234, 4.925539)},
  {location:new google.maps.LatLng(52.357943, 4.917675)},
  {location:new google.maps.LatLng(52.356894, 4.917848)}
]

var walks = [barhopping, theBucketList, foodAndFinesse, floraAndFauna, grafitti];

// MAIN SCRIPTS
function main() {

  var $walkNumber = parseInt($('.map-section').attr('data-walknr'));

  stops = $.map(walks[$walkNumber], function(value, index) {
    return [value];
  });


  // var walkStart = stops.shift();
  // var walkEnd = stops.pop();

  map = new GMaps({
    div: '#map',
    lat: 52.368722,
    lng: 4.896982,
    zoom: 14,
    // draggable: false,
    scrollwheel: false
  })

  for (i = 0; i < stops.length; i++) {
    map.addMarker({
      lat: stops[i][0],
      lng: stops[i][1]
    })
  }

  // for (var i = 0; i < stops.length; i++) {
  //
  //   var j = i + 1;
  //
  //   map.getRoutes({
  //     origin: stops[i],
  //     destination: stops[j],
  //     travelMode: 'walking',
  //     callback: function(e){
  //       route = new GMaps.Route({
  //         map: map,
  //         route: e[0],
  //         strokeColor: '#ff0000',
  //         strokeOpacity: 0.5,
  //         strokeWeight: 10
  //       });
  //     }
  //   });
  // }

  // map.getRoutes({
  //   origin: walks[$walkNumber].start,
  //   destination: walks[$walkNumber].end,
  //   travelMode: 'walking',
  //   callback: function(e){
  //     route = new GMaps.Route({
  //       map: map,
  //       route: e[0],
  //       strokeColor: '#ff0000',
  //       strokeOpacity: 0.5,
  //       strokeWeight: 10
  //     });
  //   }
  // });

  $('#next-stop').click(function(e){
    e.preventDefault();
    route.forward();

    if(route.step_count < route.steps_length) {
      $('#instructions').append('<li>'+route.steps[route.step_count].instructions+'</li>');
      map.panTo({lat: (route.steps[route.step_count].start_location.lat()), lng: (route.steps[route.step_count].start_location.lng())});
      map.setZoom(17);
    }
  });

  $('#previous-stop').click(function(e){
    e.preventDefault();
    route.back();


    if(route.step_count >= 0) {
      $('#instructions').find('li').last().remove();
      map.panTo({lat: (route.steps[route.step_count].start_location.lat()), lng: (route.steps[route.step_count].start_location.lng())});
      map.setZoom(17);
    }

  });

}

$(document).ready(main);
