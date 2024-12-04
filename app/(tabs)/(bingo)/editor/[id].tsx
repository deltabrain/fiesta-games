import { ThemedIconPressable } from '@/src/components/themed/ThemedIconPressable';
import { ThemedText } from '@/src/components/themed/ThemedText';
import { ThemedView } from '@/src/components/themed/ThemedView';
import { useThemeColor } from '@/src/hooks/useThemeColor';
import { deleteBoard } from '@/src/lib/db';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function Editor() {
	const { id } = useLocalSearchParams();
	const bgColor = useThemeColor('background');
	return (
		<ThemedView style={[styles.default, { backgroundColor: bgColor }]}>
			<ThemedIconPressable
				icon='trash-bin-outline'
				onPress={() => deleteBoard(id.toString())}
			></ThemedIconPressable>
			<ThemedText>Editor of {id}</ThemedText>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		height: '100%',
		minHeight: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
