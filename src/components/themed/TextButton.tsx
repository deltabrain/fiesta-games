import { useThemeColor } from '@hooks/useThemeColor';
import React from 'react';
import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

export type TextButtonProps = PressableProps & {
	style?: any;
	type?: 'default' | 'round';
	text: string;
};

export function TextButton({
	style,
	type = 'default',
	text,
	...rest
}: TextButtonProps) {
	const primaryColor = useThemeColor('secondary');
	const accentColor = useThemeColor('secondary_light');
	const textColor = useThemeColor('text_button');

	var usedStyle = type === 'round' ? styles.round : styles.default;

	return (
		<Pressable
			style={[
				usedStyle,
				{
					backgroundColor: primaryColor,
					borderColor: accentColor,
				},
				style,
			]}
			{...rest}
		>
			<Text style={[styles.text, { color: textColor }]}>{text}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	default: {
		borderWidth: 2,
		borderRadius: 8,
		borderStyle: 'solid',
		padding: 0,
		textAlign: 'center',
	},
	round: {
		width: 64,
		height: 64,
		borderWidth: 2,
		borderRadius: 32,
		borderStyle: 'solid',
		padding: 0,
		justifyContent: 'center',
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});
