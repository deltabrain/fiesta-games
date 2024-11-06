import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

export function ButtonIcon({
	style,
	...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
	return <Ionicons size={28} style={[styles.default, style]} {...rest} />;
}

const styles = StyleSheet.create({
	default: {
		borderRadius: 8,
		borderWidth: 1,
		borderStyle: 'solid',
		padding: 10,
	},
});
