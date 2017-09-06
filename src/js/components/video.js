if ($('video.gl-video')) {

	$(document).ready(function() {

		let video = $('video.gl-video');
		video.on('loadedmetadata', function() {

			let videoRatio = $(this).get(0).videoWidth / $(this).get(0).videoHeight;
			let videoWrapper = $('.gl-first-screen');
			let videoWrapperRatio = videoWrapper.outerWidth() / videoWrapper.outerHeight();
			if (videoWrapperRatio > videoRatio) {
				video.width(videoWrapper.outerWidth());
				let topOffset = -(video.height() - videoWrapper.outerHeight()) / 2;
				video.css({ 'margin-top': topOffset + 'px' });
			} else {
				video.css({ 'width': 'auto' });
				video.height(797);
				let leftOffset = -(video.width() - videoWrapper.outerWidth()) / 2;
				video.css({ 'margin-left': leftOffset + 'px' });
			}

		});

	});

}