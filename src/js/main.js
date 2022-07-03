import MainSlider from './modules/slider/slider-slider';
import VideoPlayer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
	const slider = new MainSlider({
		'btns': '.hext',
		'page': '.page'
	});
	
	slider.render(); 

	const player = new VideoPlayer('.showup .play', '.overlay');
	player.init();
});


