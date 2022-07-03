export default class Slider {
	constructor(page, btns) {
		this.page = document.querySelector(page);
		this.slides = this.page.children;
		this.btns = document.querySelectorAll(btns);
		this.slideIndex = 1;
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
			if (n === 3) {
				setInterval(() => {
					this.hanson.style.transform = `translateY(0)`;
				}, 3000);
			} else {
				this.hanson.style.transform = `translateY(100%)`;
			}
		} catch (error) {}
	}

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}

	render() {
		try {
			this.hanson = document.querySelector('.hanson');
		} catch (error) {}

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

		this.showSlides(this.slideIndex);
	}
}