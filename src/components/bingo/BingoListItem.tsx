import { useThemeColor } from '@/src/hooks/useThemeColor';
import { boardIdentification } from '@/src/lib/types';
import { ThemedLinkIconButton } from '@/src/components/themed/ThemedLinkIconButton';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '../themed/ThemedText';

export function BingoListItem(board: boardIdentification) {
	const textColor = useThemeColor('text');
	const backgroundColor = useThemeColor('secondary_dark');
	const borderColor = useThemeColor('secondary');

	return (
		<Link
			style={[
				styles.row,
				{ backgroundColor: backgroundColor, borderColor: borderColor },
			]}
			asChild
			href={{ pathname: '/board/[id]', params: { id: board!.id } }}
		>
			<TouchableOpacity activeOpacity={0.8}>
				<ThemedText style={[styles.text, { color: textColor }]}>
					{board!.title}
				</ThemedText>
				<ThemedLinkIconButton
					href={{
						pathname: '/editor/[id]',
						params: { id: board!.id },
					}}
					icon='cog-outline'
					style={styles.button}
				/>
			</TouchableOpacity>
		</Link>
	);
}

const styles = StyleSheet.create({
	row: {
		borderStyle: 'solid',
		borderWidth: 2,
		height: 100,
		width: '100%',
		borderRadius: 10,
		marginVertical: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	text: {
		fontSize: 18,
		textAlign: 'left',
		textAlignVertical: 'center',
		flexWrap: 'wrap',
		paddingLeft: '5%',
	},
	button: {
		height: 48,
		width: 48,
		fontSize: 18,
		marginRight: '5%',
	},
});
