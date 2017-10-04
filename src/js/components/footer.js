$(document).ready(function() {
	let feedback = $('.gl-feedback');
	let formWrapper = feedback.find('.feedback-form');
	let ty = feedback.find('.feedback-thank-you');
	let feedbackClose = feedback.find('.feedback-close');
	let form = feedback.find('form.feedback');
	$('.feedback-phone').mask('+7 (999) 999-99-99');
	$('.gl-section-button.feedback').click(function() {
		feedback.css({ 'display': 'flex' }).animate({
			'opacity': 1
		}, 200, function() {
			form.animate({ 'opacity': 1 }, 200);
		});
	});
	feedback.click(function(event) {
		if ($(event.target).is('.gl-feedback, .feedback-close')) {
			feedback.animate({ 'opacity': 0 }, 200, function() {
				feedback.css({ 'display': 'none' });
			});
		}
	});
	form.submit(function(event) {
		event.preventDefault();
		let feedback = {
			action: 'ajax_send_feedback',
			name: $(event.target[0]).val(),
			phone: $(event.target[1]).val()
		};
		console.log(feedback);
		$.post(
			'/wp-admin/admin-ajax.php',
			feedback,
			function() {
				ty.css({ 'display': 'block' }).animate({
					'opacity': 1
				}, 300);
			}
		);
	});
});