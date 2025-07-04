import { ThemedView } from '@themed/ThemedView'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

export default function Rapdle() {
	return (
		<ThemedView style={styles.default}>
			<ThemedView style={styles.bottomBar}>
				<WebView source={{ uri: 'http://89.58.34.65:8090' }} />
			</ThemedView>
		</ThemedView>
	)
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
})
