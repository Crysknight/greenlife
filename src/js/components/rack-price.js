$(document).ready(function() {

	if ($('.gl-rack-info .rack-price').length > 0 && $(window).width() >= 992) {

		let priceBlock = $('.rack-price');
		let priceBlockWidth = priceBlock.outerWidth();
		let priceBlockHeight = 
			priceBlock.find('.rack-price-inner').outerHeight() + 
			+priceBlock.css('padding-top').replace(/px/, '');
		let navbarHeight = $('nav.navbar').outerHeight();
		let footerOffset = $('.gl-footer').offset().top;
		let isPBBiggerThanWindow = priceBlockHeight > $(window).height() - navbarHeight;
		let priceBlockOffset = priceBlock.offset().top;
		let priceSumOffset = priceBlock.find('.rack-price-sum').offset().top;
		let priceSumHeight = 
			priceBlock.find('.rack-price-sum').outerHeight() + 32 + 
			+priceBlock.css('padding-top').replace(/px/, '');

		let scrollWithPrice = () => {
			let scroll = $(this).scrollTop();
			if (scroll + priceBlockHeight + navbarHeight + 72 >= footerOffset && !isPBBiggerThanWindow) {
				priceBlock.css({
					'position': 'absolute',
					'bottom': 0,
					'top': ''
				});
			} else if (scroll + priceSumHeight + navbarHeight + 72 >= footerOffset && isPBBiggerThanWindow) {
				priceBlock.css({
					'position': 'absolute',
					'bottom': 0,
					'top': ''
				});
			} else if (scroll >= priceBlockOffset && !isPBBiggerThanWindow) {
				priceBlock.css({
					'position': 'fixed',
					'top': navbarHeight,
					'bottom': 'none'
				});
				priceBlock.outerWidth(priceBlockWidth);
			} else if (scroll >= priceSumOffset - 112 && isPBBiggerThanWindow) {
				priceBlock.find('.rack-basic-price').css({ 'display': 'none' });
				priceBlock.css({
					'position': 'fixed',
					'top': navbarHeight,
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