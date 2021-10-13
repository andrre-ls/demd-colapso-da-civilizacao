import anime from '../frameworks/anime.es.js';

//Utilities
export function animateElement(element, duration, delay, callback = null, loop = false) {
	element.style.opacity = 1;
	return anime({
		targets: retrivePaths(element),
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: duration,
		delay: function (el, i) {
			return i * delay;
		},
		direction: 'normal',
		loop: loop,
	}).finished.then(callback);
}

//Green hover line
export function anmiteHover(option, duration, delay, action = 'show') {
	if (action.toLowerCase() === 'show') {
		option.style.opacity = 1;
		return anime({
			targets: option,
			strokeDashoffset: [anime.setDashoffset, 0],
			easing: 'easeInOutSine',
			duration: duration,
			delay: function (el, i) {
				return i * delay;
			},
			direction: 'alternate',
			loop: false,
		});
	} else if (action.toLowerCase() === 'hide') {
		return anime({
			targets: option,
			strokeDashoffset: [0, anime.setDashoffset],
			easing: 'easeInOutSine',
			duration: duration,
			delay: function (el, i) {
				return i * delay;
			},
			direction: 'alternate',
			loop: false,
		}).finished.then(() => {
			option.style.opacity = 0;
		});
	}
}

function retrivePaths(element) {
	let output = [];
	element.childNodes.forEach((item, i) => {
		if (['path', 'rect'].includes(item.nodeName) && !item.classList.contains('op_hover') && !item.classList.contains('svgContainer')) {
			output.push(item);
		}
	});
	return output;
}

export function animateArrow(element, duration, delay, bobA, bobsYourUncle, nLoops, move) {
	return anime({
		targets: retrivePaths(element),
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: duration,
		delay: function (el, i) {
			return i * delay;
		},
		direction: 'normal',
		loop: false,
	}).finished.then(() => {
		if (move) {
			return anime({
				targets: retrivePaths(element),
				keyframes: [
					{
						translateX: bobA + 'px',
					},
					{
						translateX: '0px',
					},
				],
				easing: 'easeInOutSine',
				duration: bobsYourUncle,
				direction: 'normal',
				loop: nLoops,
			});
		}
	});
}

export function getCSS_delay(cssVar) {
	let transitionDelay = getComputedStyle(document.documentElement).getPropertyValue('--' + cssVar);
	return parseFloat(transitionDelay.substring(0, transitionDelay.length - 1)) * 1000;
}

export function crackWipe(element, duration) {
	const freq = 10;
	let stepSize = 100 / (duration / freq);
	let counter = 0;

	let interval = setInterval(() => {
		counter += stepSize;
		element.style.clipPath = `polygon(0% 100%, 0% ${100 - counter}%, 100% ${100 - counter}%, 100% 100%)`;
		element.style.opacity = 1;
	}, freq);

	setTimeout(() => {
		clearTimeout(interval);
		element.style.clipPath = `polygon(0% 100%, 0% 0%, 100% 0%, 100% 100%)`;
	}, duration);
}

export function transition(element, pause, color, middle, callback) {
	element.style.backgroundColor = color;
	element.style.pointerEvents = 'all';
	element.style.opacity = 1;
	setTimeout(() => {
		middle();
		element.style.pointerEvents = 'none';
		element.style.opacity = 0;
	}, pause + getCSS_delay('transitionScreenDuration'));

	setTimeout(() => {
		callback();
	}, pause + getCSS_delay('transitionScreenDuration') * 2);
}
