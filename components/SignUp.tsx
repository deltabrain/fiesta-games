import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { signUp } from '@/util/auth';
import { useState } from 'react';
import { StyleSheet, TextInput, ToastAndroid, ViewProps } from 'react-native';
import { ThemedIconPressable } from './themed/ThemedIconPressable';
import { SignupResult } from '@/util/types';

export type SignUpProps = ViewProps & {
	newAccount: Function;
};

export function SignUp({ newAccount }: SignUpProps) {
	const accentColor = useThemeColor('accent_dark');
	const backgroundColor = useThemeColor('background');
	const textColor = useThemeColor('text');
	const fadedTextColor = useThemeColor('text_faded');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const showToast = (msg: string) => {
		ToastAndroid.showWithGravity(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM);
	};

	return (
		<ThemedView style={[styles.default, { backgroundColor: backgroundColor }]}>
			<ThemedText style={styles.title}>Sign Up</ThemedText>
			<TextInput
				style={[
					styles.text,
					{ color: textColor, backgroundColor: accentColor },
				]}
				onChangeText={(text) => setEmail(text)}
				placeholder='Email'
				placeholderTextColor={fadedTextColor}
				textContentType='emailAddress'
			></TextInput>
			<TextInput
				style={[
					styles.text,
					{ color: textColor, backgroundColor: accentColor },
				]}
				onChangeText={(text) => setPassword(text)}
				placeholder='Password'
				placeholderTextColor={fadedTextColor}
				textContentType='password'
				passwordRules={'minLength:6'}
				secureTextEntry
			></TextInput>
			<ThemedIconPressable
				onPress={() => {
					switch (signUp(email, password)) {
						case SignupResult.Success:
							return;
						case SignupResult.WeakPassword:
							showToast('Weak Password');
						case SignupResult.BadEmail:
							showToast('Enter a valid Email address');
						case SignupResult.UserExists:
							showToast('User already exists');
						case SignupResult.InputMissing:
							showToast('Enter Email and Password');
						case SignupResult.Error:
							showToast('An error occured');
					}
				}}
				icon='arrow-forward-outline'
				type='round'
			/>
			<ThemedText
				onPress={() => newAccount()}
				style={[
					styles.text,
					{ textDecorationLine: 'underline', marginTop: 50 },
				]}
			>
				Already have an account?
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
});
