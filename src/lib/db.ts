import { getUserId } from '@lib/auth'
import { pb } from '@lib/pocketbase'
import { Board, User } from '@types'
import { ImagePickerAsset } from 'expo-image-picker'
import { decode } from 'base64-arraybuffer'

// TODO: rewrite for pocketbase
export async function getSize(id: string) {
	const res = await pb
		.collection('boards')
		.getFullList({ filter: `id=${id}` })
		.then((res) => {
			return res.length
		})

	return res
}

export async function setBingoTitle(id: string, value: string) {
	const res = await pb.collection<Board>('boards').update(id, { title: value })
}

export async function getFields(id: string) {
	const res = await pb.collection<Board>('boards').getOne(id)

	return res.fields
}

export async function getField(id: string, field: number) {
	const res = await pb
		.collection<Board>('boards')
		.getOne(id, { fields: 'fields' })

	return res.fields[field]
}

export async function setFields(id: string, fields: string[]) {
	const res = await pb
		.collection<Board>('boards')
		.update(id, { fields: fields })
}

export async function setField(id: string, field: number, value: string) {
	const fields = await getFields(id)
	const tempFields = fields.split('~')
	tempFields[field] = value

	const res = await pb
		.collection<Board>('boards')
		.update(id, { fields: tempFields.join('~') })
}

export async function getBoard(id: string) {
	const res = await pb.collection<Board>('boards').getOne(id)

	return res
}

export async function getUserBoards() {
	const id = await getUserId()

	const res = await pb
		.collection<Board>('boards')
		.getFullList({ filter: `id=${id}`, sort: 'title' })

	return res
}

export async function setFieldActive(
	id: string,
	field: number,
	value: boolean
) {
	const fields = await getFieldsActive(id)

	const tempFields = fields.split('~')
	tempFields[field] = String(value)

	const res = await pb
		.collection('boards')
		.update(id, { fields_active: tempFields.join('~') })
}

export async function getFieldActive(id: string, field: number) {
	const res = await pb
		.collection<Board>('boards')
		.getOne(id, { fields: 'fields_active' })

	return res.fields_active[field]
}

export async function getFieldsActive(id: string) {
	const res = await pb.collection<Board>('boards').getOne(id)

	return res.fields_active
}

export async function getUserData() {
	const id = await getUserId()

	const res = await pb.collection<User>('users').getOne(id)

	return res
}

export async function shuffleBoard(id: string) {
	const board = await getBoard(id)
	const fields = board.fields.split('~')
	const newFields = fields
	const fields_active = board.fields_active.split('~')
	const newFieldsActive = fields_active

	for (var i = board.fields.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[fields[i], newFields[j]] = [newFields[j], fields[i]]
		;[fields_active[i], fields_active[j]] = [
			newFieldsActive[j],
			newFieldsActive[i],
		]
	}

	board.fields = newFields.join('~')
	board.fields_active = newFieldsActive.join('~')

	await setBoard(board)
}

export async function setBoard(data: Board) {
	const res = await pb.collection('boards').update(data.id, data)
}

export async function addBoard(size: number = 3) {
	const id = await getUserId()
	const values: string[] = []

	for (var i = 0; i < size ** 2; i++) {
		values.push('')
	}

	const newBoard = await pb
		.collection<Board>('boards')
		.create({ title: 'New Board', fields: values.join('~') })

	const user = await pb.collection<User>('users').getOne(id)

	const tempBoards = user.boards.split('~')
	tempBoards.push(String(newBoard.id))
	const newBoards = tempBoards.join('~')

	await pb
		.collection<User>('users')
		.update(id, { boards: newBoards })
		.catch((error) => {
			throw error
		})
}

export async function deleteBoard(id: string) {
	const user_id = await getUserId()

	const res = await pb.collection('boards').delete(id)

	const data = await pb
		.collection<User>('users')
		.getOne(user_id, { fields: 'boards' })

	const tempData = data.boards.split('~')
	const index = tempData.indexOf(id)
	tempData.splice(index)

	const error = await pb
		.collection<User>('users')
		.update(id, { boards: tempData.join('~') })
}

// TODO: add Avatar stuff in pocketbase
//
// export async function uploadAvatar(file: ImagePickerAsset) {
// 	if (!file.mimeType || !file.base64) {
// 		throw 'not a valid file format'
// 	}
//
// 	const id = await getUserId()
// 	const fileExtension = file.mimeType.replace('image/', '.')
// 	const fileName = `${id}${fileExtension}`
//
// 	const res = await pb.files.client.Copyright
// 		.from('avatars')
// 		.exists(fileName)
//
// 	if (exists) {
// 		await supabase.storage.from('avatars').remove([fileName])
// 	}
//
// 	const { data, error } = await supabase.storage
// 		.from('avatars')
// 		.upload(fileName, decode(file.base64), { contentType: file.mimeType })
//
// 	if (error) throw error
//
// 	await supabase
// 		.from<User>('users')
// 		.update({ avatar_file: data.path })
// 		.eq('user_id', id)
// }
//
// export async function getAvatarURL(id: string) {
// 	const { data, error } = await supabase
// 		.from<User>('users')
// 		.select('avatar_file')
// 		.eq('user_id', id)
// 		.single()
//
// 	if (error) throw error
//
// 	if (!data.avatar_file) {
// 		return 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
// 	}
//
// 	const { data: urlData } = supabase.storage
// 		.from('avatars')
// 		.getPublicUrl(data.avatar_file)
//
// 	return urlData.publicUrl
// }
