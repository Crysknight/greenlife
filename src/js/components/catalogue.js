import order from './order';
import { orderChanged } from './order';
import indentPrice from '../utils/indent-price';

$(document).ready(function() {

	if ($('.gl-rack-info').length === 0) return;

	let item = {

		wrapper: $('.gl-rack-info'),

		name: $('.gl-rack-info').attr('data-name'),

		deliveryPrice: +$('.gl-rack-info').attr('data-delivery-price'),

		get basicPrice() {
			return +this.wrapper.find('.rack-basic-price .active .price-value.choose').text().replace(/ Руб\./, '');
		},

		get additional() {
			let additional = [];
			this.wrapper.find('.add-options .option-wrapper').each(function() {
				let name = $(this).find('.option-name').text().trim().replace(/:/, '');
				let quantity = +$(this).find('.item-controls .item-quantity span').text();
				let price = +$(this).find('.option-price').text().replace(/^(\d+) .*/, '$1');
				let optionSum = quantity * price;
				if (quantity > 0) {
					$(this).find('.controls-sum').text(`Итого: ${optionSum} руб.`);
				} else {
					$(this).find('.controls-sum').text('');
				}
				additional.push({
					name,
					quantity,
					price
				});
			});
			additional.sort(function(a, b) {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
			});
			return additional;
		},

		get additionalPrice() {
			let price = 0;
			for (let additional of this.additional) {
				price += additional.quantity * additional.price;
			}
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
		}, {
			duration: 400,
			complete: function() {
				icon.css({ 'opacity': 0 });
				$('.nav-item.gl-your-order').addClass('order-just-added');
				setTimeout(function() {
					$('.nav-item.gl-your-order').removeClass('order-just-added');
				}, 300);
			},
		});

		let itemToAdd = {
			id: order.length,
			name: item.name,
			basicPrice: item.basicPrice,
			quantity: 1,
			delivery: true,
			deliveryPrice: item.deliveryPrice,
			additional: item.additional,
			additionalPrice: item.additionalPrice
		};

		let itemIsNew = true;

		for (let item of order) {
			let itemIsOld = true;
			for (let prop in item) {
				if (
					prop === 'id' || 
					prop === 'quantity' || 
					prop === 'delivery' || 
					prop === 'additional'
				) continue;
				// console.log(item[prop], itemToAdd[prop]);
				if (item[prop] !== itemToAdd[prop]) itemIsOld = false;
			}
			if (!itemIsOld) continue;
			for (let i = 0; i < item.additional.length; i++) {
				let additional = item.additional[i];
				let ITAAdditional = itemToAdd.additional[i];
				if (
					additional.name !== ITAAdditional.name ||
					additional.quantity !== ITAAdditional.quantity ||
					additional.price !== ITAAdditional.price
				) {
					itemIsOld = false;
				}
			}
			if (itemIsOld) {
				itemIsNew = false;
				item.quantity++;
			}
		}

		if (itemIsNew) {
			order.push(itemToAdd);
		}

		$(document).trigger(orderChanged);

		// console.log(itemIsNew);
		// console.dir(itemToAdd);

		// order.push({
		// 	id: order.length,
		// 	name: `Бытовка-склад`,
		// 	basicPrice: 7000,
		// 	quantity: 2,
		// 	delivery: true,
		// 	deliveryPrice: 14000,
		// 	additional: [
		// 			{
		// 				name: 'Столы',
		// 				quantity: 2,
		// 				price: 1890
		// 			},
		// 			{
		// 				name: 'Стулья',
		// 				quantity: 1,
		// 				price: 550
		// 			},
		// 			{
		// 				name: 'Шкафы',
		// 				quantity: 3,
		// 				price: 6240
		// 			}
		// 	]
		// });
	});

	/* =================================================================================================== */
	/* < MOCK PARTS > */
	/* =================================================================================================== */

	window.__item = item;

});