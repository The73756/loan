import MainSlider from './modules/sliders/slider-main';
import MiniSlider from './modules/sliders/slider-mini';
import VideoPlayer from './modules/playVideo';
import Differense from './modules/differense';
import Form from './modules/form';

window.addEventListener('DOMContentLoaded', () => {
	const slider = new MainSlider({
		'btns': '.next',
		'container': '.page'
	});
	slider.render();

	const showUpSlider = new MiniSlider({
		'container': '.showup__content-slider',
		'next': '.showup__next',
		'prev': '.showup__prev',
		'activeClass': 'card-active',
		'animate': 'true',
	});
	showUpSlider.init();

	const modulesSlider = new MiniSlider({
		'container': '.modules__content-slider',
		'next': '.modules__info-btns .slick-next',
		'prev': '.modules__info-btns .slick-prev',
		'activeClass': 'card-active',
		'animate': 'true',
		'autoplay': 'true',
		'stopable': 'true'
	});
	modulesSlider.init();

	const feedSlider = new MiniSlider({
		'container': '.feed__slider',
		'next': '.slick-next--feed',
		'prev': '.slick-prev--feed',
		'activeClass': 'feed__item-active'
	});
	feedSlider.init();

	const player = new VideoPlayer('.showup .play', '.overlay');
	player.init();

	const differense = new Differense('.officerold', '.officernew', '.officer__card-item');
	differense.init();

	new Form ('.form', 'assets/question.php').init();
});