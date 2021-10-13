import anime from '../frameworks/anime.es.js';
import * as utils from '../scripts/utilities.js';
import { s } from '../scripts/settings.js';

export class Chapter {
	constructor(_number, controllerContext) {
		this.ctrl = controllerContext;
		this.number = _number;
		this.container = document.querySelector(`#chapter_${this.number}`);
		this.prompt = document.querySelector(`#chapter_${this.number} > .prompt`);
		this.options = [document.querySelector(`#chapter_${this.number} > .option_1`), document.querySelector(`#chapter_${this.number} > .option_2`)];
		this.answers = [document.querySelector(`#chapter_${this.number} > .answer_1`), document.querySelector(`#chapter_${this.number} > .answer_2`)];
		this.buildEventListeners(`#chapter_${this.number} > .option_1`);
		this.buildEventListeners(`#chapter_${this.number} > .option_2`);
	}

	//Create options Events ————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	buildEventListeners(query) {
		const element = document.querySelector(query + ' > .op_container');
		element.addEventListener('mouseover', () => {
			if (element.parentElement.style.opacity > 0) {
				utils.anmiteHover(document.querySelector(query + ' > .op_hover'), s.hDuration, 0, 'show');
			}
		});
		element.addEventListener('mouseout', () => {
			if (element.parentElement.style.opacity > 0) {
				utils.anmiteHover(document.querySelector(query + ' > .op_hover'), s.hDuration, 0, 'hide');
			}
		});
		element.addEventListener('click', () => {
			this.revealAnswer(parseInt(query[query.length - 1]));
			if (this.ctrl.loopCount > 1 && Math.random() < s.crackProb) {
				this.ctrl.cracks.multipleCracks(Math.random() * 1 + 1, 150);
			}
		});
	}

	//Start Chapter ————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	introduceChapter() {
		this.resetStyles();

		this.clicks(false);
		utils.animateElement(this.prompt, s.pDuration, s.pDelay, () => {
			utils.animateElement(this.options[0], s.oDuration, s.oDelay, () => {
				utils.animateElement(this.options[1], s.oDuration, s.oDelay, () => {
					this.clicks(true);
				});
			});
		});
	}

	//House keeping, just in case ————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	resetStyles() {
		this.container.style.display = 'block';
		this.prompt.style.opacity = 0;
		this.prompt.style.display = 'block';
		this.options.forEach((item) => {
			item.style.opacity = 0;
			item.style.display = 'block';
		});
		document.querySelectorAll('#chapter_' + this.number + ' .op_hover').forEach((item) => {
			item.style.opacity = 0;
			item.style.strokeDashArray = 20000;
		});
	}

	//Reveal Answer ————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	revealAnswer(answer) {
		this.answers[answer - 1].style.opacity = 1;
		utils.animateElement(this.answers[answer - 1], s.aDuration, s.aDelay, () => {
			//ANIMATION
			this.ctrl.animations.displayAnimation(this.ctrl.currentChapter + 1, answer);

			setTimeout(() => {
				this.ctrl.showNextArrow();
			}, s.nextDelay);
		});

		//Hide and disable options
		this.options.forEach((item) => {
			item.style.opacity = 0;
			setTimeout(() => {
				item.style.display = 'none';
			}, utils.getCSS_delay('optionOpacityDelay'));
		});
	}

	//Close chapter ————————————————————————————————————————————————————————————————————————————————————————————————————————————————
	closeChapter() {
		this.prompt.style.opacity = 0;
		this.answers[0].style.opacity = 0;
		this.answers[1].style.opacity = 0;
		this.options[0].style.opacity = 0;
		this.options[1].style.opacity = 0;
		setTimeout(() => {
			this.container.style.display = 'none';
		}, s.defaultFade);
	}

	clicks(state) {
		document.querySelectorAll('#chapter_' + this.number + ' .op_container').forEach((item, i) => {
			if (state) {
				item.style.pointerEvents = 'all';
			} else {
				item.style.pointerEvents = 'none';
			}
		});
	}
}
