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
		difficulty = 0
	} else if (views > 100000) {
		difficulty = 1
	} else if (views > 25000) {
		difficulty = 2
	} else if (views > 8000) {
		difficulty = 3
	} else {
		difficulty = 4
	}
	return difficulty
}

// TODO: This is a dummy function, actually calc this later
export function calcEloChange(userElo: number, songDifficulty: number, win: boolean) {
	if (win) {
		return userElo + songDifficulty
	} else {
		return userElo - songDifficulty
	}
}
