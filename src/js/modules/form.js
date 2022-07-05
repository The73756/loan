export default class Form {
	constructor(form, url) {
		this.forms = document.querySelectorAll(form);
		this.message = {
			loading: 'Загрузка...',
			success: 'Спасибо! Скоро мы с вами свяжемся!',
			failure: 'Что-то пошло не так...',
		};
		this.path = url;
	}

	async postData(url, data) {
		let result = await fetch(url, {
			method: 'POST',
			body: data,
		});

		return await result.text();
	}

	clearInputs(inputs) {
		inputs.forEach(input => {
			input.value = '';
		});
	}

	checkMailInputs() {
		const mailInputs = document.querySelectorAll('[type="email"]');

		mailInputs.forEach(input => {
			input.addEventListener('keypress', function (e) {
				if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
					e.preventDefault();
				}
			});

			input.addEventListener('input', function (e) {
				if (input.value.match(/[^a-z 0-9 @ \.]/ig)) {
					input.value = '';
				}
			});
		});
	}

	initMask() {
		let setCursorPosition = (pos, el) => {
			el.focus();

			if (el.setSelectionRange) {
				el.setSelectionRange(pos, pos);
			} else if (el.createTextRange) {
				let range = el.createTextRange();

				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		};

		function createMask(event) {
			let matrix = '+1 (___) ___-____',
				i = 0,
				def = matrix.replace(/\D/g, ''),
				val = this.value.replace(/\D/g, '');

			if (def.length >= val.length) {
				val = def;
			}

			this.value = matrix.replace(/./g, function (a) {
				return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
			});

			if (event.type === 'blur') {
				if (this.value.length === 2) {
					this.value = '';
				}
			} else {
				setCursorPosition(this.value.length, this);
			}
		}

		let inputs = document.querySelectorAll('[name="phone"]');

		inputs.forEach(input => {
			input.addEventListener('input', createMask);
			input.addEventListener('focus', createMask);
			input.addEventListener('blur', createMask);
		});
	}

	init() {
		this.checkMailInputs();
		this.initMask();
		this.forms.forEach(form => {
			this.inputs = form.querySelectorAll('input');

			form.addEventListener('submit', (e) => {
				e.preventDefault();

				let statusMessage = document.createElement('div');
				statusMessage.style.cssText = `
					margin-top: 15px;
					font-size: 18px;
					color: #ff9000;
				`;
				form.parentNode.appendChild(statusMessage);

				statusMessage.textContent = this.message.loading;

				const formData = new FormData(form);

				this.postData(this.path, formData)
					.then(res => {
						console.log(res);
						statusMessage.textContent = this.message.success;
					})
					.catch((err) => {
						statusMessage.textContent = this.message.failure;
					})
					.finally(() => {
						this.clearInputs(this.inputs);
						setTimeout(() => {
							statusMessage.remove();
						}, 5000);
					});
			});
		});
	}
}