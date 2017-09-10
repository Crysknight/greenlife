import order from './order';
import { orderChanged, orderLoadedFromStorage } from './order';
import svgPlus from '../../img/plus.svg';
import svgMinus from '../../img/minus.svg';
import indentPrice from '../utils/indent-price';

$(document).ready(function() {

	// Container of order widget
	let orderInNavbar = $('.gl-your-order');

	// Functions to assign to controls. Names tell the story
	let minusQuantity = (id) => {
		let item = order[id];
		if (item.quantity > 1) {
			item.quantity--;
			let scrollTop = $('.order-items').scrollTop();
			// Trigger rerender of the widget
			orderInNavbar.trigger(orderChanged);
			$('.order-items').scrollTop(scrollTop);
		}
	};

	let plusQuantity = (id) => {
		let item = order[id];
		item.quantity++;
		let scrollTop = $('.order-items').scrollTop();
		// Trigger rerender of the widget
		orderInNavbar.trigger(orderChanged);
		$('.order-items').scrollTop(scrollTop);
	};

	let deleteItem = (id) => {
		for (let i = 0; i < order.length; i++) {
			if (order[i].id === id) {
				order.splice(i, 1);
			}
		}
		// Trigger rerender of the widget
		orderInNavbar.trigger(orderChanged);
	};

	let controlDelivery = (id) => {
		let item = order[id];
		item.delivery = !item.delivery;
		let scrollTop = $('.order-items').scrollTop();
		// Trigger rerender of the widget
		orderInNavbar.trigger(orderChanged);
		$('.order-items').scrollTop(scrollTop);
	};

	/* =================================================================================================== */
	/* < MOCKER > */
	/* =================================================================================================== */
	let mockOrder = window.__gl_mockOrder = function() {
		order.push({
			id: order.length,
			name: `Бытовка-склад`,
			price: 15300,
			quantity: 2,
			delivery: true,
			deliveryPrice: 14000,
			additional: [
					{
						name: 'Столы',
						quantity: 2
					},
					{
						name: 'Стулья',
						quantity: 1
					},
					{
						name: 'Шкафы',
						quantity: 3
					}
			]
		});
		orderInNavbar.trigger(orderChanged);
	};

	$('.gl-first-screen h1').css({ "cursor": "pointer" }).click(mockOrder);
	/* =================================================================================================== */
	/* < /MOCKER > */
	/* =================================================================================================== */

	orderInNavbar.find('.gl-your-order-content').click(function(event) {
		event.stopPropagation();
	});

	$(document).on(orderLoadedFromStorage.type, function() { console.log('hello') });

	// Widget render function assigned to order change event
	$(document).on(`${orderChanged.type} ${orderLoadedFromStorage.type}`, function() {

		console.log('hello');

		// If there is any order in the array, render them, else, render the message about no orders
		if (order.length > 0) {

			orderInNavbar.addClass('order-added');

			let priceSum = 0;

			let deliveryPriceSum = 0;

			let orderDisplay = `
				<div class="close-button"></div>
				<div class="gl-order">
					<div class="order-items">
			`;

			for (let orderItem of order) {

				priceSum += (orderItem.quantity * orderItem.price);

				let price = indentPrice(orderItem.quantity * orderItem.price);

				let deliveryPrice;
				if (orderItem.delivery) {
					deliveryPrice = indentPrice(orderItem.quantity * orderItem.deliveryPrice);
					deliveryPriceSum += orderItem.quantity * orderItem.deliveryPrice;
				}

				orderDisplay += `
						<div class="order-item" id="order_item_${orderItem.id}">
							<div class="item-title">
								${orderItem.name}
							</div>
							<div class="item-price-controls">
								<div class="item-price">
									<span class="price-number">${price} Руб.</span>
									<span class="price-comment">В месяц</span>
								</div>
								<div class="item-controls">
									<button class="controls-minus"><img src="${svgMinus}"></button>
									<div class="item-quantity"><span>${orderItem.quantity}</span></div>
									<button class="controls-plus"><img src="${svgPlus}"></button>
									<button class="item-delete"><img src="${svgPlus}"></button>
								</div>
							</div>
							<hr />
							<div class="item-additional">
								<p>Выбранные дополнительные опции:</p>
				`;

				for (let additional of orderItem.additional) {
					orderDisplay += `
								<span>${additional.name} (${additional.quantity}), </span>
					`;
				}

				if (orderItem.additional.length > 0) {
					orderDisplay = orderDisplay.trim().replace(/\), <\/span>$/, ')</span>');
				}

				orderDisplay += `
							</div>
							<hr />
							<div class="item-delivery">
								<div class="${orderItem.delivery ? 'delivery-checkbox checked' : 'delivery-checkbox'}"></div>
								<div class="delivery-info">
									<div class="info-title">Доставить эту бытовку</div>
									<p>Оплата за доставку и возврат вносится единовременно и составляет 14000 руб. за бытовку</p>
								</div>
							</div>
							<hr />
							<div class="item-sum">
								<div>
									<span class="price-number">${price} Руб.</span>
									<span class="price-comment">В месяц</span>
								</div>
								${orderItem.delivery ? `
								<div>&plus;</div>
								<div>
									<span class="price-number">${deliveryPrice} Руб.</span>
									<span class="price-comment">За доставку</span>
								</div>
								` : ''}
							</div>
						</div>
				`;
			}

			priceSum = indentPrice(priceSum);

			orderDisplay += `
					</div>
					<div class="order-sum">
						<div class="sum-title">Итого к оплате:</div>
						<div class="prices">
							<div>
								<span class="price-number">${priceSum} Руб.</span>
								<span class="price-comment">В месяц</span>
							</div>
							${deliveryPriceSum > 0 ? `
							<div>&plus;</div>
							<div>
								<span class="price-number">${indentPrice(deliveryPriceSum)} Руб.</span>
								<span class="price-comment">За доставку</span>
							</div>
							` : ''}
						</div>
						<div class="sum-comment">
							<p>Данная стоимость является ориентировочной.</p>
							<p>Окончательную стоимость Вам сообщит наш менеджер.</p>
						</div>
					</div>
					<div class="order-submit-section">
						<button class="gl-submit-order gl-section-button">Оформить заказ</button>
					</div>
				</div>
			`;

			orderInNavbar.find('.gl-your-order-content').html(orderDisplay);

			orderInNavbar.find('.close-button').click(function() {
				orderInNavbar.find('.nav-link').dropdown('toggle');
			});

			orderInNavbar.find('.controls-minus').click(function(event) {
				event.stopPropagation();
				let id = +$(this).parents('.order-item').attr('id').slice(11);
				minusQuantity(id);
			});

			orderInNavbar.find('.controls-plus').click(function(event) {
				event.stopPropagation();
				let id = +$(this).parents('.order-item').attr('id').slice(11);
				plusQuantity(id);
			});

			orderInNavbar.find('.item-delete').click(function(event) {
				event.stopPropagation();
				let id = +$(this).parents('.order-item').attr('id').slice(11);
				deleteItem(id);
			});

			orderInNavbar.find('.delivery-checkbox').click(function(event) {
				event.stopPropagation();
				let id = +$(this).parents('.order-item').attr('id').slice(11);
				controlDelivery(id);
			});

			if ($('span.price-number').width() > 180) {
				$('span.price-number').css({ "font-size": "26px" });
			}

		} else {

			orderInNavbar.removeClass('order-added');

			orderInNavbar.find('.gl-your-order-content').html('Вы еще ничего не добавили в заказ');

		}

	});

	orderInNavbar.on('shown.bs.dropdown', function(event) {
		if ($(this).hasClass('order-added')) {
			$(this).find('.gl-your-order-content').animate({
				right: 0
			}, 200);
			$('body').css({ 'overflow-y': 'hidden' });
		}
	});

	orderInNavbar.on('hide.bs.dropdown', function(event) {
		if ($(this).hasClass('order-added')) {
			let dropdown = $(this).find('.dropdown-menu');
			dropdown.css({ display: 'block' });
			$(this).find('.gl-your-order-content').animate({
				right: -450
			}, {
				duration: 200,
				complete: function() {
					dropdown.removeAttr('style');
				}
			});
			$('body').css({ 'overflow-y': 'auto' });
		}
	});

});