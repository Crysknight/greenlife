const stretchAndCenter = (containers, imageSelector) => {
	// let i = 0;
	containers.each(function() {
		let container = $(this);
		let containerRatio = container.outerWidth() / container.outerHeight();
		let image = container.find(imageSelector);
		let imageRatio = image.width() / image.height();
		// if (i === 0) {
		// 	console.log('containerRatio: ', containerRatio);
		// 	console.log('imageRatio: ', imageRatio);
		// 	console.log(containerRatio > imageRatio);
		// 	i = 1;
		// }
		if (containerRatio > imageRatio) {
			image.removeAttr('style');
			image.width(container.outerWidth());
			let topOffset = -((image.height() - container.outerHeight()) / 2);
			image.css({ "margin-top": topOffset + "px" });
		} else if (containerRatio < imageRatio) {
			image.removeAttr('style');
			image.height(container.outerHeight());
			let leftOffset = -((image.width() - container.outerWidth()) / 2);
			image.css({ "margin-left": leftOffset + "px" });
		}
	});
};

export default stretchAndCenter;