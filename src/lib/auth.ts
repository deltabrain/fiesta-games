import { supabase } from '@lib/supabase';
import { ToastAndroid } from 'react-native';

const showToast = (msg: string) => {
	ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
};

// TODO: rewrite for pocketbase
export async function signIn(email: string, password: string) {
	if (email === '' || null || password === '' || null) {
		showToast('Enter email address and password!');
		return;
	}

	const { error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) {
		showToast(error.message);
		throw error;
	}
}

export async function signUp(
	email: string,
	password: string,
	username: string,
) {
	if (
		email === '' ||
		null ||
		password === '' ||
		null ||
		username === '' ||
		null
	) {
		showToast('Fill out all required fields!');
		return;
	}

	const {
		data: { user },
		error,
	} = await supabase.auth.signUp({ email: email, password: password });

	if (error) {
		showToast(error.message);
		throw error;
	}

	if (!user) {
		showToast('Something went wrong.');
		return;
	}

	await supabase.from('users').insert({
		user_id: user.id,
		email: email,
		username: username,
		boards: [],
	});
}

export async function signOut() {
	await supabase.auth.signOut();
}

export async function resetPassword(email: string) {
	const { error } = await supabase.auth.resetPasswordForEmail(email);

	if (error) {
		showToast(error.message);
		throw error;
	}
}

export async function getUserId() {
	const { data: authData } = await supabase.auth.getSession();

	if (authData.session == null) {
		throw 'no user';
	}

	const id = authData.session.user.id;
	return id;
}
