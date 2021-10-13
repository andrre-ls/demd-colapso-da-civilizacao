//Duration — how long it take compelete animation
//Delay — time offset between paths

export const s = {
	//Next chapter Arrow
	naDuration: 200,
	naDelay: 200,
	bobDuration: 500,
	bobAmount: 20,
	nextDelay: 2500, //On long it takes for the arrow to appear after the answer being written
	//Prompt
	pDuration: 350,
	pDelay: 50,
	//Options
	oDuration: 400,
	oDelay: 50,
	//Hover (it's just a line, so no need for delay)
	hDuration: 300,
	//Answer
	aDuration: 250,
	aDelay: 20,
	//Cracks
	crackProb: 0.2,
	glitch: true,
};

export function speedUp() {
	s.nextDelay /= 2;
	s.pDuration /= 2;
	s.oDuration /= 2;
	s.aDuration /= 2;
}
