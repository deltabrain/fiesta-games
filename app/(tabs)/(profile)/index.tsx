import { Avatar } from '@components/Avatar';
import { Loading } from '@components/Loading';
import { signOut } from '@lib/auth';
import { getAvatarURL, getUserData, uploadAvatar } from '@lib/db';
import { IconButton } from '@themed/IconButton';
import { ThemedText } from '@themed/ThemedText';
import { ThemedView } from '@themed/ThemedView';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function Profile() {
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState(
		'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
	);

	const navigation = useNavigation();
	const pickImage = async () => {
		const result = await launchImageLibraryAsync({
			allowsEditing: true,
			allowsMultipleSelection: false,
			base64: true,
			mediaTypes: ['images'],
			quality: 1,
		});

		if (result.assets) {
			uploadAvatar(result.assets[0]);
		}
	};

	useEffect(() => {
		navigation.addListener('focus', () => {
			setLoading(true);
			getUserData().then((res) => {
				setName(res.username);
				getAvatarURL(res.user_id).then((data) => {
					setAvatar(data);
				});
				setLoading(false);
			});
		});
	}, [navigation]);

	return (
		<ThemedView style={styles.default}>
			<ThemedView style={[styles.topBar, loading ? styles.hidden : {}]}>
				<ThemedText style={styles.username}>{name}</ThemedText>
				<Avatar imageSrc={avatar} onPress={pickImage} />
			</ThemedView>
			<ThemedView style={styles.contentContainer}>
				{/* TODO: profile page content, friend list as flat list  */}
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
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	topBar: {
		flexDirection: 'row',
		width: '80%',
		height: '10%',
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
	hidden: {
		display: 'none',
	},
});
