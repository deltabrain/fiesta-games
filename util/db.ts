import firestore from '@react-native-firebase/firestore';

const db = firestore();
const userCollection = db.collection('Users');
const boardsCollection = db.collection('Boards');

export function getFields(id: string | undefined) {
	if (!id) {
		return;
	}
	const board: any[] = [];
	for (var i = 0; i < 9; i++) {
		boardsCollection
			.doc(id)
			.collection('Fields')
			.doc(i.toString())
			.get()
			.then((f) => (board[i] = f.data()))
			.catch((err) => console.error(err));
		// TODO: read and write data to firestore
	}
	return board;
}
