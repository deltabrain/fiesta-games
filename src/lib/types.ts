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

// TODO: rewrite for pocketbase
export type Board = {
	fields: string[];
	fields_active: boolean[];
	id: string;
	size: number;
	title: string;
	user_id: string;
};
