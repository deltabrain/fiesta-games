import { ButtonIcon } from '@components/ButtonIcon';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@hooks/useThemeColor';
import { Link, LinkProps } from 'expo-router';
import { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';

export type LinkIconButtonProps = LinkProps & {
	icon: ComponentProps<typeof Ionicons>['name'];
	style?: any;
};

export function LinkIconButton({
	icon,
	style,
	href,
	...rest
}: LinkIconButtonProps) {
	const primaryColor = useThemeColor('secondary');
	const accentColor = useThemeColor('secondary_light');
	const textColor = useThemeColor('text_button');

	return (
		<Link
			href={href}
			style={[
				styles.default,
				{
					backgroundColor: primaryColor,
					borderColor: accentColor,
				},
				style,
			]}
			{...rest}
		>
			<ButtonIcon color={textColor} name={icon} />
		</Link>
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
});
