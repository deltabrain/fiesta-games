import { getUserId } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Board } from './types';

// TODO: Error handling

export async function getSize(id: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('size')
		.eq('id', id);

	if (error) throw error;

	const res = data[0].size;

	return res;
}

export async function getBingoTitle(id: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('title')
		.eq('id', id);

	if (error) throw error;

	return data[0].title;
}

export async function getFields(id: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('id', id);
	if (error) throw error;

	return data[0].fields;
}

export async function getField(id: string, fieldNumber: number) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('id', id);
	if (error) throw error;

	return data[0].fields[fieldNumber];
}

export async function setFields(id: string, fields: string[]) {
	await supabase.from('boards').update({ fields: fields }).eq('id', id);
}

export async function setField(id: string, fieldNumber: number, value: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('id', id);
	if (error) throw error;
	var fields = data[0].fields!;

	fields[fieldNumber] = value;

	await supabase.from('boards').update({ fields: fields }).eq('id', id);
}

export async function getBoard(id: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('*')
		.eq('id', id);
	if (error) throw error;

	return data[0] as Board;
}

export async function getBoards() {
	const id = await getUserId();

	const { data: res, error: err } = await supabase
		.from('boards')
		.select('*')
		.eq('user_id', id)
		.order('title');

	if (err) throw err;
	return res as Board[];
}

export async function toggleActive(id: string, fieldNumber: number) {
	console.log(id, fieldNumber);

	const { data, error } = await supabase
		.from('boards')
		.select('fields_active')
		.eq('id', id);
	if (error) throw error;

	console.log(data[0].fields_active);

	var fieldsActive = data[0].fields_active;
	fieldsActive[fieldNumber] = !fieldsActive[fieldNumber];

	console.log(fieldsActive);

	await supabase
		.from('boards')
		.update({ fields_active: fieldsActive })
		.eq('id', id);
}

export async function getFieldActive(id: string, fieldNumber: number) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields_active')
		.eq('id', id);
	if (error) throw error;

	return data[0].fields_active[fieldNumber];
}

export async function getFieldsActive(id: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields_active')
		.eq('id', id);
	if (error) throw error;

	return data[0].fields_active;
}

export async function getUsername() {
	const id = await getUserId();

	const { data, error } = await supabase
		.from('users')
		.select('username')
		.eq('user_id', id);

	if (error) throw error;

	if (data) {
		return data[0].username;
	}
	return 'No user';
}

export async function shuffleBoard(id: string) {
	const board = await getBoard(id);
	var newBoard = board;

	for (var i = board.fields.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[board.fields[i], newBoard.fields[j]] = [
			newBoard.fields[j],
			board.fields[i],
		];
		[board.fields_active[i], newBoard.fields_active[j]] = [
			newBoard.fields_active[j],
			board.fields_active[i],
		];
	}

	await setBoard(newBoard);
}

export async function setBoard(data: Board) {
	await supabase.from('boards').update(data).eq('id', data.id);
}

export async function addBoard(size: number = 3) {
	const id = await getUserId();
	const values: string[] = [];

	for (var i = 0; i < size ** 2; i++) {
		values.push('');
	}

	const { data, error } = await supabase
		.from('boards')
		.insert({ title: 'New Board', fields: values })
		.select();
	if (error) throw error;

	const { data: boards, error: err } = await supabase
		.from('users')
		.select('boards')
		.eq('user_id', id);

	if (err) throw err;

	const newBoards: string[] = boards![0].boards;
	newBoards.push(data![0].id);

	await supabase.from('users').update({ boards: newBoards }).eq('user_id', id);
}

export async function deleteBoard(id: string) {
	const user_id = await getUserId();

	await supabase.from('boards').delete().eq('id', id);

	const { data, error } = await supabase
		.from('users')
		.select('boards')
		.eq('user_id', user_id);
	if (error) throw error;

	const index = data![0].boards.indexOf(id);
	const newData = data![0].boards;
	newData.splice(index, 1);

	const { error: err } = await supabase
		.from('users')
		.update({ boards: newData })
		.eq('user_id', user_id);
	if (err) throw err;
}
