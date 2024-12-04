import { Loading } from '@/components/Loading';
import { BingoBoardItem } from '@/components/bingo/BingoBoardItem';
import { getSize, shuffleBoard } from '@/lib/db';
import { supabase } from '@/lib/supabase';
import { Corner } from '@/lib/types';
import { ThemedIconPressable } from '@/themed/ThemedIconPressable';
import { ThemedView } from '@/themed/ThemedView';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

export default function Board() {
	const [loading, setLoading] = useState(true);
	const [reloading, setReloading] = useState(false);
	const [items, setItems] = useState<React.JSX.Element[]>();
	const [toggle, setToggle] = useState(true);
	const { id } = useLocalSearchParams();

	// Subscribe to changes in bingo table for shuffling
	supabase
		.channel('custom-filter-channel')
		.on(
			'postgres_changes',
			{
				event: '*',
				schema: 'public',
				table: 'boards',
				filter: `id=eq.${id}`,
			},
			() => {
				console.log('soos');

				setToggle(!toggle);
			},
		)
		.subscribe();

	useEffect(() => {
		var size: number;
		var nextCorner: Corner = Corner.TopLeft;
		var row: React.JSX.Element[] = [];
		const itemArray: React.JSX.Element[] = [];

		getSize(id.toString()).then((data) => {
			size = data;
			var rowNumber: number = 0;

			for (var i = 0; i < size ** 2; i++) {
				var corner: Corner | null = null;
				if (i === 0) {
					corner = nextCorner++;
				}
				if (i === size - 1) {
					corner = nextCorner++;
				}
				if (i === size * (size - 1)) {
					corner = nextCorner++;
				}
				if (i === size ** 2 - 1) {
					corner = nextCorner++;
				}
				row.push(
					<BingoBoardItem
						reloadToggle={toggle}
						fieldNumber={i}
						key={i}
						bingoId={id.toString()}
						corner={corner}
					/>,
				);
				if (i % size === size - 1) {
					itemArray.push(
						<ThemedView key={rowNumber} style={styles.row}>
							{row}
						</ThemedView>,
					);
					rowNumber++;
					row = [];
				}
			}
			setItems(itemArray);
			setLoading(false);
			setReloading(false);
		});
	}, [reloading, toggle]);

	return loading ? (
		<Loading />
	) : (
		<ThemedView style={styles.default}>
			<ThemedView style={styles.topBar}>
				<ThemedIconPressable
					icon='arrow-back-outline'
					onPress={() => {
						router.back();
					}}
				/>
				<ThemedIconPressable
					icon='reload-outline'
					onPress={() => {
						// Shuffle
						shuffleBoard(id.toString());
					}}
				/>
			</ThemedView>
			<ThemedView style={styles.bingoContainer}>{items}</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	topBar: {
		flex: 0,
		height: '10%',
		marginTop: '5%',
		flexDirection: 'row',
		width: '90%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	bingoContainer: {
		flex: 1,
		height: '100%',
		width: '95%',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
		marginBottom: '5%',
	},
	row: {
		flexDirection: 'row',
		height: '15%',
	},
});
