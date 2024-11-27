import { ButtonIcon } from '@/components/ButtonIcon';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Pressable, StyleSheet, type PressableProps } from 'react-native';

export type ThemedIconPressableProps = PressableProps & {
	icon: ComponentProps<typeof Ionicons>['name'];
	style?: any;
	type?: 'default' | 'round';
};

export function ThemedIconPressable({
	icon,
	style,
	type = 'default',
	...rest
}: ThemedIconPressableProps) {
	// unfortunately, we can't use useThemeColor outside of a function, so we can't create
	// the styles on the top level of this component, if you find a workaround, go ahead lol
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
	roundIcon: {
		textAlign: 'center',
		borderWidth: 0,
	},
});
