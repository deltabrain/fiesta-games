import { Loading } from '@components/Loading';
import { BingoListItem } from '@components/bingo/BingoListItem';
import { addBoard, getUserBoards } from '@lib/db';
import { supabase } from '@lib/supabase';
import { Board } from '@lib/types';
import { IconButton } from '@themed/IconButton';
import { ThemedText } from '@themed/ThemedText';
import { ThemedView } from '@themed/ThemedView';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

export default function Bingo() {
	const [loading, setLoading] = useState(true);
	const [reloading, setReloading] = useState(false);
	const [boards, setBoards] = useState<Board[]>([]);

	// Subscribe to supabase changes
	supabase
		.channel('custom-all-channel')
		.on(
			'postgres_changes',
			{ event: '*', schema: 'public', table: 'boards' },
			() => {
				setReloading(!reloading);
			},
		)
		.subscribe();

	useEffect(() => {
		getUserBoards().then((data) => {
			setBoards(data);
		});
		setLoading(false);
	}, [loading, reloading]);

	return loading ? (
		<Loading />
	) : (
		<ThemedView style={styles.default}>
			<ThemedView style={styles.topBar}>
				<ThemedText style={styles.title}>Boards</ThemedText>
				<IconButton
					icon='add-outline'
					onPress={() => {
						addBoard();
					}}
				/>
			</ThemedView>
			<ThemedView style={[styles.bingoContainer]}>
				<FlatList
					contentContainerStyle={{ alignItems: 'center' }}
					showsVerticalScrollIndicator={false}
					style={styles.list}
					data={boards}
					renderItem={({ item }) => <BingoListItem {...item} />}
				/>
			</ThemedView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		height: '100%',
		width: '100%',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	topBar: {
		flexDirection: 'row',
		width: '80%',
		marginTop: '10%',
		marginBottom: '2%',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	list: {
		width: '100%',
	},
	title: {
		textAlign: 'left',
		fontSize: 20,
		fontWeight: 'bold',
	},
	bingoContainer: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
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
