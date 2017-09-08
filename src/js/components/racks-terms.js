import isVisible from '../utils/is-visible';

if ($('.rack-term').length > 0) {

	$(document).ready(function() {


		if ($('html.desktop').length > 0) {

			isVisible($('.rack-term'), function () {
				$('.rack-term-line').animate({ 'width': '100%' }, 1000);
				$('.rack-term-header').animate({ 'bottom': '0px', 'opacity': '1' }, 500, function() {
					$('.rack-term-desc').animate({ 'bottom': '0px', 'opacity': '1' }, 500);
				});
			});
			
		}

		if ($('html.mobile').length > 0) {
			$('.rack-term').click(function() {
				$(this).toggleClass('unfolded');
				$(this).find('.rack-term-folder').toggleClass('unfolded');
			});
		}

	});

}