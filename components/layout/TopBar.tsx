import { Linking, StyleSheet } from 'react-native';
import { ThemedPressable } from '../themed/ThemedPressable';
import { ThemedText } from '../themed/ThemedText';
import { ThemedView } from '../themed/ThemedView';

export default function TopBar() {
	return (
		<ThemedView style={styles.topBar}>
			<ThemedView style={styles.view}>
				<ThemedPressable
					style={{ marginLeft: 15 }}
					contentType='icon'
					content='git-pull-request-sharp'
					type='round'
					onPress={() =>
						Linking.openURL('https://github.com/Deltabrain/fiesta-games/issues')
					}
				/>
				<ThemedText style={styles.text}>Submit issue</ThemedText>
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	topBar: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: '12%',
	},
	view: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	text: {
		textAlignVertical: 'center',
		textAlign: 'justify',
		fontSize: 12,
		marginLeft: 15,
	},
});
