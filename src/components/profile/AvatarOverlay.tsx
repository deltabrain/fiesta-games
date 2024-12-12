import { IconButton } from '@components/themed/IconButton';
import { uploadAvatar } from '@lib/db';
import { ThemedView, ThemedViewProps } from '@themed/ThemedView';
import { Image } from 'expo-image';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { useEffect, useState } from 'react';
import { Modal, StyleSheet } from 'react-native';

export type AvatarOverlayProps = ThemedViewProps & {
	imageSrc: string;
	style?: any;
	shouldOpen: boolean;
};

export function AvatarOverlay({
	imageSrc,
	style,
	shouldOpen,
	...rest
}: AvatarOverlayProps) {
	const [showModal, setShowModal] = useState(false);
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
		setShowModal(shouldOpen);
	}, [shouldOpen]);

	return (
		<Modal
			visible={showModal}
			style={styles.modal}
			animationType='fade'
			statusBarTranslucent
		>
			<ThemedView style={[styles.default, style]} {...rest}>
				<ThemedView style={styles.topBar}>
					<IconButton
						onPress={pickImage}
						style={styles.button}
						icon='swap-horizontal-outline'
						type='round'
					/>
				</ThemedView>
				<ThemedView style={styles.contentContainer}>
					<Image style={styles.avatar} source={imageSrc} />
				</ThemedView>
				<ThemedView style={styles.contentContainer}>
					<IconButton
						onPress={() => setShowModal(false)}
						icon='close-outline'
					/>
				</ThemedView>
			</ThemedView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	default: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'space-between',
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
	contentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: '10%',
		marginTop: '2%',
	},
	topBar: {
		flexDirection: 'row',
		width: '80%',
		marginTop: '10%',
		marginBottom: '2%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 75,
	},
	button: {},
});
