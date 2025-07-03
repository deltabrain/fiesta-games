const arraySeparator = ' ~ '

// HACK: pocketBase does not support arrays
export function pbStringToArray(s: string) {
	return s.split(arraySeparator)
}

export function pbArrayToString(a: string[]) {
	return a.join(arraySeparator)
}
