import { Stack } from 'expo-router'
import EventSource from 'react-native-sse'

// Needed to subscribe to pocketbase realtime events
// @ts-ignore
global.EventSource = EventSource

export default function TabLayout() {
	return (
		<Stack>
			<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
		</Stack>
	)
}
