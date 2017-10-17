import stretchAndCenter from '../utils/stretch-and-center';

window

let hidePopup = (_this) => {
	_this.animate({
		'opacity': 0
	}, 300, function() {
		_this.find('.news-block-inner').html('');
		_this.css({ 'display': 'none' });
		_this.parents('.news-block').removeClass('popped');
	});
	$('body').css({ 'overflow-y': 'auto' });
};

window.addEventListener('load', () => {


	if ($('.news-block').length > 0) {

		stretchAndCenter($('.news-block'), '.block-bg img');

		$(window).resize(() => stretchAndCenter($('.news-block'), '.block-bg img'));

	}

});

$(document).ready(function() {

	if ($('.news-block').length > 0) {

		let pressRootHref = window.location.pathname.match(/^\/[\w.]+\/?/)[0];

		$('.news-block').click(function(e) {
			e.preventDefault();
			let _this = $(this);
			if (!_this.hasClass('popped')) {
				_this.addClass('popped');
				let url = $(this).attr('href');
				$.get({
					url,
					success: function(response) {
						window.history.pushState({ page: url }, '', url);
						_this.find('.news-block-inner').html(response);
						_this.find('.news-block-wrapper').css({ 'display': 'block' }).animate({
							'opacity': 1
						}, 300);
						$('body').css({ 'overflow-y': 'hidden' });
						$('.gl-section-button.feedback').click(function() {
							$('.gl-feedback').css({ 'display': 'flex' }).animate({
								'opacity': 1
							}, 200, function() {
								$('form.feedback').animate({ 'opacity': 1 }, 200);
							});
						});
					}
				});
			}
		});

		$('.news-block-wrapper').click(function(e) {
			if ($(e.target).is(`
				.news-block-wrapper, 
				.close-button, 
				.news-block-inner,
				.news-block-inner>.container>.row
			`)) {
				hidePopup($(this));
			}
		});

		window.addEventListener('popstate', function(event) {
			let pathname = window.location.pathname;
			if (pathname === pressRootHref) {
				hidePopup($('.news-block.popped .news-block-wrapper'));
			} else {
				let _this = $(`.news-block[data-src="${pathname}"]`);
				$.get({
					url: pathname,
					success: function(response) {
						_this.addClass('popped');
						_this.find('.news-block-inner').html(response);
						_this.find('.news-block-wrapper').css({ 'display': 'block' }).animate({
							'opacity': 1
						}, 300);
						$('body').css({ 'overflow-y': 'hidden' });
					}
				});
			}
		});

		$('.gl-section-button.press-show-more').click(function() {

			$.post({
				url: window.location.pathname,
				data: {
					paged: $(this).attr('data-paged')
				},
				success: function(response) {
					let _this = $('.gl-section-button.press-show-more');
					$('.gl-press-chart .row').append(response);
					stretchAndCenter($('.news-block'), '.block-bg img');
					$('.gl-section-button.press-show-more-inversed').stop().css({ 'width': 0 });
					_this.attr('data-paged', (+_this.attr('data-paged') + 1));
					if (_this.attr('data-max-page') < _this.attr('data-paged')) {
						_this.remove();
						$('.gl-section-button.press-show-more-inversed').remove();
					}
				}
			});

			$('.gl-section-button.press-show-more-inversed').animate({
				'width': 230
			}, 800);

		});

	}

});