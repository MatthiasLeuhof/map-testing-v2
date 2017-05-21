// my scripts


var barhopping = {
  start: [52.377297, 4.898783],
  end: [52.357487, 4.885650]
}

function initMap() {

  var map = new GMaps({
    div: '#map',
    lat: 52.368722,
    lng: 4.896982,
    zoom: 14,
    draggable: false
  })

  $('#start').on('click', function() {
    map.travelRoute({
      origin: barhopping.start,
      destination: barhopping.end,
      travelMode: 'walking',
      step: function(e) {
        $('#instructions').append('<li>' + e.instructions + '</li>');
        $('#instructions li:eq(' + e.step_number + ')').delay(450 * e.step_number).fadeIn(200, function() {
          map.drawPolyline({
            path: e.path,
            strokeColor: '#ff0000',
            strokeOpacity: 1,
            strokeWeight: 6
          });
        });
      }
    })
  });

  // map = new google.maps.Map(document.getElementById('map'), {
  //   center: {lat: 52.368722, lng: 4.896982},
  //   zoom: 14
  // });
}
