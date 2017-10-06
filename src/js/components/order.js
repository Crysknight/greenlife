const order = [];
window.order = order;

const orderChanged = $.Event('ORDER_CHANGED');
const orderLoadedFromStorage = $.Event('ORDER_LOADED_FROM_STORAGE');

function lsTest(){
    let test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}

$(document).on(orderChanged.type, () => {

	if (lsTest() === true) {
		for (let item in localStorage) {
			if (item.match(/^__gl_order/)) delete localStorage[item];
		}
		for (let orderItem of order) {
			localStorage.setItem(`__gl_order_${orderItem.name}_${orderItem.id}`, '__present');
			for (let prop in orderItem) {
				if (prop === 'name' || prop === 'additional' || prop === 'id') continue;
				localStorage.setItem(`__gl_order_${orderItem.name}_${orderItem.id}_${prop}`, orderItem[prop]);
			}
			for (let additional of orderItem.additional) {
				localStorage.setItem(`__gl_order_${orderItem.name}_${orderItem.id}_additional_${additional.name}_${additional.quantity}`, additional.price);
			}
		}
	}

});

$(document).ready(() => {

	if (lsTest() === true) {
		for (let item in localStorage) {
			if (!item.match(/^__gl_order/)) continue;
			if (localStorage[item] === '__present') {
				let id = +item.replace(/^__gl_order_.*_(\d+)$/, '$1');
				let name = item.replace(/^__gl_order_(.*)_\d+$/, '$1');
				let basicPrice = +localStorage[`__gl_order_${name}_${id}_basicPrice`];
				let quantity = +localStorage[`__gl_order_${name}_${id}_quantity`];
				let delivery = JSON.parse(localStorage[`__gl_order_${name}_${id}_delivery`]);
				let deliveryPrice = +localStorage[`__gl_order_${name}_${id}_deliveryPrice`];
				let additionalPrice = +localStorage[`__gl_order_${name}_${id}_additionalPrice`];
				order.push({ id, name, basicPrice, quantity, delivery, deliveryPrice, additional: [] });
			}
		}
		for (let item in localStorage) {
			if (!item.match(/^__gl_order/)) continue;
			if (item.match(/_additional_/)) {
				let itemId = +item.replace(/^__gl_order_.*_(\d+)_.*/, '$1');
				let name = item.replace(/^__gl_order_.*_\d+_additional_(.*)_\d+$/, '$1');
				let quantity = +item.replace(/^__gl_order_.*_\d+_additional_.*_(\d+)$/, '$1');
				let price = +localStorage[item];
				let thisOrder;
				for (let i = 0; i < order.length; i++) {
					if (order[i].id === itemId) {
						thisOrder = order[i];
					}
				}
				thisOrder.additional.push({ name, quantity, price });
			}
		}
		for (let item of order) {
			item.additional.sort(function(a, b) {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
			});
		}
		$(document).trigger(orderLoadedFromStorage);
	}
});

export default order;
export { orderChanged, orderLoadedFromStorage };