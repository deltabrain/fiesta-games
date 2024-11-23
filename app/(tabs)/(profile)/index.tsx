import { TopBar } from '@/components/layout/TopBar';
import { ThemedIconPressable } from '@/components/themed/ThemedIconPressable';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/src/components/themed/ThemedText';
import { signOut } from '@/src/lib/auth';
import { getUsername } from '@/src/lib/db';
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
