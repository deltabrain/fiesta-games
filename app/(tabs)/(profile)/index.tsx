import TopBar from '@/components/layout/TopBar';
import { ThemedIconPressable } from '@/components/themed/ThemedIconPressable';
import { ThemedView } from '@/components/themed/ThemedView';
import { signOut } from '@/util/auth';
import { StyleSheet } from 'react-native';

export default function Home() {
	return (
		<ThemedView style={styles.default}>
			<TopBar />
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
