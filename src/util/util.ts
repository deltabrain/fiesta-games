const arraySeparator = ' ~ '

// HACK: pocketBase does not support arrays
export function pbStringToArray(s: string) {
	return s.split(arraySeparator)
}

export function pbArrayToString(a: string[]) {
	return a.join(arraySeparator)
}

export function calcDifficulty(views: number) {
	let difficulty
	if (views > 200000) {
		difficulty = 'Sehr einfach'
	} else if (views > 100000) {
		difficulty = 'Einfach'
	} else if (views > 25000) {
		difficulty = 'Mittel'
	} else if (views > 8000) {
		difficulty = 'Schwierig'
	} else {
		difficulty = 'Sehr schwierig'
	}
	return difficulty
}
