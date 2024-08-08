import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

// TODO: add button to toggle fullscreen mode, hide tab bar on fullscreen mode

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarStyle: styles.tabBar, headerShown: false }} backBehavior="history">
			<Tabs.Screen
				name="(tabs)/(home)"
				options={{
					title: 'Home',
					tabBarIcon(props) {
						return <TabBarIcon {...props} name="home" />;
					},
				}}
			/>
			<Tabs.Screen
				name="(tabs)/(teufeln)"
				options={{
					title: 'Teufeln',
					tabBarIcon(props) {
						return <TabBarIcon {...props} name="dice" />;
					},
				}}
			/>
			<Tabs.Screen
				name="(tabs)/(hol)"
				options={{
					title: 'Higher or Lower',
					tabBarIcon(props) {
						return <TabBarIcon {...props} name="diamond" />;
					},
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		backgroundColor: '#333333',
	},
});
