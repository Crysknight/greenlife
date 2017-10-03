import 'jquery';
require('expose-loader?$!jquery');
import 'bootstrap';
import { device } from 'device.js';
import '@fancyapps/fancybox/dist/jquery.fancybox.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import '@fancyapps/fancybox/dist/jquery.fancybox.min.css';
import '../css/index.scss';

import './components/navbar';
import './components/sliders';
import './components/first-screen';
import './components/racks-info';
import './components/racks-feats';
import './components/gl-map';
import './components/order';
import './components/order-in-navbar';
import './components/racks-terms';
import './components/content-gallery';
import './components/rack-price';
import './components/catalogue';
import './components/press';
import './components/footer';

device.addClasses(document.documentElement);

if ($('html.ios').length > 0) {
	setTimeout(function() {
		for (let dropdown of document.querySelectorAll('.nav-item.dropdown')) {
			dropdown.addEventListener('click', function() {
				console.log('hello, motherfucker');
			});
		}
	}, 1000);
}