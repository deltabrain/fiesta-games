import { type PressableProps, Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ButtonIcon } from '../ButtonIcon';
import React, { ReactNode } from 'react';

export type ThemedPressableProps = PressableProps & {
	style?: any;
	type?: 'default' | 'round';
	contentType?: 'text' | 'icon';
	content?: string | any;
};

export function ThemedPressable({
	style,
	type = 'default',
	contentType = 'text',
	content,
	...rest
}: ThemedPressableProps) {
	// unfortunately, we can't use useThemeColor outside of a function, so we can't create
	// the styles on the top level of this component, if you find a workaround, go ahead lol
	const backgroundColor = useThemeColor('buttonBackground');
	const borderColor = useThemeColor('buttonBorder');
	const textColor = useThemeColor('buttonText');

	var usedStyle = type === 'round' ? styles.round : styles.default;
	var child: ReactNode;

	if (contentType === 'text') {
		child = <Text style={[styles.text, { color: textColor }]}>{content}</Text>;
	}

	if (contentType === 'icon') {
		child = <ButtonIcon style={type === 'round' ? styles.roundIcon : {}} name={content} />;
	}
	return (
		<Pressable style={[usedStyle, { backgroundColor, borderColor }, style]} {...rest}>
			{child}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	default: {
		borderRadius: 8,
		borderWidth: 1,
		borderStyle: 'solid',
		padding: 0,
		textAlign: 'center',
	},
	round: {
		width: 64,
		height: 64,
		borderRadius: 32,
		padding: 0,
		justifyContent: 'center',
	},
	roundIcon: {
		textAlign: 'center',
		borderWidth: 0,
		marginBottom: 4,
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});
