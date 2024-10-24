import { Stack } from 'expo-router';

export default function bingoLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
				statusBarTranslucent: true,
				statusBarColor: 'transparent',
			}}
		/>
	);
}
