import { ThemedText } from '@themed/ThemedText';
import { ThemedView } from '@themed/ThemedView';
import { useThemeColor } from '@hooks/useThemeColor';
import { signIn, signUp } from '@lib/auth';
import { IconButton } from '@themed/IconButton';
import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

export function Auth() {
	const accentColor = useThemeColor('accent_dark');
	const backgroundColor = useThemeColor('barBackground');
	const textColor = useThemeColor('text');
	const fadedTextColor = useThemeColor('text_faded');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newAccount, setNewAccount] = useState(false);

	return (
		<ThemedView style={[styles.default, { backgroundColor: backgroundColor }]}>
			<ThemedText style={styles.title}>
				{newAccount ? 'Sign up' : 'Sign in'}
			</ThemedText>
			<TextInput
				style={[
					styles.text,
					{ color: textColor, backgroundColor: accentColor },
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
					styles.text,
					{ color: textColor, backgroundColor: accentColor },
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
					styles.text,
					{ color: textColor, backgroundColor: accentColor },
				]}
				onChangeText={(text) => setPassword(text)}
				placeholder='Password'
				placeholderTextColor={fadedTextColor}
				textContentType='password'
				spellCheck={false}
				autoCorrect={false}
				secureTextEntry
			/>
			{newAccount ? (
				<IconButton
					onPress={() => {
						signUp(email, password, username);
					}}
					icon='arrow-forward-outline'
					type='round'
				/>
			) : (
				<IconButton
					onPress={() => {
						signIn(email, password);
					}}
					icon='arrow-forward-outline'
					type='round'
				/>
			)}
			<ThemedText
				onPress={() => setNewAccount(!newAccount)}
				style={[
					styles.text,
					{ textDecorationLine: 'underline', marginTop: 50 },
				]}
			>
				{newAccount ? `Already have an account?` : `Don't have an account?`}
			</ThemedText>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		minWidth: '100%',
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
	title: {
		display: 'flex',
		flex: 0,
		flexWrap: 'wrap',
		fontSize: 22,
		textAlign: 'center',
		textAlignVertical: 'center',
		marginBottom: 65,
		padding: 15,
	},
	hidden: {
		display: 'none',
	},
});
