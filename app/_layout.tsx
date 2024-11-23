import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemedView } from '@/components/themed/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Auth } from '@/src/components/Auth';
import { getFields } from '@/src/lib/db';
import { supabase } from '@/src/lib/supabase';
import { Session } from '@supabase/supabase-js';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, AppState, useColorScheme } from 'react-native';

AppState.addEventListener('change', (state) => {
	if (state === 'active') {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});

export default function TabLayout() {
	const [session, setSession] = useState<Session | null>(null);
	const barBackgroundColor = useThemeColor('background_dark');
	const backgroundColor = useThemeColor('background');
	const statusBarStyle =
		useColorScheme() === 'light' ? 'dark-content' : 'light-content';
	NavigationBar.setBackgroundColorAsync(useThemeColor('background_dark'));
	StatusBar.setBackgroundColor(useThemeColor('background'));

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	getFields();

	return (
		<ThemedView style={[styles.default, { backgroundColor: backgroundColor }]}>
			<StatusBar translucent={true} barStyle={statusBarStyle} />
			{session && session.user ? (
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
								return <TabBarIcon {...props} name='home-outline' />;
							},
						}}
					/>
					<Tabs.Screen
						name='(tabs)/(teufeln)'
						options={{
							title: 'Teufeln',
							tabBarIcon(props) {
								return <TabBarIcon {...props} name='dice-outline' />;
							},
						}}
					/>
					<Tabs.Screen
						name='(tabs)/(bingo)'
						options={{
							title: 'Bingo',
							tabBarIcon(props) {
								return <TabBarIcon {...props} name='people-outline' />;
							},
						}}
					/>
					<Tabs.Screen
						name='(tabs)/(hol)'
						options={{
							title: 'Higher or Lower',
							tabBarIcon(props) {
								return <TabBarIcon {...props} name='diamond-outline' />;
							},
						}}
					/>
					<Tabs.Screen
						name='(tabs)/(profile)'
						options={{
							title: 'Profile',
							tabBarIcon(props) {
								return <TabBarIcon {...props} name='person-outline' />;
							},
						}}
					/>
				</Tabs>
			) : (
				<Auth />
			)}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	modal: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		minWidth: '100%',
	},
	hidden: {
		display: 'none',
	},
	text: {
		display: 'flex',
		flex: 0,
		flexWrap: 'wrap',
		fontSize: 16,
		textAlign: 'center',
		textAlignVertical: 'center',
		marginBottom: 35,
		padding: 15,
		width: '75%',
		borderRadius: 8,
	},
});
