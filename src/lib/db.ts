import { getUserId } from '@lib/auth'
import { supabase } from '@lib/supabase'
import { Board } from '@types'
import { ImagePickerAsset } from 'expo-image-picker'
import { decode } from 'base64-arraybuffer'

// TODO: rewrite for pocketbase
export async function getSize(id: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('size')
		.eq('id', id)

	if (error) throw error

	const res = data[0].size

	return res
}

export async function setBingoTitle(id: string, value: string) {
	const { error } = await supabase
		.from('boards')
		.update({ title: value })
		.eq('id', id)
	if (error) throw error
}

export async function getFields(id: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('id', id)
	if (error) throw error

	return data[0].fields
}

export async function getField(id: string, field: number) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('id', id)
	if (error) throw error

	return data[0].fields[field]
}

export async function setFields(id: string, fields: string[]) {
	const { error } = await supabase
		.from('boards')
		.update({ fields: fields })
		.eq('id', id)
	if (error) throw error
}

export async function setField(id: string, field: number, value: string) {
	const fields = await getFields(id)
	fields[field] = value

	const { error } = await supabase
		.from('boards')
		.update({ fields: fields })
		.eq('id', id)
	if (error) throw error
}

export async function getBoard(id: string) {
	const { data, error } = await supabase.from('boards').select('*').eq('id', id)
	if (error) throw error

	return data[0] as Board
}

export async function getUserBoards() {
	const id = await getUserId()

	const { data: res, error: err } = await supabase
		.from('boards')
		.select('*')
		.eq('user_id', id)
		.order('title')

	if (err) throw err
	return res as Board[]
}

export async function setFieldActive(
	id: string,
	field: number,
	value: boolean
) {
	const fields = await getFieldsActive(id)

	fields[field] = value

	const { error } = await supabase
		.from('boards')
		.update({ fields_active: fields })
		.eq('id', id)
	if (error) throw error
}

export async function getFieldActive(id: string, field: number) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields_active')
		.eq('id', id)
	if (error) throw error

	return data[0].fields_active[field]
}

export async function getFieldsActive(id: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields_active')
		.eq('id', id)
	if (error) throw error

	return data[0].fields_active
}

export async function getUserData() {
	const id = await getUserId()

	const { data, error } = await supabase
		.from('users')
		.select('*')
		.eq('user_id', id)

	if (error) throw error

	return data[0]
}

export async function shuffleBoard(id: string) {
	const board = await getBoard(id)
	var newBoard = board

	for (var i = board.fields.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[board.fields[i], newBoard.fields[j]] = [
			newBoard.fields[j],
			board.fields[i],
		]
		;[board.fields_active[i], newBoard.fields_active[j]] = [
			newBoard.fields_active[j],
			board.fields_active[i],
		]
	}

	await setBoard(newBoard)
}

export async function setBoard(data: Board) {
	const { error } = await supabase.from('boards').update(data).eq('id', data.id)
	if (error) throw error
}

export async function addBoard(size: number = 3) {
	const id = await getUserId()
	const values: string[] = []

	for (var i = 0; i < size ** 2; i++) {
		values.push('')
	}

	const { data, error } = await supabase
		.from('boards')
		.insert({ title: 'New Board', fields: values })
		.select()
	if (error) throw error

	const { data: boards, error: err } = await supabase
		.from('users')
		.select('boards')
		.eq('user_id', id)

	if (err) throw err

	const newBoards: string[] = boards![0].boards
	newBoards.push(data![0].id)

	const { error: e } = await supabase
		.from('users')
		.update({ boards: newBoards })
		.eq('user_id', id)
	if (e) throw e
}

export async function deleteBoard(id: string) {
	const user_id = await getUserId()

	const { error: e } = await supabase.from('boards').delete().eq('id', id)
	if (e) throw e

	const { data, error } = await supabase
		.from('users')
		.select('boards')
		.eq('user_id', user_id)
	if (error) throw error

	const index = data![0].boards.indexOf(id)
	const newData = data![0].boards
	newData.splice(index, 1)

	const { error: err } = await supabase
		.from('users')
		.update({ boards: newData })
		.eq('user_id', user_id)
	if (err) throw err
}

export async function uploadAvatar(file: ImagePickerAsset) {
	if (!file.mimeType || !file.base64) {
		throw 'not a valid file format'
	}

	const id = await getUserId()
	const fileExtension = file.mimeType.replace('image/', '.')
	const fileName = `${id}${fileExtension}`

	const { data: exists } = await supabase.storage
		.from('avatars')
		.exists(fileName)

	if (exists) {
		await supabase.storage.from('avatars').remove([fileName])
	}

	const { data, error } = await supabase.storage
		.from('avatars')
		.upload(fileName, decode(file.base64), { contentType: file.mimeType })

	if (error) throw error

	await supabase
		.from('users')
		.update({ avatar_file: data.path })
		.eq('user_id', id)
}

export async function getAvatarURL(id: string) {
	const { data, error } = await supabase
		.from('users')
		.select('avatar_file')
		.eq('user_id', id)
		.single()

	if (error) throw error

	if (!data.avatar_file) {
		return 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
	}

	const { data: urlData } = supabase.storage
		.from('avatars')
		.getPublicUrl(data.avatar_file)

	return urlData.publicUrl
}
