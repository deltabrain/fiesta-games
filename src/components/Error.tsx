import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/themed/ThemedText';
import { ThemedView } from '@/themed/ThemedView';

export function Error() {
	const textColor = useThemeColor('warning');
	return (
		<ThemedView>
			<ThemedText style={{ color: textColor }}></ThemedText>
		</ThemedView>
	);
}
