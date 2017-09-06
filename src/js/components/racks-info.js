let stretchAndCenterBGImages = () => {

	let types = $('.rack-type');

	types.each(function() {
		let type = $(this);
		let typeRatio = type.outerWidth() / type.outerHeight();
		let image = type.find('.type-bg img');
		let imageRatio = image.width() / image.height();
		if (typeRatio > imageRatio) {
			image.width(type.outerWidth());
			let topOffset = -((image.height() - type.outerHeight()) / 2);
			image.css({ "margin-top": topOffset + "px" });
		} else {
			image.height(type.outerHeight());
			let leftOffset = -((image.width() - type.outerWidth()) / 2);
			image.css({ "margin-left": leftOffset + "px" });
		}
	});

};

if ($('.rack-type').length > 0) {

	$('document').ready(stretchAndCenterBGImages);

	$('window').resize(stretchAndCenterBGImages);

}