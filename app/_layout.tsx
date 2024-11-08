import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemedView } from '@/components/themed/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
	const barBackgroundColor = useThemeColor('background_dark');
	const backgroundColor = useThemeColor('background');
	NavigationBar.setBackgroundColorAsync(useThemeColor('background_dark'));

	return (
		<ThemedView style={[styles.default, { backgroundColor: backgroundColor }]}>
			{/* BUG: This takes up more place than it should, small CardView at the top gets squashed */}
			<Tabs
				screenOptions={{
					tabBarStyle: { backgroundColor: barBackgroundColor },
					headerShown: false,
				}}
				backBehavior='history'
			>
				<Tabs.Screen
					name='(tabs)/(home)'
					options={{
						title: 'Home',
						tabBarIcon(props) {
							return <TabBarIcon {...props} name='home' />;
						},
					}}
				/>
				<Tabs.Screen
					name='(tabs)/(teufeln)'
					options={{
						title: 'Teufeln',
						tabBarIcon(props) {
							return <TabBarIcon {...props} name='dice' />;
						},
					}}
				/>
				<Tabs.Screen
					name='(tabs)/(bingo)'
					options={{
						title: 'Bingo',
						tabBarIcon(props) {
							return <TabBarIcon {...props} name='people' />;
						},
					}}
				/>
				<Tabs.Screen
					name='(tabs)/(hol)'
					options={{
						title: 'Higher or Lower',
						tabBarIcon(props) {
							return <TabBarIcon {...props} name='diamond' />;
						},
					}}
				/>
			</Tabs>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	hidden: {
		display: 'none',
	},
});
