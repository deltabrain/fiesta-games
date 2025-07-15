import { useThemeColor } from '@hooks/useThemeColor'
import { signIn, signUp } from '@lib/auth'
import { IconButton } from '@themed/IconButton'
import { ThemedText } from '@themed/ThemedText'
import { ThemedView } from '@themed/ThemedView'
import { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { TextButton } from './themed/TextButton'

export function Auth() {
	const [newAccount, setNewAccount] = useState(false)
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const accentColor = useThemeColor('accent_dark')
	const textColor = useThemeColor('text')
	const fadedTextColor = useThemeColor('text_faded')

	return (
		<ThemedView style={[styles.default]}>
			<ThemedText style={styles.title}>{newAccount ? 'Create new account' : 'Sign in'}</ThemedText>
			<ThemedView style={styles.inputs}>
				<TextInput
					style={[
						styles.textInput,
						{
							color: textColor,
							backgroundColor: accentColor,
							shadowColor: textColor,
						},
						newAccount ? {} : styles.hidden,
					]}
					onChangeText={(text) => setUsername(text)}
					placeholder='Username'
					placeholderTextColor={fadedTextColor}
					textContentType='username'
					spellCheck={false}
					autoCorrect={false}
				/>
				<TextInput
					style={[
						styles.textInput,
						{
							color: textColor,
							backgroundColor: accentColor,
							shadowColor: textColor,
						},
					]}
					onChangeText={(text) => setEmail(text)}
					placeholder='Email'
					placeholderTextColor={fadedTextColor}
					textContentType='emailAddress'
					spellCheck={false}
					autoCorrect={false}
				/>
				<TextInput
					style={[
						styles.textInput,
						{
							color: textColor,
							backgroundColor: accentColor,
							shadowColor: textColor,
						},
					]}
					onChangeText={(text) => setPassword(text)}
					placeholder='Password'
					placeholderTextColor={fadedTextColor}
					textContentType='password'
					spellCheck={false}
					autoCorrect={false}
					secureTextEntry
				/>
			</ThemedView>
			<ThemedView style={styles.bottomContainer}>
				<IconButton
					onPress={() => {
						//eslint-disable-next-line
						newAccount
							? signUp(email, password, username)
							: signIn(email, password)
					}}
					icon='arrow-forward-outline'
					type='round'
				/>
				<ThemedText style={{ color: fadedTextColor, marginBottom: 10, marginTop: 20 }}>or</ThemedText>
				<TextButton
					type='ghost'
					text={newAccount ? 'Sign in' : 'Create an account'}
					onPress={() => setNewAccount(!newAccount)}
					style={[styles.button]}
					textStyle={styles.buttonText}
				/>
				{/* TODO: add password reset button */}
			</ThemedView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	default: {
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
	},
	inputs: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '15%',
	},
	textInput: {
		flexWrap: 'wrap',
		fontSize: 16,
		textAlign: 'center',
		textAlignVertical: 'center',
		marginVertical: 10,
		padding: 15,
		width: '75%',
		borderRadius: 8,
		elevation: 8,
	},
	button: {
		width: '50%',
	},
	buttonText: {
		flexWrap: 'wrap',
		padding: 15,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	title: {
		flexWrap: 'wrap',
		fontSize: 22,
		textAlign: 'center',
		textAlignVertical: 'center',
		padding: 15,
	},
	bottomContainer: {
		marginTop: 15,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		width: '100%',
	},
	hidden: {
		display: 'none',
	},
})
