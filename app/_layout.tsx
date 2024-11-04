import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemedPressable } from '@/components/themed/ThemedPressable';
import { ThemedView } from '@/components/themed/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
	function toggleFullscreen(): void {
		setFullscreen(!fullscreen);
	}

	const [fullscreen, setFullscreen] = useState(false);

	const barBackgroundColor = useThemeColor('barBackground');
	const backgroundColor = useThemeColor('background');
	return (
		<ThemedView style={[styles.view, { backgroundColor: backgroundColor }]}>
			{/* BUG: This takes up more place than it should, small CardView at the top gets squashed */}
			<ThemedView style={styles.topBar}>
				<ThemedPressable
					style={{ marginRight: 15 }}
					contentType='icon'
					content='resize'
					type='round'
					onPress={() => toggleFullscreen()}
				/>
			</ThemedView>
			<Tabs
				screenOptions={{
					tabBarStyle: [{ backgroundColor: barBackgroundColor }, fullscreen ? styles.hidden : {}],
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
	tabBar: {},
	topBar: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: '8%',
	},
	view: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	hidden: {
		display: 'none',
	},
});
