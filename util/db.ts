import firestore from '@react-native-firebase/firestore';

const db = firestore();
const boardsCollection = db.collection('UserBoards');

export async function getFields(id: string | undefined) {
	if (!id) {
		console.error('id missing');
		return;
	}

	const fields = await boardsCollection
		.doc(id)
		.get()
		.then((res) => res.data());

	// for (let i = 0; i < 9; i++) {
	// 	board.push(fields.data()!['0']);
	// }

	return fields;
}

export async function setFields(
	id: string | undefined,
	board: (string | undefined)[],
) {
	if (!id) {
		console.error('id missing');
		return;
	}

	for (let i = 0; i < 0; i++) {
		await boardsCollection.doc(id).update({ i: board[i] });
	}
}
