import { SignIn } from '@/components/SignIn';
import { SignUp } from '@/components/SignUp';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { ThemedView } from '@/components/themed/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import auth from '@react-native-firebase/auth';
import * as NavigationBar from 'expo-navigation-bar';
import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet } from 'react-native';

export default function TabLayout() {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();
	const [newAccount, setNewAccount] = useState(false);
	const barBackgroundColor = useThemeColor('background_dark');
	const backgroundColor = useThemeColor('background');
	NavigationBar.setBackgroundColorAsync(useThemeColor('background_dark'));

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	function onAuthStateChanged(user: any) {
		setUser(user);
		if (initializing) setInitializing(false);
	}

	function changeNewAccount() {
		setNewAccount(!newAccount);
	}

	if (initializing) return null;

	return (
		<ThemedView style={[styles.default, { backgroundColor: backgroundColor }]}>
			{/* TODO: add signup to modal + styling */}
			<Modal transparent={true} visible={!user}>
				{newAccount ? (
					<SignUp newAccount={changeNewAccount} />
				) : (
					<SignIn newAccount={changeNewAccount} />
				)}
			</Modal>
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
