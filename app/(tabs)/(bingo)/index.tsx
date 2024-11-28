import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/themed/ThemedText';
import { ThemedView } from '@/themed/ThemedView';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function Bingo() {
	const buttonActiveColor = useThemeColor('primary_dark');
	const textColor = useThemeColor('text');
	const fadedTextColor = useThemeColor('text_faded');
	const warningColor = useThemeColor('warning');
	const neutralColor = useThemeColor('neutral');
	const rowBackgroundColor = useThemeColor('secondary_dark');
	const backgroundColor = useThemeColor('background');

	// TODO: fetch users bingo boards insted of fake data
	type dataType = { uuid: number; title: string };
	const data: dataType[] = [
		{ uuid: 1, title: 'xd' },
		{ uuid: 2, title: 'soos' },
		{ uuid: 3, title: 'saas' },
		{ uuid: 4, title: 'saas' },
		{ uuid: 5, title: 'saas' },
		{ uuid: 6, title: 'saas' },
		{ uuid: 7, title: 'saas' },
	];

	function BingoItem(soos: dataType) {
		return (
			<ThemedView
				style={[styles.bingoRow, { backgroundColor: rowBackgroundColor }]}
			>
				<ThemedText style={[styles.bingoText, { color: textColor }]}>
					{soos.title}
					{soos.uuid}
				</ThemedText>
			</ThemedView>
		);
	}

	return (
		<ThemedView style={styles.default}>
			<ThemedText style={styles.title}>Boards</ThemedText>
			<ThemedView style={styles.bingoContainer}>
				<FlatList
					style={styles.list}
					data={data}
					renderItem={({ item }) => (
						<BingoItem uuid={item.uuid} title={item.title} />
					)}
				/>
			</ThemedView>
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
	list: {
		marginVertical: '10%',
		height: '100%',
		minHeight: '100%',
		width: '100%',
	},
	title: {
		width: '85%',
		textAlign: 'left',
		fontSize: 20,
		fontWeight: 'bold',
		paddingVertical: '5%',
		marginTop: '5%',
	},
	bingoContainer: {
		flex: 1,
		width: '90%',
		maxWidth: '90%',
		height: '90%',
		minHeight: '90%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		marginBottom: '5%',
	},
	bingoRow: {
		height: 100,
		width: '100%',
		borderRadius: 10,
		marginVertical: 8,
		flexDirection: 'row',
	},
	bingoText: {
		fontSize: 18,
		textAlign: 'left',
		textAlignVertical: 'center',
		flexWrap: 'wrap',
		marginHorizontal: '5%',
	},
	bottomBar: {
		width: '100%',
		marginBottom: '5%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	modal: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0.9,
	},
	buttonContainer: {
		backgroundColor: 'transparent',
		display: 'flex',
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	button: {
		padding: 10,
		margin: 10,
		marginTop: 20,
		height: 50,
		width: '45%',
	},
	hidden: {
		display: 'none',
	},
});
