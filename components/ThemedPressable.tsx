import { type PressableProps, Pressable, Text } from 'react-native';

import { StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedPressableProps = PressableProps & {
	style?: any;
	lightColor?: string;
	darkColor?: string;
	type?: 'default' | 'round';
	contentType?: 'text';
	content?: string;
};

export function ThemedPressable({
	style,
	lightColor,
	darkColor,
	type = 'default',
	contentType = 'text',
	content,
	...rest
}: ThemedPressableProps) {
	// unfortunately, we can't use useThemeColor outside of a function, so we can't create
	// the styles on the top level of this component, if you find a workaround, go ahead lol
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonBackground');
	const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonBorder');
	const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonText');

	var usedStyle = type === 'round' ? styles.round : styles.default;
	var child: Text | any;

	if (contentType === 'text') {
		child = <Text style={[styles.text, { color: textColor }]}>{content}</Text>;
	}
	// TODO?: implement other contentTypes
	return (
		<Pressable style={[usedStyle, { backgroundColor, borderColor }, style]} {...rest}>
			{child}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	default: {
		borderRadius: 8,
		borderWidth: 2,
		borderStyle: 'solid',
		padding: 0,
	},
	round: {
		width: 64,
		height: 64,
		borderRadius: 32,
		borderWidth: 2,
		borderStyle: 'solid',
		padding: 0,
	},
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
