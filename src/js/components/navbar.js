import { device } from 'device.js';

$(document).ready(function() {
	if (device.desktop) {
		$('.dropdown').not('.gl-your-order').on('mouseover', function() {
			$(this).find('.dropdown-menu').css({ 'display': 'block' });
		});
		$('.dropdown').not('.gl-your-order').on('mouseout', function() {
			$(this).find('.dropdown-menu').css({ 'display': 'none' }).removeClass('show');
			$(this).removeClass('show');
		});
	}
});
