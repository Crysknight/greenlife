const order = [];

const orderChanged = $.Event('ORDER_CHANGED');
const orderLoadedFromStorage = $.Event('ORDER_LOADED_FROM_STORAGE');

$(document).on(orderChanged.type, () => {
	for (let orderItem of order) {
		localStorage.setItem(`__gl_order_${orderItem.name}_${orderItem.id}`, '__present');
		for (let prop in orderItem) {
			if (prop === 'name' || prop === 'additional' || prop === 'id') continue;
			localStorage.setItem(`__gl_order_${orderItem.name}_${orderItem.id}_${prop}`, orderItem[prop]);
		}
		for (let additional of orderItem.additional) {
			localStorage.setItem(`__gl_order_${orderItem.name}_${orderItem.id}_additional_${additional.name}`, additional.quantity);
		}
	}
});

$(document).ready(() => {
	for (let item in localStorage) {
		if (!item.match(/__gl_order/)) continue;
		if (localStorage[item] === '__present') {
			let id = +item.replace(/__gl_order_.*_(\d+)$/, '$1');
			let name = item.replace(/__gl_order_(.*)_\d+$/, '$1');
			let price = +localStorage[`__gl_order_${name}_${id}_price`];
			let quantity = +localStorage[`__gl_order_${name}_${id}_quantity`];
			let delivery = JSON.parse(localStorage[`__gl_order_${name}_${id}_delivery`]);
			let deliveryPrice = +localStorage[`__gl_order_${name}_${id}_deliveryPrice`];
			order.push({ id, name, price, quantity, delivery, deliveryPrice, additional: [] });
		}
	}
	for (let item in localStorage) {
		if (!item.match(/__gl_order/)) continue;
		if (item.match(/_additional_/)) {
			let itemId = +item.replace(/__gl_order_.*_(\d+)_.*/, '$1');
			let name = item.replace(/__gl_order_.*_\d+_additional_(.*)/, '$1');
			let quantity = localStorage[item];
			order[itemId].additional.push({ name, quantity });
		}
	}
	setTimeout(function() {
		$(document).trigger(orderLoadedFromStorage)
	}, 2000);
});

export default order;
export { orderChanged, orderLoadedFromStorage };

/* =================================================================================================== */
/* < MOCK PARTS > */
/* =================================================================================================== */

window.__order = order;