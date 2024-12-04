import { StyleSheet } from 'react-native';
import { ThemedText } from './themed/ThemedText';
import { ThemedView } from './themed/ThemedView';

export function Loading() {
	return (
		<ThemedView style={styles.default}>
			<ThemedText>Loading</ThemedText>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignContent: 'center',
	},
});
