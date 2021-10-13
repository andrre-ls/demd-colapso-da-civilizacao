import { Controller } from '../scripts/controller.js';
import * as utils from '../scripts/utilities.js';

const hal = new Controller(5);
$(document).ready(() => {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('safari') != -1) {
		if (ua.indexOf('chrome') > -1) {
			proceed();
		} else {
			notSupported();
		}
	}
});

function proceed() {
	document.querySelector('#godContainer').style.display = 'block';
	homelessListernes();
	hal.loadChapters(() => {
		document.querySelector('#loading').style.opacity = 0;
		setTimeout(() => {
			document.querySelector('#loading').style.display = 'none';
			hal.begin();
		}, 1000); //an extra to avoid lags and stutters in the first frames of animation
	});
}

function notSupported() {
	document.querySelector('#error').style.display = 'block';
}

function homelessListernes() {
	const button = document.querySelector('#about');
	const element = document.querySelector('#aboutScreen');

	button.addEventListener('mouseover', () => {
		element.style.opacity = 1;
	});
	button.addEventListener('mouseout', () => {
		element.style.opacity = 0;
	});
}
