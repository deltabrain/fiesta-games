import { TopBar } from '@/components/layout/TopBar';
import { signOut } from '@/lib/auth';
import { getUsername } from '@/lib/db';
import { ThemedIconPressable } from '@/themed/ThemedIconPressable';
import { ThemedText } from '@/themed/ThemedText';
import { ThemedView } from '@/themed/ThemedView';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function Profile() {
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState('');
	useEffect(() => {
		getUsername().then((res) => {
			setName(res!);
			setLoading(false);
		});
	}, []);
	return (
		<ThemedView style={styles.default}>
			<TopBar />
			<ThemedView style={styles.default}>
				<ThemedText>{loading ? '...' : name}</ThemedText>
			</ThemedView>
			<ThemedView style={styles.bottomBar}>
				<ThemedIconPressable icon='log-out-outline' onPress={() => signOut()} />
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
	bottomBar: {
		width: '100%',
		marginBottom: '5%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
});
