export default class Download {
	constructor(triggers) {
		this.triggers = document.querySelectorAll(triggers);
		this.path = 'assets/img/mainbg.jpg';
	}

	downloadItem(path) {
		const link = document.createElement('a');

		link.setAttribute('href', path);
		link.setAttribute('download', 'mainbg.jpg');


		link.style.display = 'none';
		document.body.appendChild(link);

		link.click();

	}

	init () {
		this.triggers.forEach(el => {
			el.addEventListener('click', (e) => {
				this.downloadItem(this.path);
			});
		});
	}
}