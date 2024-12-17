import { Avatar } from '@components/profile/Avatar';
import { signOut } from '@lib/auth';
import { getAvatarURL, getUserData, uploadAvatar } from '@lib/db';
import { IconButton } from '@themed/IconButton';
import { ThemedText } from '@themed/ThemedText';
import { ThemedView } from '@themed/ThemedView';
import { Image } from 'expo-image';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet } from 'react-native';

export default function Profile() {
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [reloadAvatar, setReloadAvatar] = useState(false);
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
			setReloadAvatar(!reloadAvatar);
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
	}, [navigation, reloadAvatar]);

	return (
		<ThemedView style={styles.default}>
			<Modal
				visible={showModal}
				style={styles.modal}
				animationType='fade'
				statusBarTranslucent
			>
				<ThemedView style={[styles.default]}>
					<ThemedView style={styles.topBar}>
						<IconButton
							onPress={pickImage}
							icon='swap-horizontal-outline'
							type='round'
						/>
					</ThemedView>
					<ThemedView style={styles.contentContainer}>
						<Image
							style={styles.avatarBig}
							source={avatar}
							cachePolicy={'none'}
						/>
					</ThemedView>
					<ThemedView style={styles.bottomBar}>
						<IconButton
							onPress={() => setShowModal(false)}
							icon='close-outline'
						/>
					</ThemedView>
				</ThemedView>
			</Modal>
			<ThemedView style={[styles.topBar, loading ? styles.hidden : {}]}>
				<ThemedText style={styles.username}>{name}</ThemedText>
				<Avatar onPress={() => setShowModal(true)} imageSrc={avatar} />
			</ThemedView>
			<ThemedView style={styles.contentContainer}>
				<FlatList
					contentContainerStyle={{ alignItems: 'center' }}
					showsVerticalScrollIndicator={false}
					style={styles.list}
					data={[0]}
					renderItem={({ item }) => <Avatar imageSrc={avatar} />}
				/>
			</ThemedView>
			<ThemedView style={styles.bottomBar}>
				<IconButton icon='log-out-outline' onPress={() => signOut()} />
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		height: '100%',
		width: '100%',
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
	avatarBig: {
		width: 150,
		height: 150,
		borderRadius: 75,
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
	list: {
		width: '60%',
	},
	contentContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	username: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlignVertical: 'center',
	},
	bottomBar: {
		width: '100%',
		height: '10%',
		marginBottom: '10%',
		marginTop: '2%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		height: '100%',
		width: '100%',
		opacity: 0.8,
	},
	overlay: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
	},
	hidden: {
		display: 'none',
	},
});
