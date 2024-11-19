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
