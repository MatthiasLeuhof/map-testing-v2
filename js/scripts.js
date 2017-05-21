
// VARIABLES
var map;
var route;

// WALKS
var barhopping = {
  start: [52.377297, 4.898783],
  end: [52.357487, 4.885650]
}
var theBucketList = {
  start: [52.369385, 4.914318],
  end: [52.381070, 4.871317]
}
var foodAndChinese = {
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

// MAIN SCRIPTS
function main() {

  map = new GMaps({
    div: '#map',
    lat: 52.368722,
    lng: 4.896982,
    zoom: 14,
    draggable: false,
    scrollwheel: false
  })

  map.getRoutes({
    origin: barhopping.start,
    destination: barhopping.end,
    travelMode: 'walking',
    callback: function(e){
      route = new GMaps.Route({
        map: map,
        route: e[0],
        strokeColor: '#ff0000',
        strokeOpacity: 0.5,
        strokeWeight: 10
      });
    }
  });

  $('#next-stop').click(function(e){
    e.preventDefault();
    route.forward();

    if(route.step_count < route.steps_length) {
      $('#instructions').append('<li>'+route.steps[route.step_count].instructions+'</li>');
      map.setCenter(route.steps[route.step_count].start_location.lat(), route.steps[route.step_count].start_location.lng());
      map.setZoom(17);
    }
  });

  $('#previous-stop').click(function(e){
    e.preventDefault();
    route.back();


    if(route.step_count >= 0) {
      $('#instructions').find('li').last().remove();
      map.setCenter(route.steps[route.step_count].start_location.lat(), route.steps[route.step_count].start_location.lng());
      map.setZoom(17);
    }

  });

}

$(document).ready(main);
