import { useThemeColor } from '@hooks/useThemeColor';
import { Image } from 'expo-image';
import {
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native';

export type AvatarProps = TouchableOpacityProps & {
	imageSrc: string;
	style?: any;
};

export function Avatar({ imageSrc, style, ...rest }: AvatarProps) {
	const borderColor = useThemeColor('accent_dark');
	return (
		<TouchableOpacity
			activeOpacity={0.7}
			style={[styles.default, style]}
			{...rest}
		>
			<Image
				placeholder={
					'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
				}
				transition={100}
				style={[styles.default, styles.border, { borderColor: borderColor }]}
				source={imageSrc}
				cachePolicy={'none'}
			/>
		</TouchableOpacity>
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
