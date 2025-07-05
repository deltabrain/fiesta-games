export enum SignupResult {
	Success,
	WeakPassword,
	BadEmail,
	UserExists,
	InputMissing,
	Error,
}

export enum SigninResult {
	Success,
	InvalidEmail,
	InputMissing,
	Error,
}

export enum Corner {
	TopLeft,
	TopRight,
	BottomLeft,
	BottomRight,
}

export type Board = {
	fields: string
	fieldsActive: string
	id: string
	owner: string
	size: number
	title: string
}
