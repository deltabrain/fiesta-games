import { supabase } from '@lib/supabase';
import { ToastAndroid } from 'react-native';

const showToast = (msg: string) => {
	ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
};

export async function signIn(mail: string, pw: string) {
	if (mail === '' || null || pw === '' || null) {
		showToast('Enter email address and password!');
		return;
	}

	const { error } = await supabase.auth.signInWithPassword({
		email: mail,
		password: pw,
	});

	if (error) {
		showToast(error.message);
		throw error;
	}
}

export async function signUp(mail: string, pw: string, username: string) {
	if (mail === '' || null || pw === '' || null || username === '' || null) {
		showToast('Fill out all required fields!');
		return;
	}

	const {
		data: { session },
		error,
	} = await supabase.auth.signUp({ email: mail, password: pw });

	if (error) {
		showToast(error.message);
		throw error;
	}

	if (!session) {
		showToast('Something went wrong.');
		return;
	}

	await supabase.from('users').insert({
		user_id: session.user.id,
		email: mail,
		username: username,
		boards: [],
	});
}

export async function signOut() {
	await supabase.auth.signOut();
}

export async function getUserId() {
	const { data: authData } = await supabase.auth.getSession();

	if (authData.session == null) {
		return 'no user';
	}

	const id = authData.session.user.id;
	return id;
}
