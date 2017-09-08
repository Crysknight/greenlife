import stretchAndCenter from '../utils/stretch-and-center';
import isVisible from '../utils/is-visible';

$(document).ready(function() {

	if ($('.rack-type').length > 0) {

		$(window).on('load', () => stretchAndCenter($('.rack-type'), '.type-bg img'));

		$(window).resize(() => stretchAndCenter($('.rack-type'), '.type-bg img'));

		if ($('html.desktop').length > 0) {

			$('.rack-type video').each(function() {
				$(this).on('loadedmetadata', function() {
					let type = $(this).parents('.rack-type');
					stretchAndCenter(type, 'video');
				});
				$(this).on('canplaythrough', function() {
					let type = $(this).parents('.rack-type');
					type.on('mouseover', function() {
						let video = type.find('video');
						video.animate({
							opacity: 1
						}, 300);
						video.get(0).play();
					});
					type.on('mouseout', function() {
						let video = type.find('video');
						video.animate({
							opacity: 1
						}, 300);
						video.get(0).play();
					});
				});
			});

			isVisible($('.gl-racks-info'), function() {
				$('.rack-type video').each(function() {
					this.load();
				});
			});

		}

	}

});