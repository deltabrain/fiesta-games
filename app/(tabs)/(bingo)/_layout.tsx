import { Stack } from 'expo-router';

export default function BingoLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='editor/[id]'
				options={{ title: 'Editor', animation: 'slide_from_bottom' }}
			/>
			<Stack.Screen
				name='board/[id]'
				options={{ title: 'Board', animation: 'simple_push' }}
			/>
		</Stack>
	);
}
