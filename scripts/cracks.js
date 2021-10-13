import * as utils from '../scripts/utilities.js';
import anime from '../frameworks/anime.es.js';

export class Cracks {
	constructor() {
		this.screenContainer = document.querySelector('#crackScreenContainer');
		this.cracks = document.querySelectorAll('#actualCracks > svg');
		this.crackTransition = document.querySelector('#crackTransition');

		this.cracks.forEach((item) => {
			item.childNodes.forEach((subItem) => {
				if (subItem.nodeName === 'polygon') {
					this.buildListeners(subItem);
				}
			});
		});

		document.querySelector('#crackScreen > .close').addEventListener('click', () => {
			this.hideScreen();
		});
	}

	addCrack() {
		const polys = this.cracks[Math.floor(Math.random() * this.cracks.length)].getElementsByTagName('polygon');
		this.introCrack(polys[Math.floor(Math.random() * polys.length)]);
	}

	introCrack(element) {
		if (element.style.opacity == 0) {
			element.style.opacity = 1;
			anime({
				targets: element,
				keyframes: [
					{
						translateX: -10,
					},
					{
						translateX: 0,
					},
				],
				duration: 50 + Math.random() * 50,
				loop: 2 + parseInt(Math.random() * 3),
			});
		}
	}

	buildListeners(element) {
		element.addEventListener('click', (event) => {
			this.startTransition(event);

			setTimeout(() => {
				this.resetTransition();
				this.displayScreen();
			}, utils.getCSS_delay('crackTransitionDuration'));
		});
	}

	displayScreen() {
		this.screenContainer.style.display = 'block';
	}

	hideScreen() {
		this.screenContainer.style.display = 'none';
	}

	startTransition(event) {
		this.crackTransition.style.left = event.pageX + 'px';
		this.crackTransition.style.top = event.pageY + 'px';
		this.crackTransition.style.opacity = 1;
		this.crackTransition.style.width = 3 * Math.max(window.innerWidth - event.pageX, event.pageX) + 'px';
		this.crackTransition.style.height = 3 * Math.max(window.innerHeight - event.pageY, event.pageY) + 'px';
	}

	resetTransition() {
		this.crackTransition.style.left = '-3000px';
		this.crackTransition.style.top = '-3000px';
		this.crackTransition.style.opacity = 0;
		this.crackTransition.style.width = '0px';
		this.crackTransition.style.height = '0px';
	}
}
