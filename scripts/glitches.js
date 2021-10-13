import { s } from '../scripts/settings.js';

const param = {
	minProb: 0.2,
	maxProb: 0.6,
};

let defaultState = 'translate(-50%, -53%)';
let offset = 10;

export function glitchTest(chapter, currLoop, maxLoop, arrow, crackController) {
	if (s.glitch) {
		const k = currLoop / maxLoop;
		offset = k * 25 + 2;
		const prob = convertVal(currLoop, 0, maxLoop, param.minProb, param.maxProb);
		if (Math.random() < prob) {
			//sooombóoodi thouchaa ma' spagett?
			if (Math.random() < 0.5) {
				jitter(arrow);
			}
			if (Math.random() < 0.1) {
				jitter(chapter.prompt);
				blur(chapter.prompt);
			}
			if (Math.random() < 0.2) {
				jitter(chapter.options[0]);
			}
			if (Math.random() < 0.2) {
				jitter(chapter.options[1]);
			}
			if (Math.random() < 0.5) {
				jitter(chapter.answers[0]);
			}
			if (Math.random() < 0.5) {
				jitter(chapter.answers[0]);
			}
			if (Math.random() < 0.2) {
				flicker(chapter.container);
			}
			if (Math.random() < 0.2) {
				shake();
			}
			if (Math.random() < 0.2) {
				blur(document.querySelector('#godContainer'));
			}
			if (Math.random() < 0.3) {
				blur(document.querySelector('#animationsContainer'));
			}

			if (Math.random() < 0.06) {
				if (currLoop > 1) {
					crackController.multipleCracks(1, 150);
				}
			}
		}
	}
}

function jitter(element) {
	element.style.transform = `translate(${getRandomArbitrary(-50 - offset, -50 + offset)}%, ${getRandomArbitrary(-50 - offset, -50 + offset)}%)`;
	setTimeout(() => {
		element.style.transform = defaultState;
	}, 75);
}

function flicker(element) {
	element.style.opacity = 0;
	setTimeout(() => {
		element.style.opacity = 1;
	}, 75);
}
blackOut;

function blackout() {
	document.querySelector('#blackOut').style.display = 'block';
	document.querySelector('#arrowBackdrop').style.opacity = 0;
	setTimeout(() => {
		document.querySelector('#blackOut').style.display = 'none';
		document.querySelector('#arrowBackdrop').style.opacity = 1;
	}, Math.random() * 100 + 100);
}

export function randomBodyPos(str) {
	let offset = Math.random() * 2 * str - str;
	document.querySelector('#chapterContainer').style.transform = `translate(0, ${offset}px)`;
}

function shake() {
	let element = document.querySelector('#chapterContainer');
	let counter = 0;
	let time = setInterval(() => {
		if (counter >= 4) {
			element.style.transform = 'translate(0, 0)';
			clearInterval(time);
		}
		counter++;
		element.style.transform = `translate(${getRandomArbitrary(-10, 10)}px, ${getRandomArbitrary(-10, 10)}px)`;
	}, 25);
}

function blur(element) {
	element.style.filter = 'blur(' + Math.random() * 10 + 'px)';
	setTimeout(() => {
		element.style.filter = 'blur(0px)';
	}, Math.random() * 90 + 10);
}

//https://github.com/processing/p5.js/blob/1.1.9/src/math/calculation.js#L408
function convertVal(n, start1, stop1, start2, stop2) {
	return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}
