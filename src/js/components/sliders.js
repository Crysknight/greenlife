import slick from 'slick-carousel';
import LeftArrow from '../../img/arrow-left-slider.svg';
import RightArrow from '../../img/arrow-right-slider.svg';

if ($('.gl-slider').length > 0) {

	$(document).ready(function() {

		let gallerySlider = $('.gallery-slider');
		let racksSlider = $('.racks-slider');

		gallerySlider.slick({
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

		racksSlider.slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			prevArrow: `<div class="prev"><img src="${LeftArrow}" /></div>`,
			nextArrow: `<div class="next"><img src="${RightArrow}" /></div>`,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						infinite: true
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true
					}
				}
			]
		});

	});

}