window.addEventListener('load', function() {

	if ($('.gl-rack-info .rack-price').length > 0 && $(window).width() >= 992) {

		let priceBlock = $('.rack-price');
		let priceBlockWidth = priceBlock.outerWidth();
		let priceBlockHeight = priceBlock.find('.rack-price-inner').outerHeight();
		let navbarHeight = $('nav.navbar').outerHeight();
		let footerOffset = $('.gl-footer').offset().top;
		let isPBBiggerThanWindow = priceBlockHeight > $(window).height() - navbarHeight;
		let priceBlockOffset = priceBlock.offset().top;
		let priceSumOffset = priceBlock.find('.rack-price-sum').offset().top;
		let priceSumHeight = priceBlock.find('.rack-price-sum').outerHeight();
		let priceBlockBasicPrice = priceBlock.find('.rack-basic-price');

		let scrollWithPrice = () => {
			let scroll = $(this).scrollTop();
			// console.log(scroll + priceSumHeight + navbarHeight, footerOffset);
			if (scroll + priceBlockHeight + navbarHeight >= footerOffset && !isPBBiggerThanWindow) {
				priceBlock.css({
					'position': 'absolute',
					'bottom': 0,
					'top': ''
				});
			} else if (scroll + priceSumHeight + navbarHeight >= footerOffset && isPBBiggerThanWindow) {
				priceBlock.css({
					'position': 'absolute',
					'bottom': 0,
					'top': ''
				});
			} else if (scroll + navbarHeight >= priceBlockOffset && !isPBBiggerThanWindow) {
				priceBlock.css({
					'position': 'fixed',
					'top': navbarHeight - 1,
					'bottom': 'none'
				});
				priceBlock.outerWidth(priceBlockWidth);
			} else if (scroll + navbarHeight >= priceSumOffset && isPBBiggerThanWindow) {
				priceBlockBasicPrice.css({ 'display': 'none' });
				priceBlock.css({
					'position': 'fixed',
					'top': navbarHeight - 1,
					'bottom': 'none'
				});
				priceBlock.outerWidth(priceBlockWidth);
			} else {
				priceBlock.removeAttr('style');
				priceBlock.find('.rack-basic-price').removeAttr('style');
			}
		};

		$(document).ready(scrollWithPrice);

		$(window).scroll(scrollWithPrice);

	} else if ($('.gl-rack-info .rack-price').length > 0 && $(window).width() < 992) {
		$('.info-bg.right').height($('.rack-info').outerHeight());
	}

});