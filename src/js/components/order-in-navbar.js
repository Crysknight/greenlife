import order from './order';
import { orderChanged } from './order';

// Function to create white spaces in large numbers.
let indentPrice = (price) => {
	price += '';
	price = price.split('');
	price.reverse();
	for (let number in price) {
		if ((number) % 3 === 0) {
			price[number] += ' ';
		}
	}
	price.reverse();
	price = price.join('');
	return price;
};

// Functions to assign to controls. Names tell the story
let minusQuantity = (id) => {
	let item = order[id];
	if (item.quantity > 1) {
		item.quantity--;
		// Trigger rerender of the widget
		orderInNavbar.trigger(orderChanged);
	}
};

let plusQuantity = (id) => {
	let item = order[id];
	item.quantity++;
	// Trigger rerender of the widget
	orderInNavbar.trigger(orderChanged);
};

let deleteItem = (id) => {
	for (let i = 0; i < order.length; i++) {
		if (i === id) {
			order.splice(i, 1);
		}
	}
	// Trigger rerender of the widget
	orderInNavbar.trigger(orderChanged);
};

let controlDelivery = (id) => {
	let item = order[id];
	item.delivery = !item.delivery;
	// Trigger rerender of the widget
	orderInNavbar.trigger(orderChanged);
};

// Container of order widget
let orderInNavbar = $('.gl-your-order');

/* =================================================================================================== */
/* < MOCKER > */
/* =================================================================================================== */
let mockOrder = window.__gl_mockOrder = function() {
	order.push({
		name: 'Бытовка-склад',
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

$('.gl-your-order-content').append($('<p>Нажми на заголовок "Гринлайф"</p>').css({ "color": "#f9ad5b", "margin": "15px 0" }));
/* =================================================================================================== */
/* < /MOCKER > */
/* =================================================================================================== */

orderInNavbar.find('.gl-your-order-content').click(function(event) {
	event.stopPropagation();
});

// Widget render function assigned to order change event
orderInNavbar.on(orderChanged.type, function() {

	// If there is any order in the array, render them, else, render the message about no orders
	if (order.length > 0) {

		$(this).addClass('order-added');

		let priceSum = 0;

		let deliveryPriceSum = 0;

		let orderDisplay = `
			<div class="gl-order">
		`;

		for (let orderItemNumber in order) {

			let orderItem = order[orderItemNumber];

			priceSum += (orderItem.quantity * orderItem.price);

			let price = indentPrice(orderItem.quantity * orderItem.price);

			let deliveryPrice;
			if (orderItem.delivery) {
				deliveryPrice = indentPrice(orderItem.quantity * orderItem.deliveryPrice);
				deliveryPriceSum += orderItem.quantity * orderItem.deliveryPrice;
			}

			orderDisplay += `
				<div class="order-item" id="order_item_${orderItemNumber}">
					<div class="item-title">
						${orderItem.name}
					</div>
					<div class="item-price-controls">
						<div class="item-price">
							<span class="price-number">${price} Руб.</span>
							<span class="price-comment">В месяц</span>
						</div>
						<div class="item-controls">
							<button class="controls-minus">&minus;</button>
							<span class="item-quantity">${orderItem.quantity}</span>
							<button class="controls-plus">&plus;</button>
							<button class="item-delete">&times;</button>
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

		$(this).find('.gl-your-order-content').html(orderDisplay);

		$(this).find('.controls-minus').click(function(event) {
			event.stopPropagation();
			let id = +$(this).parents('.order-item').attr('id').slice(11);
			minusQuantity(id);
		});

		$(this).find('.controls-plus').click(function(event) {
			event.stopPropagation();
			let id = +$(this).parents('.order-item').attr('id').slice(11);
			plusQuantity(id);
		});

		$(this).find('.item-delete').click(function(event) {
			event.stopPropagation();
			let id = +$(this).parents('.order-item').attr('id').slice(11);
			deleteItem(id);
		});

		$(this).find('.delivery-checkbox').click(function(event) {
			event.stopPropagation();
			let id = +$(this).parents('.order-item').attr('id').slice(11);
			controlDelivery(id);
		});

		if ($('span.price-number').width() > 180) {
			$('span.price-number').css({ "font-size": "26px" });
		}

	} else {

		$(this).removeClass('order-added');

		$(this).find('.gl-your-order-content').html('Вы еще ничего не добавили в заказ');

	}

});