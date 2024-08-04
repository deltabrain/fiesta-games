import { type PressableProps, Pressable } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedPressableProps = PressableProps & {
	style?: any;
	lightColor?: string;
	darkColor?: string;
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedPressable({ style, lightColor, darkColor, type = 'default', ...rest }: ThemedPressableProps) {
	const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'button');

	return <Pressable style={[{ backgroundColor }, style]} {...rest} />;
}
