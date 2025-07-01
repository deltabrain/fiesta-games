import { useThemeColor } from '@hooks/useThemeColor'
import { IconButton } from '@themed/IconButton'
import { ThemedText } from '@themed/ThemedText'
import { ThemedView } from '@themed/ThemedView'
import React from 'react'
import { Linking, StyleSheet } from 'react-native'

export function TopBar() {
	const backgroundColor = useThemeColor('background')

	return (
		<ThemedView style={[styles.topBar, { backgroundColor: backgroundColor }]}>
			<ThemedView style={styles.view}>
				<IconButton
					style={{ marginLeft: 15 }}
					icon='git-pull-request-outline'
					type='round'
					onPress={() =>
						Linking.openURL('https://github.com/Deltabrain/fiesta-games/issues')
					}
				/>
				<ThemedText style={styles.text}>Submit feedback</ThemedText>
			</ThemedView>
		</ThemedView>
	)
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
})
