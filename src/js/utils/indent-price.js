const indentPrice = price => {
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

export default indentPrice;