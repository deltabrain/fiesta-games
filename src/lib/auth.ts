import { ToastAndroid } from 'react-native';
import { supabase } from './supabase';

const showToast = (msg: string) => {
	ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
};

// TODO: Error handling
export async function signIn(mail: string, pw: string) {
	if (mail === '' || null || pw === '' || null) {
		showToast('Enter email address and password!');
		return;
	}

	const { error } = await supabase.auth.signInWithPassword({
		email: mail,
		password: pw,
	});

	if (error) console.error(error);
}

// TODO: Error handling
export async function signUp(mail: string, pw: string, username: string) {
	if (mail === '' || null || pw === '' || null) {
		showToast('Enter email address and password!');
		return;
	}

	const {
		data: { session },
		error,
	} = await supabase.auth.signUp({ email: mail, password: pw });

	if (error) {
		showToast(error.message);
		return;
	}

	await supabase
		.from('users')
		.insert({ user_id: session?.user.id, email: mail, username: username });

	await supabase.from('boards').insert({ user_id: session?.user.id });
}

export async function signOut() {
	await supabase.auth.signOut();
}

export async function getUserId() {
	const { data: authData } = await supabase.auth.getSession();
	const id = authData.session!.user.id;
	return id;
}
