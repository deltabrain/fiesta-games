import { useThemeColor } from '@hooks/useThemeColor';
import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native';

export type TextButtonProps = TouchableOpacityProps & {
	text: string;
	style?: any;
	textStyle?: any;
	type?: 'default' | 'ghost';
};

export function TextButton({
	text,
	style,
	textStyle,
	type = 'default',
	...rest
}: TextButtonProps) {
	const primaryColor = useThemeColor('secondary');
	const accentColor = useThemeColor('secondary_light');
	const textColor = useThemeColor('text_button');
	const ghostTextColor = useThemeColor('text');

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={[
				styles.default,
				{
					backgroundColor: type === 'default' ? primaryColor : 'transparent',
					borderColor: accentColor,
				},
				style,
			]}
			{...rest}
		>
			<Text
				style={[
					styles.text,
					{ color: type === 'default' ? textColor : ghostTextColor },
					textStyle,
				]}
			>
				{text}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	default: {
		borderWidth: 2,
		borderRadius: 8,
		borderStyle: 'solid',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	text: {
		fontSize: 18,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});
