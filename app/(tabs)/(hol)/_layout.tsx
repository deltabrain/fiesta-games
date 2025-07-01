import { Stack } from 'expo-router'

export default function HolLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		/>
	)
}
