$('.rack-term').click(function() {
	$(this).toggleClass('unfolded');
	$(this).find('.rack-term-folder').toggleClass('unfolded');
});