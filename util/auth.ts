import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { SigninResult, SignupResult } from './types';

const db = firestore();

export function signIn(mail: string, pw: string): SigninResult {
	if (mail === '' || null || pw === '' || null) {
		console.log('mail or password empty');
		return SigninResult.InputMissing;
	}

	auth()
		.signInWithEmailAndPassword(mail, pw)
		.then(() => {
			console.log('signed in');
		})
		.catch((error) => {
			if (error.code === 'auth/invalid-email') {
				console.log('That email address is invalid!');
				return SigninResult.InvalidEmail;
			}

			console.error(error);
			return SigninResult.Error;
		});

	return SigninResult.Success;
}

export function signUp(mail: string, pw: string): SignupResult {
	if (mail === '' || null || pw === '' || null) {
		console.log('mail or password empty');
		return SignupResult.InputMissing;
	}
	auth()
		.createUserWithEmailAndPassword(mail, pw)
		.then((cred) => {
			db.collection('users').doc(cred.user.uid).set({
				email: mail,
				// store additional user data here
			});
			db.collection('UserBoards').doc(cred.user.uid).set({
				0: '',
				1: '',
				2: '',
				3: '',
				4: '',
				5: '',
				6: '',
				7: '',
				8: '',
			});
			return SignupResult.Success;
		})
		.catch((error) => {
			if (error.code === 'auth/email-already-in-use') {
				console.log('That email address is already in use!');
				return SignupResult.UserExists;
			}

			if (error.code === 'auth/invalid-email') {
				console.log('That email address is invalid!');
				return SignupResult.BadEmail;
			}

			if (error.code === 'auth/weak-password') {
				console.log('Weak password!');
				return SignupResult.WeakPassword;
			}
			console.error(error);
		});
	return SignupResult.Error;
}

export function signOut() {
	auth()
		.signOut()
		.then(() => console.log('Signed out'))
		.catch((error) => console.error(error));
}
