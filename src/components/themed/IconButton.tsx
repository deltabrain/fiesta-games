import { ButtonIcon } from '@components/ButtonIcon';
import { useThemeColor } from '@hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, StyleSheet, type PressableProps } from 'react-native';

export type IconButtonProps = PressableProps & {
	icon: ComponentProps<typeof Ionicons>['name'];
	style?: any;
	type?: 'default' | 'round';
};

export function IconButton({
	icon,
	style,
	type = 'default',
	...rest
}: IconButtonProps) {
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
			<ButtonIcon
				color={textColor}
				style={type === 'round' ? styles.roundIcon : {}}
				name={icon}
			/>
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
		textAlignVertical: 'center',
	},
	round: {
		width: 64,
		height: 64,
		borderWidth: 2,
		borderRadius: 32,
		borderStyle: 'solid',
		padding: 0,
		justifyContent: 'center',
		textAlignVertical: 'center',
	},
	roundIcon: {
		borderWidth: 0,
	},
});
