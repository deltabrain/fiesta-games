import { getUserId } from '@lib/auth'
import { pb } from '@lib/pocketbase'
import { Board, User } from '@types'
import { pbArrayToString, pbStringToArray } from '@util/util'

export async function getSize(id: string) {
	const res = await pb
		.collection('boards')
		.getFullList({ filter: `${id}` })
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

	return pbStringToArray(res.fields)
}

export async function getField(id: string, field: number) {
	const res = await pb.collection<Board>('boards').getOne(id)

	return pbStringToArray(res.fields)[field]
}

export async function setFields(id: string, fields: string[]) {
	const board = await getBoard(id)
	board.fields = pbArrayToString(fields)
	const res = await pb
		.collection('boards')
		.update(id, board)
		.catch((error) => {
			console.error(error)
		})
}

export async function setField(id: string, field: number, value: string) {
	const fields = await getFields(id)
	const tempFields = fields
	tempFields[field] = value

	const res = await pb
		.collection<Board>('boards')
		.update(id, { fields: pbArrayToString(tempFields) })
}

export async function getBoard(id: string) {
	const res = await pb.collection<Board>('boards').getOne(id)

	return res
}

export async function getUserBoards() {
	const id = getUserId()

	const res = await pb
		.collection<Board>('boards')
		.getFullList({ filter: `owner.id='${id}'`, sort: '-updated' })

	return res
}

export async function setFieldActive(
	id: string,
	field: number,
	value: boolean
) {
	const fields = await getFieldsActive(id)

	const tempFields = pbStringToArray(fields)
	tempFields[field] = value ? '0' : '1'

	const res = await pb
		.collection('boards')
		.update(id, { fieldsActive: pbArrayToString(tempFields) })
}

export async function getFieldActive(id: string, field: number) {
	const res = await pb
		.collection<Board>('boards')
		.getOne(id, { fields: 'fieldsActive' })

	return res.fieldsActive[field]
}

export async function getFieldsActive(id: string) {
	const res = await pb.collection<Board>('boards').getOne(id)

	return res.fieldsActive
}

export async function getUserData() {
	const id = getUserId()

	const res = await pb.collection<User>('users').getOne(id)

	return res
}

export async function shuffleBoard(id: string) {
	const board = await getBoard(id)
	const fields = pbStringToArray(board.fields)
	const newFields = fields
	const fieldsActive = pbStringToArray(board.fieldsActive)
	const newFieldsActive = fieldsActive

	for (var i = board.fields.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[fields[i], newFields[j]] = [newFields[j], fields[i]]
		;[fieldsActive[i], fieldsActive[j]] = [
			newFieldsActive[j],
			newFieldsActive[i],
		]
	}

	board.fields = pbArrayToString(newFields)
	board.fieldsActive = pbArrayToString(newFieldsActive)

	await setBoard(board)
}

export async function setBoard(data: Board) {
	const res = await pb.collection('boards').update(data.id, data)
}

export async function addBoard(size: number = 3) {
	const id = getUserId()
	const fields: string[] = []
	const fieldsActive: string[] = []

	for (var i = 0; i < size ** 2; i++) {
		fields.push('')
	}

	for (var i = 0; i < size ** 2; i++) {
		fieldsActive.push('0')
	}

	const newBoard = await pb.collection<Board>('boards').create({
		title: 'New Board',
		size: size,
		fields: pbArrayToString(fields),
		fieldsActive: pbArrayToString(fieldsActive),
		owner: id,
	})
}

export async function deleteBoard(id: string) {
	await pb.collection('boards').delete(id)
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
