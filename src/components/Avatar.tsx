import { useThemeColor } from '@hooks/useThemeColor';
import { Image } from 'expo-image';
import { Pressable, PressableProps, StyleSheet } from 'react-native';

export type AvatarProps = PressableProps & {
	imageSrc: string;
	style?: any;
};

// TODO: onPress open avatar in fullscreen mode and add ui elements to delete, update, ...
export function Avatar({ imageSrc, style, ...rest }: AvatarProps) {
	const borderColor = useThemeColor('accent_dark');
	return (
		<Pressable style={[styles.default, style]} {...rest}>
			<Image
				placeholder={
					'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
				}
				transition={200}
				style={[styles.default, styles.border, { borderColor: borderColor }]}
				source={imageSrc}
			/>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	default: {
		width: 56,
		height: 56,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	border: {
		borderStyle: 'solid',
		borderWidth: 2,
	},
});
