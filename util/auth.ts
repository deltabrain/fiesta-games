import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';

const db = firestore();

const showToast = (msg: string) => {
	ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
};

export function signIn(mail: string, pw: string) {
	if (mail === '' || null || pw === '' || null) {
		showToast('Enter email address and password!');
		return;
	}

	auth()
		.signInWithEmailAndPassword(mail, pw)
		.then(() => {
			showToast('Successfully logged in!');
		})
		.catch((error) => {
			if (error.code === 'auth/invalid-email') {
				showToast('That email address is invalid!');
			}
		});
}

export function signUp(mail: string, pw: string) {
	if (mail === '' || null || pw === '' || null) {
		showToast('Enter email address and password');
		return;
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
		})
		.catch((error) => {
			if (error.code === 'auth/email-already-in-use') {
				showToast('That email address is already in use!');
			}

			if (error.code === 'auth/weak-password') {
				showToast('Weak password!');
			}

			if (error.code === 'auth/invalid-email') {
				showToast('That email address is invalid!');
			}
		});
}

export function signOut() {
	auth()
		.signOut()
		.then(() => {
			showToast('Successfully logged out!');
		})
		.catch((error) => console.error(error));
}
