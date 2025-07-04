import { useThemeColor } from '@hooks/useThemeColor'
import { IconButton } from '@themed/IconButton'
import { ThemedView } from '@themed/ThemedView'
import React from 'react'
import { Linking, StyleSheet } from 'react-native'

export function TopBar() {
	const backgroundColor = useThemeColor('background')

	return (
		<ThemedView style={[styles.topBar, { backgroundColor: backgroundColor }]}>
			<ThemedView style={styles.view}>
				<IconButton
					icon='bug-outline'
					type='round'
					onPress={() =>
						Linking.openURL('https://github.com/Deltabrain/fiesta-games/issues')
					}
				/>
			</ThemedView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	topBar: {
		flex: 0,
		flexDirection: 'row',
		marginTop: '10%',
	},
	view: {
		alignItems: 'flex-start',
		marginLeft: 35,
		width: '15%',
		flex: 1,
		flexDirection: 'column',
	},
})
