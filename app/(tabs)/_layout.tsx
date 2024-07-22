import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarStyle: styles.root, headerShown: false }} backBehavior="history">
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon(props) {
						return <TabBarIcon {...props} name="home" />;
					},
				}}
			/>
			<Tabs.Screen
				name="(teufeln)"
				options={{
					title: 'Teufeln',
					tabBarIcon(props) {
						return <TabBarIcon {...props} name="dice" />;
					},
				}}
			/>
			<Tabs.Screen
				name="(hol)/index"
				options={{
					title: 'Higher or Lower',
					tabBarIcon(props) {
						// TODO: get up/down arrow somehow
						return <TabBarIcon {...props} name="card" />;
					},
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: '#333333',
	},
});
