import stretchAndCenter from '../utils/stretch-and-center';

$(document).ready(function() {

	$('[data-fancybox]').fancybox({
		buttons: [
			'close'
		],
		animationEffect: 'fade'
	});

});

window.addEventListener('load', () => {

	if ($('.content-gallery .gallery-image').length > 0) {

		stretchAndCenter($('.content-gallery .gallery-image'), '.gallery-image-preview')

		$(window).resize(() => stretchAndCenter($('.content-gallery .gallery-image'), '.gallery-image-preview'));
		
	}

});