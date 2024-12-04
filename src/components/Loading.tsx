import {
	ActivityIndicator,
	ActivityIndicatorProps,
	StyleSheet,
} from 'react-native';
import { ThemedView } from './themed/ThemedView';
import { useThemeColor } from '../hooks/useThemeColor';

export type LoadingProps = ActivityIndicatorProps & {};

export function Loading({ size, ...rest }: LoadingProps) {
	const textColor = useThemeColor('text');
	if (!size) {
		size = 'small';
	}

	return (
		<ThemedView style={styles.default}>
			<ActivityIndicator size={size} color={textColor} {...rest} />
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignContent: 'center',
	},
});
