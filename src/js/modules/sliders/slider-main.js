import Slider from './slider';

export default class MainSlider extends Slider {
	constructor(btns, nextBtns, prevBtns) {
		super(btns, nextBtns, prevBtns);
	}

	showSlides(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}

		if (n < 1) {
			this.slideIndex = this.slides.length;
		}

		this.slides.forEach(slide => {
			slide.classList.remove('show-slides');
		});

		this.slides[this.slideIndex - 1].classList.add('show-slides');

		try {
			if (this.hanson) {
				if (n === 3) {
					this.hansonTimer = setInterval(() => {
						this.hanson.style.transform = `translateY(0)`;
					}, 3000);
				} else {
					this.hanson.style.transform = `translateY(100%)`;
					clearInterval(this.hansonTimer);
				}
			}
		} catch (error) {}
	}

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	bindTriggers() {
		this.btns.forEach(el => {
			el.addEventListener('click', () => {
				this.plusSlides(1);
			});

			el.parentNode.previousElementSibling.addEventListener('click', (e) => {
				e.preventDefault();
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			});
		});

		this.prevBtns.forEach(el => {
			el.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				this.plusSlides(-1);
			});
		});

		this.nextBtns.forEach(el => {
			el.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				this.plusSlides(1);
			});
		});
	}

	render() {
		if (this.container) {
			try {
				this.hanson = document.querySelector('.hanson');
			} catch (error) {}

			this.showSlides(this.slideIndex);
			this.bindTriggers();
		}
	}
}