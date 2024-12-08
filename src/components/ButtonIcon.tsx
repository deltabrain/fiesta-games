import { Ionicons } from '@expo/vector-icons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { StyleSheet } from 'react-native';

export function ButtonIcon({
	style,
	...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
	return <Ionicons size={22} style={[styles.default, style]} {...rest} />;
}

const styles = StyleSheet.create({
	default: {
		padding: 10,
		textAlign: 'center',
		textAlignVertical: 'center',
	},
});
