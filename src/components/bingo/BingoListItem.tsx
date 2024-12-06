import { Error } from '@components/Error';
import { useThemeColor } from '@hooks/useThemeColor';
import { LinkIconButton } from '@themed/LinkIconButton';
import { ThemedText } from '@themed/ThemedText';
import { Board } from '@types';
import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

export function BingoListItem(board: Board) {
	const textColor = useThemeColor('text_button');
	const backgroundColor = useThemeColor('secondary_dark');
	const borderColor = useThemeColor('secondary');

	if (!board) {
		return <Error />;
	}

	return (
		<Link
			style={[
				styles.row,
				{ backgroundColor: backgroundColor, borderColor: borderColor },
			]}
			asChild
			href={{
				pathname: '/(tabs)/(bingo)/board/[id]',
				params: { id: board.id },
			}}
		>
			<TouchableOpacity activeOpacity={0.8}>
				<ThemedText style={[styles.text, { color: textColor }]}>
					{board.title}
				</ThemedText>
				<LinkIconButton
					href={{
						pathname: '/(tabs)/(bingo)/editor/[id]',
						params: { id: board.id },
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
		width: '90%',
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
