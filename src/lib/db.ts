import { supabase } from '@/lib/supabase';
import { getUserId } from '@/lib/auth';

export async function getFields() {
	const id = await getUserId();

	console.log('getFields called');

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
// TODO: migrate this function to supabase from ./db.old.ts
export async function setFields(fields: string[]) {
	const id = await getUserId();
	console.log('setFields called');

	await supabase.from('boards').update({ fields: fields }).eq('user_id', id);
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
