import anime from '../frameworks/anime.es.js';
import * as utils from '../scripts/utilities.js';
import * as glitch from '../scripts/glitches.js';
import { s, speedUp } from '../scripts/settings.js';
import { Chapter } from '../scripts/chapter.js';
import { Cracks } from '../scripts/cracks.js';
import { BackgroundAnimationController } from '../scripts/backgroundAnimations.js';
import { CrackController } from '../scripts/crackController.js';

export class Controller {
	constructor(_numChapters) {
		this.loopCount = 0;
		this.currentChapter = 0;
		this.state = 0;
		this.maxLoops = 5;
		this.numChapters = _numChapters;
		this.glitch = null;

		this.cracks = new CrackController(this);

		this.arrow = document.querySelector('#nextArrrow');
		document.querySelector('#nextArrrow > .svgContainer').addEventListener('mouseover', () => {
			utils.animateArrow(this.arrow, s.naDuration, s.naDelay, s.bobAmount, s.bobDuration, 0, false);
		});

		document.querySelector('#nextArrrow > .svgContainer').addEventListener('click', () => {
			this.arrow.style.opacity = 0;
			this.nextChapter();

			if (this.loopCount > 1 && Math.random() < s.crackProb) {
				this.cracks.multipleCracks(Math.random() * 1 + 1, 150);
			}

			setTimeout(() => {
				this.arrow.style.display = 'none';
			}, utils.getCSS_delay('defaultFade'));
		});

		this.animations = new BackgroundAnimationController();
		this.chapters = [];

		this.transitionScreen = document.querySelector('#transitionScreen');
	}

	loadChapters(_callback) {
		const ctx = this;
		for (let i = 1; i <= this.numChapters; i++) {
			$(`#chapter_${i}`).load(`resources/chapters/${i}/chapter${i}.html`, () => {
				this.chapters[i - 1] = new Chapter(i, ctx);
				if (i == this.numChapters) {
					_callback();
				}
			});
		}
	}

	begin() {
		this.chapters[this.currentChapter].introduceChapter();
	}

	showNextArrow() {
		this.arrow.style.display = 'block';
		this.arrow.style.opacity = 1;
		utils.animateArrow(this.arrow, s.naDuration, s.naDelay, s.bobAmount, s.bobDuration, 20, true);
	}

	//F next prompt
	nextChapter() {
		this.currentChapter++;
		if (this.currentChapter > this.chapters.length - 1) {
			this.newLoop();
		} else {
			utils.transition(
				this.transitionScreen,
				100,
				'#fff',
				() => {
					this.animations.resetAnimation(this.currentChapter);
					this.chapters[this.currentChapter - 1].closeChapter();
				},
				() => {
					this.begin();
				}
			);
		}
	}

	newLoop() {
		if (this.loopCount == 0) {
			speedUp();
		}
		utils.transition(
			this.transitionScreen,
			300,
			'#000',
			() => {
				this.animations.resetAnimation(this.currentChapter);
				this.chapters[this.currentChapter - 1].closeChapter();
				if (this.loopCount < this.maxLoops) {
					this.currentChapter = 0;
					this.loopCount++;
					this.cracks.crackItUp();
					clearInterval(this.glitch);
					this.glitchChapter();
				} else {
					this.cracks.multipleCracks(12, 100);
				}
			},
			() => {
				if (this.loopCount < this.maxLoops) {
					this.begin();
				} else {
					this.cracks.multipleCracks(12, 200);
					clearInterval(this.glitch);
				}
			}
		);
	}

	glitchChapter() {
		const currChap = this.chapters[this.currentChapter];
		clearInterval(this.glitch);

		let time = 550;
		if (this.loopCount == 2) {
			time = 125;
		} else if (this.loopCount == 3) {
			time = 30;
		}

		this.glitch = setInterval(() => {
			glitch.glitchTest(currChap, this.loopCount, this.maxLoops, this.arrow, this.cracks);
		}, time);

		glitch.randomBodyPos(Math.pow(this.loopCount, 2) * 10);
	}

	clearGlitch() {
		clearInterval(this.glitch);
		s.glitch = false;
	}
}
