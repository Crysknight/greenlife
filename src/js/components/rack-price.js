$(document).ready(function() {

	if ($('.rack-price').length > 0) {

		let priceBlock = $('.rack-price');
		let priceBlockWidth = priceBlock.outerWidth();
		let priceBlockHeight = 
			priceBlock.find('.rack-price-inner').outerHeight() + 
			+priceBlock.css('padding-top').replace(/px/, '');
		let isPBBiggerThanWindow = priceBlockHeight > $(window).height() - $('nav.navbar').outerHeight();
		let priceBlockOffset = priceBlock.offset().top;
		let priceSumOffset = priceBlock.find('.rack-price-sum').offset().top;
		let priceSumHeight = 
			priceBlock.find('.rack-price-sum').outerHeight() + 32 + 
			+priceBlock.css('padding-top').replace(/px/, '');

		$(window).scroll(function() {
			let scroll = $(this).scrollTop();
			if (scroll + priceBlockHeight >= $('.gl-footer').offset().top && !isPBBiggerThanWindow) {
				priceBlock.css({
					'position': 'absolute',
					'bottom': 0
				});
			} else if (scroll + priceSumHeight >= $('.gl-footer').offset().top && isPBBiggerThanWindow) {
				priceBlock.css({
					'position': 'absolute',
					'bottom': 0
				});
			} else if (scroll >= priceBlockOffset && !isPBBiggerThanWindow) {
				priceBlock.css({
					'position': 'absolute',
					'top': scroll - priceBlockOffset
				});
				priceBlock.outerWidth(priceBlockWidth);
			} else if (scroll >= priceSumOffset - 32 && isPBBiggerThanWindow) {
				console.log('hello');
				priceBlock.find('.rack-basic-price').css({ 'display': 'none' });
				priceBlock.css({
					'position': 'absolute',
					'top': scroll - priceBlockOffset
				});
			} else {
				priceBlock.removeAttr('style');
				priceBlock.find('.rack-basic-price').removeAttr('style');
			}
		});

	}

});