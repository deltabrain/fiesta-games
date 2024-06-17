import { Tabs } from 'expo-router';

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ headerShown: false }} backBehavior="history">
			<Tabs.Screen name="index" options={{ title: 'Home' }} />
			<Tabs.Screen name="(teufeln)/index" options={{ title: 'Teufeln' }} />
			<Tabs.Screen name="(hol)/index" options={{ title: 'Higher or Lower' }} />
		</Tabs>
	);
}
