import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
	return (
		<ThemedView style={styles.default}>
			<Ionicons name="heart" size={24} color="red" />
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
