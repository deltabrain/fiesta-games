import auth from '@react-native-firebase/auth';

export function signIn(mail: string, pw: string): boolean {
	var success = false;

	if (mail === '' || null || pw === '' || null) {
		console.log('mail or password empty');
		return success;
	}

	auth()
		.signInWithEmailAndPassword(mail, pw)
		.then(() => {
			console.log('signed in');
			success = true;
		})
		.catch((error) => {
			if (error.code === 'auth/invalid-email') {
				console.log('That email address is invalid!');
			}

			console.error(error);
		});
	return success;
}

export function signUp(mail: string, pw: string) {
	auth()
		.createUserWithEmailAndPassword(mail, pw)
		.then(() => console.log('User created'))
		.catch((error) => {
			if (error.code === 'auth/email-already-in-use') {
				console.log('That email address is already in use!');
			}

			if (error.code === 'auth/invalid-email') {
				console.log('That email address is invalid!');
			}

			console.error(error);
		});
}
