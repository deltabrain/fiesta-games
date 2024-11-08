import TopBar from '@/components/layout/TopBar';
import { ThemedView } from '@/components/themed/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

export default function Home() {
	return (
		<ThemedView style={styles.default}>
			<TopBar />
			<Ionicons name='flame' size={24} color='red' />
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
