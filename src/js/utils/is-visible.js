const isVisible = (el, callback, handicap = 100) => {
	let offsetTop = el.offset().top;
	let callbackApplied = false;
	$(document).scroll(function() {
		let isElVisible = ($(this).scrollTop() + $(window).height() - handicap) > offsetTop;
		if (isElVisible && !callbackApplied) {
			callbackApplied = true;
			callback();
		}
	});
};

export default isVisible;