import slick from 'slick-carousel';
import LeftArrow from '../../img/arrow-left-slider.svg';
import RightArrow from '../../img/arrow-right-slider.svg';

let slider = $('.gallery-slider');

slider.slick({
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	prevArrow: `<div class="prev"><img src="${LeftArrow}" /></div>`,
	nextArrow: `<div class="next"><img src="${RightArrow}" /></div>`,
	responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true
			}
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true
			}
		}
	]
});