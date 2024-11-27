import { supabase } from '@/lib/supabase';
import { getUserId } from '@/lib/auth';

export async function getFields() {
	const id = await getUserId();
	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('user_id', id);
	if (error) throw error;

	const res = data[0].fields;

	return res;
}

export async function getField(fieldNumber: number) {
	const id = await getUserId();

	console.log('getField called');

	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('user_id', id);
	if (error) throw error;

	const res = data[0].fields![fieldNumber];

	return res;
}

export async function setFields(fields: string[]) {
	const id = await getUserId();
	console.log('setFields called');

	await supabase.from('boards').update({ fields: fields }).eq('user_id', id);
}

export async function setField(fieldNumber: number, value: string) {
	const id = await getUserId();
	console.log('setField called');

	const { data, error } = await supabase
		.from('boards')
		.select('fields')
		.eq('user_id', id);
	if (error) throw error;
	var fields = data[0].fields!;

	fields[fieldNumber] = value;

	await supabase.from('boards').update({ fields: fields }).eq('user_id', id);
}

export async function toggleActive(
	fieldNumber: number,
	value: boolean | undefined,
) {
	if (!value) {
		value = false;
	}
	const id = await getUserId();
	const { data, error } = await supabase
		.from('boards')
		.select('fields_active')
		.eq('user_id', id);
	if (error) throw error;

	var fieldsActive = data[0].fields_active;
	fieldsActive[fieldNumber] = value;
	console.log(fieldsActive);

	await supabase
		.from('boards')
		.update({ fields_active: fieldsActive })
		.eq('user_id', id);
}

export async function getFieldActive(fieldNumber: number) {
	const id = await getUserId();
	const { data, error } = await supabase
		.from('boards')
		.select('fields_active')
		.eq('user_id', id);
	if (error) throw error;

	const fieldActive = data[0].fields_active[fieldNumber];

	return fieldActive;
}

export async function getFieldsActive() {
	const id = await getUserId();
	const { data, error } = await supabase
		.from('boards')
		.select('fields_active')
		.eq('user_id', id);
	if (error) throw error;

	const fieldsActive = data[0].fields_active;

	return fieldsActive;
}

export async function getUsername() {
	const id = await getUserId();

	const { data, error } = await supabase
		.from('users')
		.select('username')
		.eq('user_id', id!);

	if (error) console.error(error);

	if (data) {
		return data[0].username;
	}
	return 'No user';
}
