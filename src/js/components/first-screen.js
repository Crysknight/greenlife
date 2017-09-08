import stretchAndCenter from '../utils/stretch-and-center';

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

if ($('video.gl-video')) {

	let preloadVideo = video => {
		video.animate({
			opacity: 1
		}, 2000);
	};

	$(document).ready(function() {

		let video = $('video.gl-video');
		video.on('loadedmetadata', function() {
			stretchAndCenter($('.gl-first-screen'), 'video.gl-video', true);
			preloadVideo(video);
			video.get(0).play();
		});

		if ($('html.desktop').length > 0) {
			video.get(0).load();
		}

	});

}