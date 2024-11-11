import TopBar from '@/components/layout/TopBar';
import { ThemedPressable } from '@/components/themed/ThemedPressable';
import { ThemedView } from '@/components/themed/ThemedView';
import { signOut } from '@/util/auth';
import { StyleSheet } from 'react-native';

export default function Home() {
	return (
		<ThemedView style={styles.default}>
			<TopBar />
			<ThemedView style={styles.bottomBar}>
				<ThemedPressable
					contentType='icon'
					content={'log-out-outline'}
					onPress={() => signOut()}
				/>
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
