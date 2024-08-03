import { type PressableProps, StyleSheet, Pressable } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedPressableProps = PressableProps & {
	lightColor?: string;
	darkColor?: string;
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedPressable({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedPressableProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'button');

	return <Pressable style={[{ color }, style]} {...rest} />;
}

const styles = StyleSheet.create({});
