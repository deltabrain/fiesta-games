import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarStyle: styles.root, headerShown: false }} backBehavior="history">
			<Tabs.Screen name="index" options={{ title: 'Home' }} />
			<Tabs.Screen name="(teufeln)" options={{ title: 'Teufeln' }} />
			<Tabs.Screen name="(hol)/index" options={{ title: 'Higher or Lower' }} />
		</Tabs>
	);
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: '#333333',
	},
});
