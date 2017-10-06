import $script from 'scriptjs';
import dots from './map-dots';

if ($('.gl-google-map').length > 0) {
	$script('https://maps.googleapis.com/maps/api/js?key=AIzaSyCWgWiXe4fdVDjYj6-APt80DhtH2o05w8U&amp', function() {

		let map = new google.maps.Map(document.querySelector('.gl-google-map'), {
			center: { lat: 60.412952, lng: 101.193849 },
			zoom: 3,
			disableDefaultUI: true,
			styles: [
				{
					featureType: 'landscape',
					stylers: [{ color: '#d0ebca' }]
				},
				{
					featureType: 'water',
					stylers: [{ color: '#e9f8ff' }]
				},
				{
					featureType: 'administrative.country',
					elementType: 'geometry',
					stylers: [{ color: '#afd7a5' }]
				},
				{
					featureType: 'administrative.province',
					elementType: 'geometry',
					stylers: [{ visibility: 'off' }]
				}
			]
		});	

		let CustomMarker = function(latlng, map, args) {
			this.latlng = latlng;	
			this.args = args;	
			this.setMap(map);	
		}

		CustomMarker.prototype = new google.maps.OverlayView();

		CustomMarker.prototype.draw = function() {

			let panes = this.getPanes();
			let div = this.div;
			if (!div) {
				if (this.args.number) {
					div = this.div = $(`<div class="gl-map-marker numbered">${this.args.number}</div>`).css({ "position": "absolute" });
				} else {
					div = this.div = $('<div class="gl-map-marker unnumbered"></div>').css({ "position": "absolute" });
				}
				$(panes.overlayImage).append(div);
			}

			let point = this.getProjection().fromLatLngToDivPixel(this.latlng);
			if (point) {
				div.css({ "left": `${point.x - 17.5}px`, "top": `${point.y - 17.5}px` });
			}

		};

		// CustomMarker.prototype.remove = function() {
		// 	if (this.div) {
		// 		this.div.parentNode.removeChild(this.div);
		// 		this.div = null;
		// 	}	
		// };

		// CustomMarker.prototype.getPosition = function() {
		// 	return this.latlng;	
		// };

		// let CustomMarker = function(latlng, map, args) {
		// 	console.log('hello');
		// 	this.latlng = latlng;
		// 	this.args = args;
		// 	this.setMap(map);
		// };

		for (let coor of dots) {
			new CustomMarker(new google.maps.LatLng(coor.lat, coor.lng), map, { number: coor.number });
		}

	});
}

if ($('.gl-google-map-contacts').length > 0) {
	$script('https://maps.googleapis.com/maps/api/js?key=AIzaSyCWgWiXe4fdVDjYj6-APt80DhtH2o05w8U&amp', function() {

		let map = new google.maps.Map(document.querySelector('.gl-google-map-contacts'), {
			center: { lat: 55.895397, lng: 37.452266 },
			zoom: 17,
			disableDefaultUI: true
		});
    var marker = new google.maps.Marker({
      position: { lat: 55.895397, lng: 37.452266 },
      map: map,
      title: 'Ленинский проспект, д. 1, к. 1'
    });

	});
}