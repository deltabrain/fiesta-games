import { Auth } from '@components/Auth'
import { TabBarIcon } from '@components/navigation/TabBarIcon'
import { useThemeColor } from '@hooks/useThemeColor'
import { pb } from '@lib/pocketbase'
import { ThemedView } from '@themed/ThemedView'
import * as NavigationBar from 'expo-navigation-bar'
import { Tabs } from 'expo-router'
import { AuthRecord } from 'pocketbase'
import { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, useColorScheme } from 'react-native'

export default function TabLayout() {
	const [record, setRecord] = useState<AuthRecord | null>(null)
	const barBackgroundColor = useThemeColor('background_dark')
	const backgroundColor = useThemeColor('background')
	const statusBarStyle =
		useColorScheme() === 'light' ? 'dark-content' : 'light-content'

	NavigationBar.setBackgroundColorAsync(useThemeColor('background_dark'))
	StatusBar.setBackgroundColor(useThemeColor('background'))

	useEffect(() => {
		setRecord(pb.authStore.record)
		pb.authStore.onChange((_token, record) => {
			setRecord(record)
		})
	}, [])

	return (
		<ThemedView style={[styles.default, { backgroundColor: backgroundColor }]}>
			<StatusBar translucent={true} barStyle={statusBarStyle} />
			{record && record.id ? (
				<Tabs
					screenOptions={{
						tabBarStyle: { backgroundColor: barBackgroundColor },
						headerShown: false,
					}}
					backBehavior='history'
				>
					<Tabs.Screen
						name='(home)'
						options={{
							title: 'Home',
							tabBarIcon(props) {
								return <TabBarIcon {...props} name='home-outline' />
							},
						}}
					/>
					<Tabs.Screen
						name='(teufeln)'
						options={{
							title: 'Teufeln',
							tabBarIcon(props) {
								return <TabBarIcon {...props} name='dice-outline' />
							},
						}}
					/>
					<Tabs.Screen
						name='(bingo)'
						options={{
							title: 'Bingo',
							tabBarIcon(props) {
								return <TabBarIcon {...props} name='people-outline' />
							},
						}}
					/>
					<Tabs.Screen
						name='(hol)'
						options={{
							title: 'Higher or Lower',
							tabBarIcon(props) {
								return <TabBarIcon {...props} name='diamond-outline' />
							},
						}}
					/>
					<Tabs.Screen
						name='(rapdle)'
						options={{
							title: 'Rapdle',
							tabBarIcon(props) {
								return <TabBarIcon {...props} name='musical-note-outline' />
							},
						}}
					/>
					<Tabs.Screen
						name='(profile)'
						options={{
							title: 'Profile',
							tabBarIcon(props) {
								return <TabBarIcon {...props} name='person-outline' />
							},
						}}
					/>
				</Tabs>
			) : (
				<Auth />
			)}
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	default: {
		flex: 1,
		paddingTop: '8%',
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
})
