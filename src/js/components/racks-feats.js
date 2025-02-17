import isVisible from '../utils/is-visible';

if ($('.racks-feat').length > 0) {

	window.addEventListener('load', function() {

		$('.racks-feat').last().find('.ml-auto, .mr-auto').css({ "border-bottom": "none" });

		if ($('html.desktop').length > 0) {

			isVisible($('.rack-size'), function() {
				$('.rack-size span.size, span.measure').animate({ 'bottom': '0px', 'opacity': '1' }, 1250);
				$('.size-border.top-border').animate({ 'width': '100%' }, 500, function() {
					let border = $('.size-border.right-border');
					border.css({ 'height': '3px' });
					border.animate({ 'height': '100%' }, 500);
				});
				$('.size-border.left-border').animate({ 'height': '100%' }, 500, function() {
					let border = $('.size-border.bottom-border');
					border.css({ 'width': '3px' });
					border.animate({ 'width': '100%' }, 500);
				});
			});

		}

	});
	
}