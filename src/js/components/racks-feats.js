import isVisible from '../utils/is-visible';
import Vivus from 'vivus';

if ($('.racks-feat').length > 0) {
	$(document).ready(function() {

		$('.racks-feat').last().find('.ml-auto, .mr-auto').css({ "border-bottom": "none" });

		let alignImgToSvg = () => {
			$('.gl-racks-feats > img').offset({ top: $('.gl-racks-feats > svg g#Основные_контуры').offset().top });
			$('.gl-racks-feats').css({
				'padding-top': $('.gl-racks-feats > svg').height() / 1.2 - 140 + 'px'
			});
		};
		alignImgToSvg();
		$(window).resize(alignImgToSvg);

		if ($('html.desktop').length > 0) {

			let rackLines = new Vivus('rack_lines', { duration: 150 });
			isVisible($('.gl-racks-feats > img'), function() {
				rackLines.play();
			});

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