import { ThemedPressable } from '@/components/themed/ThemedPressable';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { signIn } from '@/util/auth';
import { useState } from 'react';
import { StyleSheet, TextInput, ViewProps } from 'react-native';

export type SignInProps = ViewProps & {
	newAccount: Function;
};

export function SignIn({ newAccount }: SignInProps) {
	const accentColor = useThemeColor('accent_dark');
	const backgroundColor = useThemeColor('background');
	const textColor = useThemeColor('text');
	const fadedTextColor = useThemeColor('text_faded');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<ThemedView style={[styles.default, { backgroundColor: backgroundColor }]}>
			<ThemedText style={styles.title}>Sign In</ThemedText>
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
			></TextInput>
			<ThemedPressable
				onPress={() => signIn(email, password)}
				contentType='icon'
				content={'arrow-forward-outline'}
				type='round'
			/>
			<ThemedText
				onPress={() => newAccount()}
				style={[
					styles.text,
					{ textDecorationLine: 'underline', marginTop: 50 },
				]}
			>
				Don't have an account?
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
