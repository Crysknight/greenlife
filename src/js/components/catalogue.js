import order from './order';
import indentPrice from '../utils/indent-price';

$(document).ready(function() {

	if ($('.gl-rack-info').length === 0) return;

	let item = {

		wrapper: $('.gl-rack-info'),

		name: $('.gl-rack-info').attr('data-name'),

		get basicPrice() {
			return +this.wrapper.find('.rack-basic-price .active .price-value.choose').text().replace(/ Руб\./, '');
		},

		get additionalPrice() {
			let price = 0;
			this.wrapper.find('.add-options .option-wrapper').each(function() {
				let optionPrice = +$(this).find('.option-price').text().replace(/^(\d+) .*/, '$1');
				let quantity = +$(this).find('.item-controls .item-quantity span').text();
				let optionSum = optionPrice * quantity;
				if (quantity > 0) {
					$(this).find('.controls-sum').text(`Итого: ${optionSum} руб.`);
				} else {
					$(this).find('.controls-sum').text('');
				}
				price += optionSum;
			});
			return price;
		},

		get priceSum() {
			return this.basicPrice + this.additionalPrice;
		},

		render: function() {
			this.wrapper.find('.price-value.additional').text(indentPrice(this.additionalPrice) + ' Руб.');
			this.wrapper.find('.price-value.sum').text(indentPrice(this.priceSum) + ' Руб.');
		}

	};

	item.render();

	$('.gl-rack-info .price').click(function() {
		if ($(this).hasClass('inactive')) {
			$('.gl-rack-info .price').removeClass('active');
			$('.gl-rack-info .price').addClass('inactive');
			$(this).removeClass('inactive');
			$(this).addClass('active');
			item.render();
		}
	});

	$('.gl-rack-info .option-wrapper .controls-minus').click(function() {
		let quantity = $(this).next('.item-quantity').find('span');
		if (+quantity.text() > 0) {
			quantity.text(+quantity.text() - 1);
		}
		item.render();
	});

	$('.gl-rack-info .option-wrapper .controls-plus').click(function() {
		let quantity = $(this).prev('.item-quantity').find('span');
		if (+quantity.text() < 10) {
			quantity.text(+quantity.text() + 1);
		}
		item.render();
	});

	$('.gl-rack-info .add-to-order').click(function() {
		let icon = $(this).next('.order-plus-icon');
		icon.removeAttr('style');
		icon.addClass('present');
		icon.offset({
			'top': $(this).offset().top,
			'left': $(this).offset().left + $(this).outerWidth() + 10
		});
		icon.animate({
			'top': 0 + $('.nav-item.gl-your-order').outerHeight() - icon.height(),
			'left': $(window).width() - $('.nav-item.gl-your-order').outerWidth()
		}, 400, 'easeInSine', function() {
			icon.css({ 'opacity': 0 });
			$('.nav-item.gl-your-order').addClass('order-just-added');
			setTimeout(function() {
				$('.nav-item.gl-your-order').removeClass('order-just-added');
			}, 300);
		});
	});

	/* =================================================================================================== */
	/* < MOCK PARTS > */
	/* =================================================================================================== */

	window.__item = item;

});