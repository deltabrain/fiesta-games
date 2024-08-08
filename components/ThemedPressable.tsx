import { type PressableProps, Pressable, Text } from 'react-native';

import { StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedPressableProps = PressableProps & {
	style?: any;
	lightColor?: string;
	darkColor?: string;
	contentType?: 'text';
	content?: string;
};

export function ThemedPressable({
	style,
	lightColor,
	darkColor,
	contentType = 'text',
	content,
	...rest
}: ThemedPressableProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonBackground');
	const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonBorder');
	const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonText');

	var child: Text | any;

	if (contentType === 'text') {
		child = <Text style={[styles.text, { color: textColor }]}>{content}</Text>;
	}
	// TODO?: implement other contentTypes

	return (
		<Pressable
			style={[
				{
					backgroundColor: backgroundColor,
					borderColor: borderColor,
					borderRadius: 8,
					borderWidth: 2,
					borderStyle: 'solid',
					padding: 0,
				},
				style,
			]}
			{...rest}
		>
			{child}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
