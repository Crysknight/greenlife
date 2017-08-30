let stretchAndCenterBGImages = () => {

	let types = $('.rack-type');

	types.each(function() {
		let type = $(this);
		let typeRatio = type.outerWidth() / type.outerHeight();
		// console.log('type.outerWidth: ', type.outerWidth());
		// console.log('type.outerHeight: ', type.outerHeight());
		// console.log('typeRatio: ', typeRatio);
		let image = type.find('.type-bg img');
		let imageRatio = image.width() / image.height();
		// console.log('image.width: ', image.width());
		// console.log('image.height: ', image.height());
		// console.log('imageRatio: ', imageRatio);
		if (typeRatio > imageRatio) {
			image.width(type.outerWidth());
			let topOffset = -((image.height() - type.outerHeight()) / 2);
			// console.log(topOffset);
			image.css({ "margin-top": topOffset + "px" });
		} else {
			image.height(type.outerHeight());
			let leftOffset = -((image.width() - type.outerWidth()) / 2);
			// console.log(leftOffset);
			image.css({ "margin-left": leftOffset + "px" });
		}
	});

};

$('document').ready(stretchAndCenterBGImages);

$('window').resize(stretchAndCenterBGImages);