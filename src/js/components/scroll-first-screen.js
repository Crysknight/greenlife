if ($('.scroll-down-inner').length > 0) {

	$(document).ready(function() {

		let navbarHeight = $('nav.navbar').height();
		let scrollButton = $('.scroll-down-inner');
		let scrollHeight = $('.gl-first-screen').outerHeight() + navbarHeight;

		scrollButton.click(function() {
			$('body').animate({ scrollTop: scrollHeight }, 300);
		});

		// if ($('html.mobile, html.tablet').length > 0) {
		// 	scrollButton.css({ 'position': 'fixed', 'bottom': '0px' });
		// 	$(document).scroll(function() {
		// 		scrollButton.removeAttr('style');
		// 	});
		// }

	});

}