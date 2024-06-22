import { Stack } from 'expo-router';

export default function RootLayout() {
	return (
		<Stack screenOptions={{ headerShown: false, statusBarHidden: true }}>
			<Stack.Screen name="(tabs)" />
		</Stack>
	);
}
