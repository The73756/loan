export default class Accordion {
	 constructor(triggers, parentBlock) {
		this.trigger = document.querySelectorAll(triggers);
		this.parentBlock = parentBlock;
	}

	init() {
		this.trigger.forEach(el => {
			el.addEventListener('click', () => {
				el.closest(this.parentBlock).nextElementSibling.classList.toggle('msg--active');
			});
		});
	}
}

