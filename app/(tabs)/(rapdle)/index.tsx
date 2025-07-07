import { ThemedView } from '@themed/ThemedView'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

export default function Rapdle() {
	return (
		<ThemedView style={styles.default}>
			<WebView
				style={styles.webView}
				source={{
					uri: '89.58.34.65:3000',
				}}
			/>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	default: {
		width: '100%',
		height: '100%',
	},
	webView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
})
