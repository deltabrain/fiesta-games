import { Loading } from '@/src/components/Loading';
import { BingoListItem } from '@/src/components/bingo/BingoListItem';
import { ThemedIconPressable } from '@/src/components/themed/ThemedIconPressable';
import { addBoard, getBoards } from '@/src/lib/db';
import { supabase } from '@/src/lib/supabase';
import { boardIdentification } from '@/src/lib/types';
import { ThemedText } from '@/themed/ThemedText';
import { ThemedView } from '@/themed/ThemedView';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function Bingo() {
	const [loading, setLoading] = useState(true);
	const [reloading, setReloading] = useState(false);
	const [boards, setBoards] = useState<boardIdentification[]>();

	// Subscribe to supabase changes
	supabase
		.channel('custom-insert-channel')
		.on(
			'postgres_changes',
			{ event: '*', schema: 'public', table: 'boards' },
			() => {
				setReloading(true);
			},
		)
		.subscribe();

	useEffect(() => {
		getBoards().then((data) => {
			setBoards(data);
		});
		setLoading(false);
		setReloading(false);
	}, [reloading]);

	return loading ? (
		<Loading />
	) : (
		<ThemedView style={styles.default}>
			<ThemedView style={styles.topBar}>
				<ThemedText style={styles.title}>Boards</ThemedText>
				<ThemedIconPressable
					icon='add-outline'
					onPress={() => {
						addBoard();
					}}
				/>
			</ThemedView>
			<ThemedView style={styles.bingoContainer}>
				<FlatList
					showsVerticalScrollIndicator={false}
					style={styles.list}
					data={boards}
					renderItem={({ item }) => (
						<BingoListItem id={item!.id} title={item!.title} />
					)}
				/>
			</ThemedView>
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
		flexDirection: 'row',
		width: '80%',
		marginTop: '20%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	list: {
		paddingVertical: '5%',
		width: '100%',
	},
	title: {
		textAlign: 'left',
		fontSize: 20,
		fontWeight: 'bold',
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
