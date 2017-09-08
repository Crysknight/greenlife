import stretchAndCenter from '../utils/stretch-and-center';


if ($('.rack-type').length > 0) {

	$(document).ready(stretchAndCenter($('.rack-type'), '.type-bg img'));

	$(window).resize(stretchAndCenter($('.rack-type'), '.type-bg img'));

}