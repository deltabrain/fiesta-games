import { pb } from '@lib/pocketbase'
import { ToastAndroid } from 'react-native'
import { ClientResponseError } from 'pocketbase'

const showToast = (msg: string) => {
	ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM)
}

export async function signIn(email: string, password: string) {
	if (email === '' || null || password === '' || null) {
		showToast('Enter email address and password!')
		return
	}

	const res = await pb
		.collection('users')
		.authWithPassword(email, password)
		.then((res) => {
			console.log(res)
		})
		.catch((error) => {
			showToast(error.message)
			throw error
		})
}

export async function signUp(
	email: string,
	password: string,
	username: string
) {
	if (
		email === '' ||
		null ||
		password === '' ||
		null ||
		username === '' ||
		null
	) {
		showToast('Fill out all required fields!')
		return
	}

	const user = pb
		.collection('users')
		.create({
			email: email,
			name: username,
			password: password,
			passwordConfirm: password,
		})
		.then(() => {
			return pb
				.collection('users')
				.authWithPassword(email, password)
				.then(() => {
					return true
				})
				.catch(() => {
					return false
				})
		})

	if (!user) {
		showToast('Something went wrong.')
		console.error('no user')
		return
	}
}

export async function signOut() {
	pb.authStore.clear()
	await pb.collection('users').authRefresh()
}

export async function resetPassword(email: string) {
	const res = await pb
		.collection('users')
		.requestPasswordReset(email)
		.catch((error: ClientResponseError) => {
			showToast(error.message)
			throw error
		})
}

export function getUserId() {
	const res = pb.authStore.record

	if (res == null || res.id == undefined) {
		return 'none'
	}

	return res.id
}
