import anime from '../frameworks/anime.es.js';

export class BackgroundAnimationController {
	constructor(index) {
		this.container = document.querySelector('#animationsContainer');
		this.videos = [];

		for (let i = 1; i <= 5; i++) {
			for (let ii = 1; ii <= 2; ii++) {
				if (document.querySelector(`#c${i}p${ii}_1`) != null) {
					this.videos[`c${i}_p${ii}`] = [document.querySelector(`#c${i}p${ii}_1`), document.querySelector(`#c${i}p${ii}_2`)];
				} else {
					this.videos[`c${i}_p${ii}`] = document.querySelector(`#c${i}p${ii}`);
				}
			}
		}
	}

	displayAnimation(chapter, prompt) {
		if (chapter > 0 && chapter <= 5 && (prompt == 1 || prompt == 2)) {
			let vid = this.videos[`c${chapter}_p${prompt}`];
			if (Array.isArray(vid)) {
				vid[0].currentTime = 0;
				vid[1].currentTime = 0;
				vid[0].parentElement.style.display = 'block';
				setTimeout(() => {
					vid[0].parentElement.style.opacity = 1;
					vid[0].play();
					$(vid[0]).bind('ended', function () {
						vid[1].parentElement.style.display = 'block';
						vid[1].parentElement.style.opacity = 1;
						vid[1].play();
					});
				}, 200);
			} else {
				vid.currentTime = 0;
				vid.parentElement.style.display = 'block';
				setTimeout(() => {
					vid.parentElement.style.opacity = 1;
					vid.play();
				}, 200);
			}
		} else {
			console.warn('OUT OF BOUNDS!');
		}
	}

	resetAnimation(chapter) {
		if (chapter > 0 && chapter <= 5) {
			for (let i = 1; i <= 2; i++) {
				let vid = this.videos[`c${chapter}_p${i}`];
				if (Array.isArray(vid)) {
					vid[0].parentElement.style.display = 'none';
					vid[1].parentElement.style.display = 'none';
					vid[0].pause();
					vid[1].pause();
					vid[0].currentTime = 0;
					vid[1].currentTime = 0;
				} else {
					vid.parentElement.style.display = 'none';
					vid.pause();
					vid.currentTime = 0;
				}
			}
		} else {
			console.warn('OUT OF BOUNDS!');
		}
	}
}
