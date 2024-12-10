import { launchImageLibraryAsync } from 'expo-image-picker';
import { signOut } from '@lib/auth';
import { getAvatar, getUserData, uploadAvatar } from '@lib/db';
import { IconButton } from '@themed/IconButton';
import { ThemedText } from '@themed/ThemedText';
import { ThemedView } from '@themed/ThemedView';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export default function Profile() {
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState('');

	const navigation = useNavigation();
	const pickImage = async () => {
		const result = await launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			quality: 1,
		});

		if (result.assets) {
			uploadAvatar(result.assets[0]);
		}
	};

	useEffect(() => {
		navigation.addListener('focus', () => {
			getUserData().then((res) => {
				setName(res.username);
				getAvatar(res.user_id).then((data) => {
					setAvatar(data);
				});
				setLoading(false);
			});
		});
	}, [navigation]);

	return (
		<ThemedView style={styles.default}>
			<ThemedView style={styles.topBar}>
				<ThemedText style={styles.username}>
					{loading ? '...' : name}
				</ThemedText>
				<Image source={avatar} />
			</ThemedView>
			<ThemedView style={styles.contentContainer}>
				<IconButton type='round' icon='add-outline' onPress={pickImage} />
			</ThemedView>
			<ThemedView style={styles.bottomBar}>
				<IconButton icon='log-out-outline' onPress={() => signOut()} />
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	topBar: {
		flexDirection: 'row',
		width: '80%',
		marginTop: '10%',
		marginBottom: '2%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	contentContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	username: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlignVertical: 'center',
	},
	bottomBar: {
		width: '100%',
		marginBottom: '5%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
});
