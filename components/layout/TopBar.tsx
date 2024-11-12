import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { ThemedIconPressable } from '../themed/ThemedIconPressable';
import { ThemedText } from '../themed/ThemedText';
import { ThemedView } from '../themed/ThemedView';

export function TopBar() {
	return (
		<ThemedView style={styles.topBar}>
			<ThemedView style={styles.view}>
				<ThemedIconPressable
					style={{ marginLeft: 15 }}
					icon='git-pull-request-sharp'
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
	},
	text: {
		textAlignVertical: 'center',
		textAlign: 'justify',
		fontSize: 12,
		marginLeft: 15,
	},
});
