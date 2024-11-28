import { Stack } from 'expo-router';

export default function BingoLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name='[editorId]/index'
				options={{ title: 'Editor', animation: 'slide_from_bottom' }}
			/>
			<Stack.Screen
				name='[boardId]/index'
				options={{ title: 'Board', animation: 'simple_push' }}
			/>
		</Stack>
	);
}
