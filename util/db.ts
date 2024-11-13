import firestore from '@react-native-firebase/firestore';

const db = firestore();
const boardsCollection = db.collection('Boards');

export async function getFields(id: string | undefined) {
	if (!id) {
		return;
	}
	const board: any[] = [];
	await boardsCollection.doc(id).collection('Fields').doc('0').get();
	// TODO: read and write data to firestore
	return board;
}
