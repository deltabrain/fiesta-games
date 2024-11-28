import { Stack } from 'expo-router';

export default function BingoLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='(editor)/index'
				options={{ title: 'Editor', animation: 'slide_from_bottom' }}
			/>
			<Stack.Screen
				name='(board)/index'
				options={{ title: 'Board', animation: 'simple_push' }}
			/>
		</Stack>
	);
}
