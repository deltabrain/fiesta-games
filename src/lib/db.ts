import { supabase } from '@/lib/supabase';
import { getUserId } from '@/lib/auth';

export async function getFields() {
	const id = await getUserId();
	const arr: any[] = [];

	// for (var i = 0; i <= 8; i++) {
	// 	await supabase
	// 		.from('boards')
	// 		.select(`field${i}`)
	// 		.eq('user_id', id)
	// FIX: find out how to iterate through the values all fields of the object
	// 		.then((res) => (arr[i] = res.data![0][`field${i}`]));
	// 	console.log(arr);
	// }

	const { data, error } = await supabase.from('boards').select('*');
	if (error) throw error;
	console.log('data.values: ', data.values());

	// var data;
	//
	// const res = await supabase
	// 	.from('boards')
	// 	.select(
	// 		`field0, field1, field2, field3, field4, field5, field6, field7, field8`,
	// 	)
	// 	.eq('user_id', id)
	// 	.then((res) => (data = res.data![0]));
	//
	// console.log(data);

	return arr;
}

// TODO: migrate this function to supabase from ./db.old.ts
export async function setFields(fields: string[]) {
	const id = await getUserId();
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
