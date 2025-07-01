import { RecordModel } from 'pocketbase'

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
	fields_active: string
	id: string
	size: number
	title: string
	user_id: string
}

export type User = RecordModel & {
	boards: string
}
