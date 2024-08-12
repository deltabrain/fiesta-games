import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

// TODO: add setting to toggle fullscreen mode, hide tab bar on fullscreen mode

export default function TabLayout() {
	const barBackgroundColor = useThemeColor('barBackground');
	return (
		<ThemedView style={styles.view}>
			<Tabs
				screenOptions={{
					tabBarStyle: { backgroundColor: barBackgroundColor },
					headerShown: false,
				}}
				backBehavior="history"
			>
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
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	tabBar: {},
	view: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
});
