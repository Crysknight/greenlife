const isVisible = (el, callback) => {
	let offsetTop = el.offset().top;
	$(document).scroll(function() {
		let callbackApplied = false;
		let isElVisible = ($(this).scrollTop() + $(window).height() - 100) > offsetTop;
		if (isElVisible && !callbackApplied) {
			callbackApplied = true;
			callback();
		}
	});
};

export default isVisible;