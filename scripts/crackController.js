export class CrackController {
	constructor(c) {
		this.crackScreen = document.querySelector('#crackScreenContainer');
		this.MaskContainer = document.querySelector('#crackStorage');
		this.crackNum = document.querySelectorAll('#crackStorage > defs > clipPath').length;
		this.currentCrack = 0;
		this.controllerCtx = c;
	}

	crackItUp() {
		if (this.currentCrack + 1 < this.crackNum) {
			this.currentCrack++;
			applyMask(this.crackScreen, this.currentCrack);
		} else {
			this.crackScreen.style.clipPath = 'none';
			document.querySelector('#crackScreen').style.filter = 'none';
			this.controllerCtx.clearGlitch();
		}
	}

	multipleCracks(n, delay) {
		let counter = 0;
		let timer = setInterval(() => {
			if (counter >= n) {
				clearInterval(timer);
			}
			this.crackItUp();
			counter++;
		}, delay);
	}
}

function applyMask(element, id) {
	element.style.clipPath = `url(#mask${id})`;
}
