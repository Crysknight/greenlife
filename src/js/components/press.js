import stretchAndCenter from '../utils/stretch-and-center';

$(document).ready(function() {

	if ($('.news-block').length > 0) {

		$('.close-button').click(function() {

			$('.fancybox-close-small').click();			

		});

	}

});

window.addEventListener('load', () => {

	if ($('.news-block').length > 0) {

		stretchAndCenter($('.news-block'), '.block-bg img');

		$(window).resize(() => stretchAndCenter($('.news-block'), '.block-bg img'));

		$('.gl-section-button.press-show-more').click(function() {

		/* =================================================================================================== */
		/* < MOCK PART > */
		/* =================================================================================================== */

			$.get({
				url: '/',
				success: function() {
					let response;
					if (location.pathname.match(/gallery/)) {
						response = `
							<div class="col-lg-4 col-md-6 col-12">
								<a class="news-block" href="./img/gallery-photo-2.jpg" data-fancybox="group">
									<img src="./img/gallery-photo-2.jpg" alt="">
									<div class="block-bg"><img src="./img/gallery-photo-2.jpg" alt=""></div>
								</a>
							</div>
							<div class="col-lg-4 col-md-6 col-12">
								<a class="news-block" href="./img/article-gallery-image.jpg" data-fancybox="group">
									<img src="./img/article-gallery-image.jpg" alt="">
									<div class="block-bg"><img src="./img/article-gallery-image.jpg" alt=""></div>
								</a>
							</div>
							<div class="col-lg-4 col-md-6 col-12">
								<a class="news-block" href="./img/gallery-photo-2.jpg" data-fancybox="group">
									<img src="./img/gallery-photo-2.jpg" alt="">
									<div class="block-bg"><img src="./img/gallery-photo-2.jpg" alt=""></div>
								</a>
							</div>
						`;
					} else {
						response = `
							<div class="col-lg-4 col-md-6 col-12">
								<a class="news-block" data-src="#news-block-inner-1"," data-fancybox="group">
									<div class="block-bg"><img src="./img/article-gallery-image.jpg" alt=""></div>
									<div class="block-bg-cover"></div>
									<p class="block-date gl-section-title">01 Августа 2017</p>
									<h2 class="block-title gl-content-title">Новость в три строки с картинкой на подложке с затемнением в 70%</h2>
								</a>
							</div>
							<div class="col-lg-4 col-md-6 col-12">
								<a class="news-block" data-src="#news-block-inner-1"," data-fancybox="group">
									<div class="block-bg"><img src="./img/article-gallery-image.jpg" alt=""></div>
									<div class="block-bg-cover"></div>
									<p class="block-date gl-section-title">07 Августа 2017</p>
									<h2 class="block-title gl-content-title">Новость в две строки с картинкой на подложке</h2>
								</a>
							</div>
							<div class="col-lg-4 col-md-6 col-12">
								<a class="news-block no-image" data-src="#news-block-inner-1"," data-fancybox="group">
									<div class="block-bg"></div>
									<div class="block-bg-cover"></div>
									<p class="block-date gl-section-title">10 Августа 2017</p>
									<h2 class="block-title gl-content-title">Новость в одну строку</h2>
								</a>
							</div>
						`;
					}
					setTimeout(function() {
						$('.gl-press-chart .row').append(response);
						stretchAndCenter($('.news-block'), '.block-bg img');
						$('.gl-section-button.press-show-more-inversed').css({ 'width': 0 });
					}, 1000);
				}
			});

			$('.gl-section-button.press-show-more-inversed').animate({
				'width': 230
			}, 800);

		});

	}

});