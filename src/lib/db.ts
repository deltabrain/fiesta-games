import { getUserId } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { boardIdentification } from './types';

// TODO: Error handling

export async function getFields(id: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('id', id);
	if (error) throw error;

	const res = data[0].fields;

	return res;
}

export async function getField(id: string, fieldNumber: number) {
	console.log('getField called');

	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('id', id);
	if (error) throw error;

	const res = data[0].fields![fieldNumber];

	return res;
}

export async function setFields(id: string, fields: string[]) {
	console.log('setFields called');

	await supabase.from('boards').update({ fields: fields }).eq('id', id);
}

export async function setField(id: string, fieldNumber: number, value: string) {
	console.log('setField called');

	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('id', id);
	if (error) throw error;
	var fields = data[0].fields!;

	fields[fieldNumber] = value;

	await supabase.from('boards').update({ fields: fields }).eq('id', id);
}

export async function getBoards() {
	const id = await getUserId();

	const { data: res, error: err } = await supabase
		.from('users')
		.select('boards')
		.eq('user_id', id);

	if (err) console.error(err);
	var boardIds: string[] = [];
	if (res) {
		try {
			boardIds = res[0].boards;
		} catch {
			console.error('an error occured');
		}
	}

	const boards: boardIdentification[] = [];

	for (var i = 0; i < boardIds.length; i++) {
		const { data, error } = await supabase
			.from('boards')
			.select('id, title')
			.eq('id', boardIds[i]);
		boards.push({ id: data![0].id, title: data![0].title });

		if (error) console.error(error);
	}

	return boards;
}

export async function toggleActive(
	id: string,
	fieldNumber: number,
	value: boolean | undefined,
) {
	if (!value) {
		value = false;
	}
	const { data, error } = await supabase
		.from('boards')
		.select('fields_active')
		.eq('id', id);
	if (error) throw error;

	var fieldsActive = data[0].fields_active;
	fieldsActive[fieldNumber] = value;
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

	const fieldActive = data[0].fields_active[fieldNumber];

	return fieldActive;
}

export async function getFieldsActive(id: string) {
	const { data, error } = await supabase
		.from('boards')
		.select('fields_active')
		.eq('id', id);
	if (error) throw error;

	const fieldsActive = data[0].fields_active;

	return fieldsActive;
}

export async function getUsername() {
	const id = await getUserId();

	const { data, error } = await supabase
		.from('users')
		.select('username')
		.eq('user_id', id);

	if (error) console.error(error);

	if (data) {
		return data[0].username;
	}
	return 'No user';
}

export async function addBoard() {
	const id = await getUserId();

	const { data, error } = await supabase
		.from('boards')
		.insert({ title: 'New Board' })
		.select();
	if (error) console.error(error);

	const { data: boards, error: err } = await supabase
		.from('users')
		.select('boards')
		.eq('user_id', id);

	if (err) console.error(err);

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
	if (error) console.error(error);

	const index = data![0].boards.indexOf(id);
	const newData = data![0].boards;
	newData.splice(index, 1);

	const { error: err } = await supabase
		.from('users')
		.update({ boards: newData })
		.eq('user_id', user_id);
	if (err) console.error(err);
}
