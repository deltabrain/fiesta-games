import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, Image } from 'react-native';

export default function Teufeln() {
	return (
		<ThemedView style={styles.default}>
			<Image source={require('@/assets/images/card_png')} />;
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
