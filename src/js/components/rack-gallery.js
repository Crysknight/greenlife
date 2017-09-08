import stretchAndCenter from '../utils/stretch-and-center';

$(window).on('load', () => stretchAndCenter($('.rack-gallery .info-image'), '.info-image-preview'));
$(window).resize(() => stretchAndCenter($('.rack-gallery .info-image'), '.info-image-preview'));

$(document).ready(function() {

	$('[data-fancybox').fancybox({
		buttons: [
			'close'
		],
		animationEffect: 'fade'
	});

});