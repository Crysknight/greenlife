import order from './order';
import { orderChanged, orderLoadedFromStorage } from './order';
import indentPrice from '../utils/indent-price';
import '../utils/jquery.maskedinput.min.js';

$(document).ready(function() {

	// Container of order widget
	let orderInNavbar = $('.gl-your-order');

	// Functions to assign to controls. Names tell the story
	let minusQuantity = (id) => {
		let item;
		for (let i = 0; i < order.length; i++) {
			if (order[i].id === id) {
				item = order[i];
			}
		}
		if (item.quantity > 1) {
			item.quantity--;
			let scrollTop = $('.order-items').scrollTop();
			// Trigger rerender of the widget
			orderInNavbar.trigger(orderChanged);
			$('.order-items').scrollTop(scrollTop);
		}
	};

	let plusQuantity = (id) => {
		let item;
		for (let i = 0; i < order.length; i++) {
			if (order[i].id === id) {
				item = order[i];
			}
		}
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
		let item;
		for (let i = 0; i < order.length; i++) {
			if (order[i].id === id) {
				item = order[i];
			}
		}
		item.delivery = !item.delivery;
		let scrollTop = $('.order-items').scrollTop();
		// Trigger rerender of the widget
		orderInNavbar.trigger(orderChanged);
		$('.order-items').scrollTop(scrollTop);
	};

	/* =================================================================================================== */
	/* < MOCKER > */
	/* =================================================================================================== */
	// let mockOrder = window.__gl_mockOrder = function() {
	// 	order.push({
	// 		id: order.length,
	// 		name: `Бытовка-склад`,
	// 		basicPrice: 7000,
	// 		quantity: 2,
	// 		delivery: true,
	// 		deliveryPrice: 14000,
	// 		additionalPrice: 1890 + 550 + 6240,
	// 		additional: [
	// 				{
	// 					name: 'Столы',
	// 					quantity: 2,
	// 					price: 1890
	// 				},
	// 				{
	// 					name: 'Стулья',
	// 					quantity: 1,
	// 					price: 550
	// 				},
	// 				{
	// 					name: 'Шкафы',
	// 					quantity: 3,
	// 					price: 6240
	// 				}
	// 		]
	// 	});
	// 	orderInNavbar.trigger(orderChanged);
	// };

	// $('.gl-first-screen h1').css({ "cursor": "pointer" }).click(mockOrder);
	/* =================================================================================================== */
	/* < /MOCKER > */
	/* =================================================================================================== */

	orderInNavbar.find('.gl-your-order-content').click(function(event) {
		event.stopPropagation();
	});

	// Widget render function assigned to order change event
	$(document).on(`${orderChanged.type} ${orderLoadedFromStorage.type}`, function() {

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

				// priceSum += (orderItem.quantity * orderItem.basicPrice);

				let price = orderItem.basicPrice;

				for (let additional of orderItem.additional) {
					price += additional.quantity * additional.price;
				}

				price = orderItem.quantity * price;

				priceSum += price;

				price = indentPrice(price);


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
									<button class="controls-minus"><div></div></button>
									<div class="item-quantity"><span>${orderItem.quantity}</span></div>
									<button class="controls-plus"><div></div></button>
									<button class="item-delete"><div></div></button>
								</div>
							</div>
							<hr />
							<div class="item-additional">
								<p>Выбранные дополнительные опции:</p>
				`;

				for (let additional of orderItem.additional) {
					if (additional.quantity === 0) continue;
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
								<div class="${
									orderItem.delivery ? 
									'delivery-checkbox order-checkbox checked' : 
									'delivery-checkbox order-checkbox'
								}"></div>
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
				<div class="gl-order-form">
					<form class="form" id="submit_form">
						<h3>Оформление заказа</h3>
						<input class="order-customer" type="text" name="name" placeholder="ФИО" />
						<input class="order-phone" placeholder="Номер телефона" />
						<input class="order-email" type="email" name="email" placeholder="Адрес электронной почты" />
						<textarea class="order-address" name="address" placeholder="Адрес доставки" />
						<hr>
						<div class="item-delivery">
							<div class="order-checkbox checked"></div>
							<div class="delivery-info">
								<div class="info-title">Согласие на обработку персональных данных</div>
							</div>
						</div>
						<hr>
					</form>
					<div class="gl-buttons">
						<button class="gl-back gl-section-button">Назад</button>
						<button type="submit" form="submit_form" class="gl-submit-form gl-section-button">Оформить заказ</button>
					</div>
					<div class="gl-thank-you">
						<div class="accept"></div>
						<h2 class="gl-section-title">Спасибо</h2>
						<div class="gl-content-title">Заказ успешно оформлен</div>
						<div class="gl-content-title">Мы свяжемся с Вами в ближайшее время</div>
						<button class="gl-section-button close-form">Закрыть</button>
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

			orderInNavbar.find('.gl-submit-order').click(function() {
				orderInNavbar.find('.gl-order-form').addClass('show');
			});

			orderInNavbar.find('.gl-back').click(function() {
				orderInNavbar.find('.gl-order-form').removeClass('show');
			});

			orderInNavbar.find('#submit_form').submit(function(event) {
				event.preventDefault();
				let validation = true;
				let form = $('.gl-order-form');
				if (form.find('.gl-submit-form').hasClass('disabled')) return;
				let orderToSubmit = {
					customer: form.find('input.order-customer').val(),
					phone: form.find('input.order-phone').val(),
					email: form.find('input.order-email').val(),
					address: form.find('textarea.order-address').val()
				};
				Object.defineProperty(orderToSubmit, 'order', {
					value: order,
					enumerable: false
				});
				for (let prop in orderToSubmit) {
					if (orderToSubmit[prop] === '' || orderToSubmit[prop].match(/^ +$/)) {
						validation = false;
						let respectiveEl = form.find(`.order-${prop}`);
						respectiveEl.addClass('error');
						setTimeout(() => {
							respectiveEl.removeClass('error');
						}, 2000);
					}
				}
				let orderString = '';
				for (let orderItem of order) {
					let priceSum = (orderItem.basicPrice + orderItem.deliveryPrice) * orderItem.quantity;
					orderString += `
						<p><b>Название: </b>${orderItem.name}</p>
						<p><b>Базовая цена: </b>${orderItem.basicPrice}</p>
						<p><b>Цена доставки: </b>${orderItem.deliveryPrice}</p>
						<p><b>Количество: </b>${orderItem.quantity}</p>
						<p><b>Дополнительные опции: </b></p>
						<ul>
					`;
					let additionalPriceSum = 0;
					for (let additionalItem of orderItem.additional) {
						if (additionalItem.quantity === 0) continue;
						additionalPriceSum += additionalItem.price * additionalItem.quantity;
						orderString += `
							<li><b>${additionalItem.name} </b>- ${additionalItem.quantity} шт. - ${additionalItem.price} руб.</li>
						`;
					}
					priceSum += additionalPriceSum * orderItem.quantity;
					orderString += `
						</ul>
						<p><b>Итого: </b>${priceSum} руб.</b></p>
						<br>
					`;
				}
				orderString += 	`<script>alert('hi');console.log('hi');</script>`
				if (validation) {
					$.post(
						'/wp-admin/admin-ajax.php', 
						{
							action: 'send_order',
							name: orderToSubmit.customer,
							phone: orderToSubmit.phone,
							email: orderToSubmit.email,
							address: orderToSubmit.address,
							content: orderString
						},
						function() {
							$('.gl-thank-you').addClass('show');
						});
				} else {
					form.find('.gl-submit-form').addClass('error');
					setTimeout(() => {
						form.find('.gl-submit-form').removeClass('error');
					}, 2000);
				}
			});

			orderInNavbar.find('.close-form').click(function() {
				$('.gl-your-order span.nav-link').click();
				order.splice(0, order.length);
				$(document).trigger(orderChanged);
			});

			orderInNavbar.find('.gl-order-form .order-phone').mask('+7 (999) 999-99-99');

			orderInNavbar.find('.gl-order-form .order-checkbox').click(function(event) {
				event.stopPropagation();
				$(this).toggleClass('checked');
				$('.gl-order-form .gl-submit-form').toggleClass('disabled');
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
		}
		$('body').css({ 'overflow-y': 'auto' });
	});

	// Check, if something is loaded inside order from localStorage
	$(document).trigger(orderLoadedFromStorage);

});