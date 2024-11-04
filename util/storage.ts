import * as FileSystem from 'expo-file-system';

const rootDir = FileSystem.documentDirectory;

const dataDir = rootDir + 'data/';
const bingoFile = dataDir + 'bingo.txt';

// TODO: store data

async function ensureDirExists(dir: string) {
	const dirInfo = await FileSystem.getInfoAsync(dir);
	if (!dirInfo.exists) {
		console.log('Creating Folder…');
		await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
	}
}

export async function saveData(content: string) {
	await ensureDirExists(dataDir);

	FileSystem.writeAsStringAsync(bingoFile, content);
}
