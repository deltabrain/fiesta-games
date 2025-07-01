import { pb } from '@lib/pocketbase'
import { ToastAndroid } from 'react-native'
import { User } from './types'
import { ClientResponseError } from 'pocketbase'

const showToast = (msg: string) => {
	ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM)
}

// TODO: rewrite for pocketbase
export async function signIn(email: string, password: string) {
	if (email === '' || null || password === '' || null) {
		showToast('Enter email address and password!')
		return
	}

	const res = await pb
		.collection('users')
		.authWithPassword(email, password)
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

	const user = await pb
		.collection<User>('users')
		.create({ email: email, password: password })
		.catch((error: ClientResponseError) => {
			throw error
		})

	if (!user) {
		showToast('Something went wrong.')
		return
	}

	await pb.collection<User>('users').create({
		user_id: user.id,
		email: email,
		username: username,
		boards: [''],
	})
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

export async function getUserId() {
	const res = pb.authStore.record

	if (res?.id == undefined) {
		throw 'no user'
	}

	const id = res.id
	return id
}
